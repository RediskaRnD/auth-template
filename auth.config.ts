import bcrypt from 'bcrypt';
import type { NextAuthConfig, User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

import { pgPool } from '@/lib/db';
import { SignInSchema } from '@/schemas';
import { getUserByEmail } from '@/data/user';

export default {
  providers: [Credentials({
    credentials: {
      username: { label: 'Username' },
      password: { label: 'Password', type: 'password' }
    },
    async authorize(credentials): Promise<User | null> {
      const validatedFields = SignInSchema.safeParse(credentials);

      if (validatedFields.success) {
        const { email, password } = validatedFields.data;

        // const user = await getUserByEmail(email);
        // const client = await pgPool?.connect();
        // if (client) {
        //   try {
        //     const user = await getUserByEmail(client, { email });
        //     if (!user?.name) {  // TODO: replace with !user?.password
        //       return null;
        //     }
        //     const passwordMatched = await bcrypt.compare(password, user.name);
        //     if (passwordMatched) {
        //       return { id: user.id.toString(), email: user.email, name: user.name };
        //     }
        //   } finally {
        //     client.release();
        //   }
        // }
      }
      return null;
    }
  }), GitHub, Google]
} satisfies NextAuthConfig;