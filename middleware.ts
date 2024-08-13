import { auth } from '@/auth';
import {
  apiAuthPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes, SIGNIN_PAGE
} from '@/routes';

export default auth((req): Response | void => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  console.log('ROUTE: ', req.url);
  console.log('IS LOGGED IN: ', isLoggedIn);

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
    return Response.redirect(new URL(SIGNIN_PAGE, nextUrl));
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