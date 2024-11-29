// Only for server actions not components. Allows client to talk to server.
'use server';

// ** IMPORTS ** //
// Function from Next-auth
import { auth, signIn, signOut } from './auth';
import { getBookings } from './data-service';
import { supabase } from './supabase';
import { revalidatePath } from 'next/cache';

// ** UPDATE GUEST ** //

export async function updateGuest(formData) {
  // Check if user is signed in. Don't use trycatch on server actions, it is better to throw an error and it will be caught by the closes error boundry component.
  const session = await auth();
  if (!session) throw new Error('You must be logged in.');

  const nationalID = formData.get('nationalID');
  const [nationality, countryFlag] = formData.get('nationality').split('%');

  // Regex function to check i f nationalID is a numeric number between 6 and 12 characters
  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error('Please provide a valid national ID');

  const updateData = { nationality, countryFlag, nationalID };

  const { error } = await supabase
    .from('guests')
    .update(updateData)
    .eq('id', session.user.guestId);

  if (error) {
    throw new Error('Guest could not be updated');
  }

  // Will clear the cache after the form is submitted.
  revalidatePath('/account/profile');
}

// ** DELETE RESERVATION ** //

export async function deleteReservation(bookingId) {
  const session = await auth();
  if (!session) throw new Error('You must be logged in.');

  // Get all bookings made by guest
  const guestBookings = await getBookings(session.user.guestId);
  // Array of booking ids
  const guestBookingsId = guestBookings.map((booking) => booking.id);

  // If the bookingId is not included in the array of guestBookingsId the booking cannot be deleted. This is to prevent from anyone to delete bookings.
  if (!guestBookingsId.includes(bookingId))
    throw new Error('You are not allowed to delete this booking');

  const { error } = await supabase
    .from('bookings')
    .delete()
    .eq('id', bookingId);

  if (error) throw new Error('Booking could not be deleted.');

  revalidatePath('/account/reservations');
}

// ** SIGN IN AND OUT ** //

export async function signInAction() {
  await signIn('google', { redirectTo: '/account' });
}

export async function signOutAction() {
  await signOut({ redirectTo: '/' });
}
