import UpdateReservationForm from '@/app/_components/UpdateReservationForm';
import { getBooking, getCabin } from '@/app/_lib/data-service';

export default async function Page({ params }) {
  const {
    id: bookingId,
    numGuests,
    cabinId,
    observations,
  } = await getBooking(params.bookingId);
  const { maxCapacity } = await getCabin(cabinId);
  console.log(numGuests);

  return (
    <div>
      <h2 className='text-2xl font-semibold text-accent-400 mb-7'>
        Edit Reservation #{bookingId}
      </h2>
      <UpdateReservationForm
        reservationId={bookingId}
        numGuests={numGuests}
        maxCapacity={maxCapacity}
        observations={observations}
      />
    </div>
  );
}
