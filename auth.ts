import PostgresAdapter from '@auth/pg-adapter';
import NextAuth from 'next-auth';

import authConfig from '@/auth.config';
import { pgPool } from '@/lib/db';

export const { auth, handlers, signIn, signOut } = NextAuth({
  debug: true,
  // adapter: PostgresAdapter(pgPool!),
  session: { strategy: 'jwt' },
  ...authConfig
});