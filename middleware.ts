import NextAuth from 'next-auth';

import authConfig from '@/auth.config';
import { apiAuthPrefix, authRoutes, DEFAULT_LOGIN_REDIRECT, publicRoutes, SIGN_IN_PAGE } from '@/routes';

const { auth } = NextAuth(authConfig);

export default auth((req): Response | void => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  console.log('URL: ', req.url);
  console.log('Is logged in: ', isLoggedIn);
  console.log('Auth: ', req.auth);

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  if (!isPublicRoute && !isLoggedIn) {
    return Response.redirect(new URL(SIGN_IN_PAGE, nextUrl));
  }
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)'
  ]
};