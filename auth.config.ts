import PostgresAdapter from '@auth/pg-adapter';
import bcrypt from 'bcrypt';
import type { NextAuthConfig, User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

import { pgPool } from '@/lib/db';
import { SignInSchema } from '@/schemas';
import { getUserByEmail } from '@/sqlc/db/query_sql';

export default {
  // adapter: PostgresAdapter(pgPool),
  providers: [Credentials({
    credentials: {
      username: { label: 'Username' },
      password: { label: 'Password', type: 'password' }
    },
    async authorize(credentials): Promise<User | null> {
      const validatedFields = SignInSchema.safeParse(credentials);

      if (validatedFields.success) {
        const { email, password } = validatedFields.data;

        // const client = await pgPool?.connect();
        // if (!client) {
        //   return null;
        // }
        // try {
        //   const user = await getUserByEmail(client, { email });
        //   if (!user?.name) {  // TODO: replace with !user?.password
        //     return null;
        //   }
        //   const passwordMatched = await bcrypt.compare(password, user.name);
        //   if (passwordMatched) {
        //     return { id: user.id.toString(), email: user.email, name: user.name };
        //   }
        // } finally {
        //   client.release();
        // }
      }
      return null;
    }
  }), GitHub, Google]
} satisfies NextAuthConfig;