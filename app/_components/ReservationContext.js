'use client';
// ReservationContext use in the calendar when making a reservation.
import { createContext, useContext, useState } from 'react';

const ReservationContext = createContext();

const initialState = { from: undefined, to: undefined };

function ReservationProvider({ children }) {
  const [range, setRange] = useState(initialState);
  const resetRange = () => setRange(initialState);

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation() {
  const context = useContext(ReservationContext);
  if (context === undefined)
    throw new Error('Context was used outside provider.');
  return context;
}

export { useReservation, ReservationProvider };
