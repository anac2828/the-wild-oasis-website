'use client';

import { updateReservation } from '@/app/_lib/actions';
import SubmitButton from '@/app/_components/SubmitButton';

function UpdateReservationForm({
  reservationId,
  maxCapacity,
  numGuests,
  observations,
}) {
  return (
    <form
      action={updateReservation}
      className='flex flex-col gap-6 px-12 py-8 text-lg bg-primary-900'
    >
      <input type='hidden' name='reservationId' value={reservationId} />
      <div className='space-y-2'>
        <label htmlFor='numGuests'>How many guests?</label>
        <select
          name='numGuests'
          defaultValue={numGuests}
          id='numGuests'
          className='w-full px-5 py-3 rounded-sm shadow-sm bg-primary-200 text-primary-800'
          required
        >
          <option value='' key=''>
            Select number of guests...
          </option>
          {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
            <option value={x} key={x}>
              {x} {x === 1 ? 'guest' : 'guests'}
            </option>
          ))}
        </select>
      </div>

      <div className='space-y-2'>
        <label htmlFor='observations'>
          Anything we should know about your stay?
        </label>
        <textarea
          name='observations'
          defaultValue={observations}
          className='w-full px-5 py-3 rounded-sm shadow-sm bg-primary-200 text-primary-800'
        />
      </div>

      <div className='flex items-center justify-end gap-6'>
        <SubmitButton pedingLabel='...Updating reservation'>
          Update reservation
        </SubmitButton>
      </div>
    </form>
  );
}

export default UpdateReservationForm;
