/**
 * The default redirect path after logged in
 */
export const DEFAULT_LOGIN_REDIRECT = '/settings';
export const SIGN_IN_PAGE = '/auth/sign-in';
export const SIGN_UP_PAGE = '/auth/sign-up';
export const AUTH_RESET_PAGE = '/auth/reset';
export const ERROR_PAGE = '/auth/error';
export const EMAIL_VERIFICATION_PAGE = '/auth/email-verification';
/**
 * An array of routes that are accessible to the public.
 * These routes do not require authentication.
 */
export const publicRoutes = [
  '/',
  EMAIL_VERIFICATION_PAGE
];

/**
 * An array of routes that used for authentication.
 * These routes will redirect logged-in users to DEFAULT_LOGIN_REDIRECT.
 */
export const authRoutes = [
  SIGN_IN_PAGE,
  SIGN_UP_PAGE,
  AUTH_RESET_PAGE,
  ERROR_PAGE
];

/**
 * The prefix for API authentication routes.
 * Routes that start with this prefix are used for API authentication purposes.
 */
export const apiAuthPrefix = '/api/auth';