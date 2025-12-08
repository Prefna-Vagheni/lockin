'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Stripe from 'stripe';

export default function BookingSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);
  const [bookingDetails, setBookingDetails] = useState(null);

  useEffect(() => {
    // Give webhook time to process
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-700 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        {loading ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Processing Your Booking...
            </h2>
            <p className="text-gray-600">
              Please wait while we confirm your appointment.
            </p>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-3xl font-bold text-green-600 dark:text-green-500 mb-4">
              Booking Confirmed!
            </h2>
            <p className="text-gray-600 dark:text-gray-500 mb-6">
              Your appointment has been successfully booked. You&apos;ll receive
              a confirmation email shortly.
            </p>

            <div className="bg-green-50 dark:bg-green-800 rounded-lg p-4 mb-6">
              <p className="text-sm text-green-800 dark:text-green-200">
                <strong>Important:</strong> Please arrive 5 minutes before your
                appointment time.
              </p>
            </div>

            <div className="space-y-3">
              <Link
                href="/dashboard"
                className="block w-full px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white dark:text-gray-700 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-400 font-semibold"
              >
                View My Bookings
              </Link>
              <Link
                href="/booking"
                className="block w-full px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 font-semibold"
              >
                Book Another Appointment
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
