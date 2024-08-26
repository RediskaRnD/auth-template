import bcrypt from 'bcryptjs';
import type { NextAuthConfig, User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

import { getUserByEmail } from '@/data/user';
import { SignInSchema } from '@/schemas';

export default {
  providers: [
    GitHub({
      allowDangerousEmailAccountLinking: true
    }),
    Google({
      allowDangerousEmailAccountLinking: true
    }),
    Credentials({
      credentials: {
        username: { label: 'Username' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials): Promise<User | null> {
        const validatedFields = SignInSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          // const client = await pgPool?.connect();
          // if (client) {
          //   try {
          //     const user = await getUserByEmail(client, { email });
          const existingUser = await getUserByEmail(email);
          if (!existingUser?.password) {
            return null;
          }
          const passwordMatched = await bcrypt.compare(password, existingUser.password);
          if (passwordMatched) {
            return {
              id: existingUser.id.toString(),
              name: existingUser.name ?? null,
              email: existingUser.email
            };
          }
          //   } finally {
          //     client.release();
          //   }
          // }
        }
        return null;
      }
    })
  ]
} satisfies NextAuthConfig;