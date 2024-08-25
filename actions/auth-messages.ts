export const ErrorMessage = {
  EMAIL_ALREADY_IN_USE: { error: 'Email already in use.' } as const,
  FAILED_TO_CREATE_USER: { error: 'Failed to create new user.' },
  INVALID_CREDENTIALS: { error: 'Invalid credentials!' } as const,
  LOGIN_FAILED: { error: 'Login failed.' } as const,
  SIGN_UP_FAILED: { error: 'Sign up failed.' } as const,
  SOMETHING_WENT_WRONG: { error: 'Something went wrong.' } as const
} as const;

export const SuccessMessage = {
  CONFIRMATION_EMAIL_SENT: { success: 'Confirmation email sent.' } as const
} as const;