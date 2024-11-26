import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { createGuest, getGuest } from './data-service';

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
    // The args are made available by next-auth. Will check if user exists on supabase if not it a guest will be created. After signIn is completed the session function below will run.
    async signIn({ user, account, profile }) {
      try {
        const existingGuest = await getGuest(user.email);
        console.log('existingGuest', existingGuest);
        if (!existingGuest)
          await createGuest({
            email: user.email,
            fullName: user.name,
          });
        return true;
      } catch (error) {
        return false;
      }
    },
    // args comes from signIn above.
    async session({ session, user }) {
      const guest = await getGuest(session.user.email);
      session.user.guestId = guest.id;
      return session;
    },
  },

  pages: {
    signIn: '/login', //when middleware runs and the callbacks funcitions returns false because the user is not logged in they will be redirected to /login
  },
};

// GET AND POST will be imported in the api/[...nextauth]/route.js. "auth" is used in the Navigation component to check for sign in users.
export const {
  auth,
  signIn, //function to use on a button
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
