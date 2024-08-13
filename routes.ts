/**
 * The default redirect path after logged in
 */
export const DEFAULT_LOGIN_REDIRECT = '/settings';
export const SIGNIN_PAGE = '/auth/sign-in';
export const SIGNUP_PAGE = '/auth/sign-up';

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
  SIGNIN_PAGE,
  SIGNUP_PAGE
];

/**
 * The prefix for API authentication routes.
 * Routes that start with this prefix are used for API authentication purposes.
 */
export const apiAuthPrefix = '/api/auth';