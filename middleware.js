import { auth } from '@/app/_lib/auth';

// export function middleware(request) {
//   console.log(request);
//   return NextResponse.redirect(new URL('/about', request.url));
// }

// Match will run the middleware only on specified routes

export const middleware = auth;

// When /account route is requested the auth.js callbacks will be called and will return true if user is signed in or false.
export const config = {
  matcher: ['/account'],
};
