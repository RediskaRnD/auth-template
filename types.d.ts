import { UserRole } from '@prisma/client';

declare module '@auth/core/jwt' {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    role: UserRole | undefined;
  }
}