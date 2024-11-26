'use server';

// Function from Next-auth
import { signIn, signOut } from './auth';

export async function signInAction() {
  await signIn('google', { redirectTo: '/account' });
}

export async function signOutAction() {
  await signOut({ redirectTo: '/' });
}
