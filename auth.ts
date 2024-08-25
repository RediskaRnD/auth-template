import authConfig from '@/auth.config';
import { getUserById } from '@/data/user';
import { prisma } from '@/lib/db';
import { ERROR_PAGE, SIGN_IN_PAGE } from '@/routes';
import { JWT } from '@auth/core/jwt';
import { DefaultSession } from '@auth/core/types';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { UserRole } from '@prisma/client';
import NextAuth, { Session } from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string;
      /** The user's role. */
      role: UserRole;
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession['user'];
  }
}

declare module '@auth/core/jwt' {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    role: UserRole | undefined;
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  debug: process.env.NODE_ENV !== 'production',
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: SIGN_IN_PAGE,
    error: ERROR_PAGE
  },
  logger: {
    error(error) {
      console.error(error.message);
    }
  },
  events: {
    async linkAccount({ user }): Promise<void> {
      console.log('linkAccount: ', user.email);
      if (user.id) {
        await prisma.user.update({
          where: { id: user.id },
          data: { emailVerified: new Date() }
        });
      }
    }
  },
  callbacks: {
    async signIn({ user, account }): Promise<boolean> {
      console.log('cb::signIn');
      // Allow OAuth without email verification
      if (account?.provider === 'credentials') {
        if (user.id) {
          const existingUser = await getUserById(user.id);
          if (!existingUser?.emailVerified) {
            return false;
          }
          // TODO: Add 2FA check
        }
      }
      return true;
    },
    async jwt({ token, user }): Promise<JWT> {
      console.log('cb::jwt');
      console.log({ token });
      console.log({ user });
      if (token.sub) {
        const existingUser = await getUserById(token.sub);
        token.role = existingUser?.role;
      }
      return token;
    },
    async session({ token, session }): Promise<Session> {
      console.log('cb::session');
      const user = session.user;
      if (user) {
        if (token.sub) {
          user.id = token.sub;
        }
        if (token.role) {
          user.role = token.role;
        }
      }
      console.log({ sessionToken: token });
      console.log({ session });
      return session;
    }
  },
  session: { strategy: 'jwt' },
  ...authConfig
});