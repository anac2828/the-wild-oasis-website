import { getBookedDatesByCabinId, getSettings } from '@/app/_lib/data-service';
import DateSelector from './DateSelector';
import ReservationForm from './ReservationForm';
import { auth } from '@/app/_lib/auth';
import LoginMessage from './LoginMessage';

async function Reservation({ cabin }) {
  const session = await auth();
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);

  return (
    <div className='grid grid-cols-2 border border-primary-800 min-h-[400px]'>
      <DateSelector settings={settings} bookedDates={bookedDates} />
      {session?.user ? (
        <ReservationForm cabin={cabin} user={session.user} />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
}

export default Reservation;
