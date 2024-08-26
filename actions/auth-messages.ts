export type ErrorMessage = {
  error: string;
  success?: never;
}

export type SuccessMessage = {
  success: string;
  error?: never;
}

export const ErrorMessages = {
  EMAIL_ALREADY_IN_USE: { error: 'Email already in use.' } as ErrorMessage,
  FAILED_TO_CREATE_USER: { error: 'Failed to create new user.' } as ErrorMessage,
  INVALID_CREDENTIALS: { error: 'Invalid credentials!' } as ErrorMessage,
  LOGIN_FAILED: { error: 'Login failed.' } as ErrorMessage,
  SIGN_UP_FAILED: { error: 'Sign up failed.' } as ErrorMessage,
  SOMETHING_WENT_WRONG: { error: 'Something went wrong.' } as ErrorMessage,
  TOKEN_DOES_NOT_EXIST: { error: 'Token does not exist!' } as ErrorMessage,
  TOKEN_HAS_EXPIRED: { error: 'Token has expired!' } as ErrorMessage,
  USER_DOES_NOT_EXIST: { error: 'User does not exist!' } as ErrorMessage,
  UNABLE_TO_CONNECT_TO_DATABASE: { error: 'Unable to connect to database.' } as ErrorMessage
} as const;

export const SuccessMessages = {
  SIGN_IN_SUCCESS: { success: 'Sign in successful! Welcome back.' } as SuccessMessage,
  CONFIRMATION_EMAIL_SENT: { success: 'Confirmation email sent.' } as SuccessMessage
} as const;

export type ResultMessage = ErrorMessage | SuccessMessage;