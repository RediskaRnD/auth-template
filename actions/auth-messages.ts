type ErrorMessageType = {
  error: string;
  success?: never;
}

type SuccessMessageType = {
  success: string;
  error?: never;
}

export const ErrorMessage = {
  EMAIL_ALREADY_IN_USE: { error: 'Email already in use.' } as ErrorMessageType,
  FAILED_TO_CREATE_USER: { error: 'Failed to create new user.' } as ErrorMessageType,
  INVALID_CREDENTIALS: { error: 'Invalid credentials!' } as ErrorMessageType,
  LOGIN_FAILED: { error: 'Login failed.' } as ErrorMessageType,
  SIGN_UP_FAILED: { error: 'Sign up failed.' } as ErrorMessageType,
  SOMETHING_WENT_WRONG: { error: 'Something went wrong.' } as ErrorMessageType,
  TOKEN_DOES_NOT_EXIST: { error: 'Token does not exist!' } as ErrorMessageType,
  TOKEN_HAS_EXPIRED: { error: 'Token has expired!' } as ErrorMessageType,
  USER_DOES_NOT_EXIST: { error: 'User does not exist!' } as ErrorMessageType,
  UNABLE_TO_CONNECT_TO_DATABASE: { error: 'Unable to connect to database.' } as ErrorMessageType,
  MISSING_TOKEN: { error: 'Missing token!' } as ErrorMessageType,
  INVALID_EMAIL: { error: 'Invalid email!' } as ErrorMessageType
} as const;

export const SuccessMessages = {
  SIGN_IN_SUCCESS: { success: 'Sign in successful! Welcome back.' } as SuccessMessageType,
  CONFIRMATION_EMAIL_SENT: { success: 'Confirmation email sent.' } as SuccessMessageType,
  RESET_EMAIL_SENT: { success: 'Reset password sent to email.' } as SuccessMessageType
} as const;

export type ResultMessage = ErrorMessageType | SuccessMessageType;


// type CatName = 'miffy' | 'boris' | 'mordred';
//
// interface CatInfo {
//   age: number;
//   breed: string;
// }
//
// const cats: Record<CatName, CatInfo> = {
//   miffy: { age: 10, breed: 'Persian' },
//   boris: { age: 5, breed: 'Maine Coon' },
//   mordred: { age: 16, breed: 'British Shorthair' }
// };