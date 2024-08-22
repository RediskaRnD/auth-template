import { UserDto } from '@/data/userDto';
import { prisma } from '@/lib/db';

export const getUserByEmail = async (email: string): Promise<UserDto | null> => {
  try {
    return await prisma.user.findUnique({ where: { email } });
  } catch {
    return null;
  }
};

export const getUserById = async (id: string): Promise<UserDto | null> => {
  try {
    return await prisma.user.findUnique({ where: { id } });
  } catch {
    return null;
  }
};