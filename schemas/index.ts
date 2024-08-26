import * as z from 'zod';

const MIN_PASSWORD_LENGTH = 8;

export const SignInSchema = z.object({
  email: z.string().email('Email is required'),
  password: z.string().min(1, {
    message: 'Password is required'
  })
});

export const SignUpSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Email is required'),
  password: z.string().min(MIN_PASSWORD_LENGTH, `Minimum ${MIN_PASSWORD_LENGTH} characters required`)
});

export const ResetSchema = z.object({
  email: z.string().email('Email is required')
});