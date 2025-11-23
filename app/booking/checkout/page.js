'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const bookingData = {
    staffId: searchParams.get('staffId'),
    staffName: searchParams.get('staffName'),
    serviceId: searchParams.get('serviceId'),
    serviceName: searchParams.get('serviceName'),
    servicePrice: searchParams.get('servicePrice'),
    serviceDuration: searchParams.get('serviceDuration'),
    date: searchParams.get('date'),
    time: searchParams.get('time'),
    userId: searchParams.get('userId'),
  };

  useEffect(() => {
    handleCheckout();
  }, []); // I consider adding the missing dependancy

  const handleCheckout = async () => {
    try {
      // Create checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      // Redirect directly to Stripe's URL (new method)
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setError(err.message || 'Something went wrong');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        {error ? (
          <>
            <div className="text-6xl mb-4">❌</div>
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              Payment Error
            </h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={router.push(
                '/booking/786669f9-89be-446d-a03a-00e863267b39'
              )}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Go Back
            </button>
          </>
        ) : (
          <>
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Redirecting to Payment...
            </h2>
            <p className="text-gray-600">
              Please wait while we redirect you to our secure payment page.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
