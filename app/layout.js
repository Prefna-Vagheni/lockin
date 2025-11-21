import { Inter } from 'next/font/google';
import './globals.css';
import { auth } from '@/auth';
import Providers from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'LockIn - Salon Booking System',
  description: 'Book your salon appointments with ease',
};

export default async function RootLayout({ children }) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}
