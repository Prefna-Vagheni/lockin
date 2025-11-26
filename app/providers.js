'use client';

import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';

export default function Providers({ children, session }) {
  return (
    <SessionProvider session={session}>
      {children}
      <Toaster
        position="top-center"
        toastOptions={{
          // Default options
          duration: 4000,
          style: {
            background: '#fff',
            color: '#333',
          },
          // Success toast style
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },

          // Error toast style
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },

          // Dark mode support
          className: 'dark:bg-gray-800 dark:text-white',
        }}
      />
    </SessionProvider>
  );
}
