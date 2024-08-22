export type UserDto = {
  id: string;
  name?: string | null;
  email: string;
  password?: string | null;
  emailVerified?: Date | null;
  image?: string | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
};