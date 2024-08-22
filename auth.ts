import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';

import authConfig from '@/auth.config';
import { prisma } from '@/lib/db';

export const { auth, handlers, signIn, signOut } = NextAuth({
  debug: process.env.NODE_ENV !== 'production',
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  ...authConfig
});