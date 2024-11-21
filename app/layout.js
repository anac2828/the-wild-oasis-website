import '@/app/_styles/globals.css';
import Header from '@/app/_components/Header';

//  ** FONTS ** //
import { Josefin_Sans } from 'next/font/google';
import { ReservationProvider } from '@/app/_components/ReservationContext';

const josefin = Josefin_Sans({
  subsets: ['latin'],
  display: 'swap',
});

// ** META DATA ** //
export const metadata = {
  // title: 'The Wild Oasis', // Page title that displays on the browser tab.
  title: {
    template: '%s | The Wild Oasis',
    default: 'Welcome / The Wild Oasis',
  },
  description:
    'Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests',
};

// GLOBAL LAYOUT

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      {/* min-h-screen gives the body a height of 100% viewport height */}
      <body
        className={`${josefin.className} min-h-screen bg-primary-950 text-primary-100 flex flex-col antialiased`}
      >
        <Header />
        {/* Flex-1 will grow the div to the full height of the browser */}
        <div className='grid flex-1 px-8 py-12'>
          <main className='w-full mx-auto max-w-7xl'>
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
