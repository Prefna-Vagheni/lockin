import { Inter } from 'next/font/google';
import './globals.css';
import { auth } from './auth';
import Providers from './providers';
// import { ThemeProvider } from '@/contexts/ThemeContext';
import { ThemeProvider } from './contexts/ThemeContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'LockIn - Salon Booking System',
  description: 'Book your salon appointments with ease',
};

export default async function RootLayout({ children }) {
  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors`}
      >
        <ThemeProvider>
          <Providers session={session}>{children}</Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
