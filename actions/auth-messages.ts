type ErrorMessageType = {
  error: string;
  success?: undefined;
}

type SuccessMessageType = {
  success: string;
  error?: undefined;
}

export const ErrorMessage = {
  EMAIL_ALREADY_IN_USE: { error: 'Email already in use.' },
  FAILED_TO_CREATE_USER: { error: 'Failed to create new user.' },
  INVALID_CREDENTIALS: { error: 'Invalid credentials.' },
  LOGIN_FAILED: { error: 'Login failed.' },
  SIGN_UP_FAILED: { error: 'Sign up failed.' },
  SOMETHING_WENT_WRONG: { error: 'Something went wrong.' },
  TOKEN_DOES_NOT_EXIST: { error: 'Token does not exist.' },
  TOKEN_HAS_EXPIRED: { error: 'Token has expired.' },
  USER_DOES_NOT_EXIST: { error: 'User does not exist.' },
  UNABLE_TO_CONNECT_TO_DATABASE: { error: 'Unable to connect to database.' },
  MISSING_TOKEN: { error: 'Missing token.' },
  INVALID_EMAIL: { error: 'Invalid email.' }
} as const satisfies Record<string, ErrorMessageType>;

export const SuccessMessage = {
  WAITING: { success: '' },
  SIGN_IN_SUCCESS: { success: 'Sign in successful! Welcome back.' },
  CONFIRMATION_EMAIL_SENT: { success: 'Confirmation email sent!' },
  RESET_EMAIL_SENT: { success: 'If an account with that email exists, you will receive a password reset link shortly.' },
  EMAIL_VERIFIED: { success: 'Email verified!' }
} as const satisfies Record<string, SuccessMessageType>;

export type ResultMessage = ErrorMessageType | SuccessMessageType;