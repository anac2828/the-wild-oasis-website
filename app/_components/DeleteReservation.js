'use client';

import { useTransition } from 'react';
import { TrashIcon } from '@heroicons/react/24/solid';
import { deleteReservation } from '@/app/_lib/actions';
import SpinnerMini from '@/app/_components/SpinnerMini';

function DeleteReservation({ bookingId }) {
  //Use useTransition when an action is not being called on a form button.
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this reservation?'))
      // Marks the deleteReservation as a transition and the isPending will become true as the deleteReservation is running.
      startTransition(() => deleteReservation(bookingId));
  };

  return (
    <button
      onClick={handleDelete}
      className='flex items-center flex-grow gap-2 px-3 text-xs font-bold uppercase transition-colors group text-primary-300 hover:bg-accent-600 hover:text-primary-900'
    >
      {isPending ? (
        <span className='mx-auto'>
          <SpinnerMini />
        </span>
      ) : (
        <>
          <TrashIcon className='w-5 h-5 transition-colors text-primary-600 group-hover:text-primary-800' />
          <span className='mt-1'>Delete</span>
        </>
      )}
    </button>
  );
}

export default DeleteReservation;
