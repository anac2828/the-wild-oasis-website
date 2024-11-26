import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

// Set up your app on google developer console first to get the Google ID and Google Secret
const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user; //"!!" converts value to a boolean. This funcition will be used by the middleware to determine if a user is signed in.
    },
  },
  pages: {
    signIn: '/login', //when middleware runs and the callbacks funcitions returns false the user will be redirected to /login
  },
};

// GET AND POST will be imported in the api/[...nextauth]/route.js. "auth" is used in the Navigation component to check for sign in users.
export const {
  auth,
  signIn, //function to use on a button
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
