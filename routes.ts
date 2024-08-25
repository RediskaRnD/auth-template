/**
 * The default redirect path after logged in
 */
export const DEFAULT_LOGIN_REDIRECT = '/settings';
export const SIGN_IN_PAGE = '/auth/sign-in';
export const SIGN_UP_PAGE = '/auth/sign-up';
export const ERROR_PAGE = '/auth/error';

/**
 * An array of routes that are accessible to the public.
 * These routes do not require authentication.
 */
export const publicRoutes = [
  '/'
];

/**
 * An array of routes that used for authentication.
 * These routes will redirect logged-in users to DEFAULT_LOGIN_REDIRECT.
 */
export const authRoutes = [
  SIGN_IN_PAGE,
  SIGN_UP_PAGE,
  ERROR_PAGE
];

/**
 * The prefix for API authentication routes.
 * Routes that start with this prefix are used for API authentication purposes.
 */
export const apiAuthPrefix = '/api/auth';