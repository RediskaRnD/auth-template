import { UserRole } from '@prisma/client';

export type UserDto = {
  id: string;
  name?: string | null;
  email: string;
  password?: string | null;
  role?: UserRole;
  emailVerified?: Date | null;
  image?: string | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
};
