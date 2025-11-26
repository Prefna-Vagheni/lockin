'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function CancelBookingButton({ bookingId }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCancel = async () => {
    if (
      !confirm(
        'Are you sure you want to cancel this booking? This action cannot be undone.'
      )
    ) {
      return;
    }

    setLoading(true);
    const loadingToast = toast.loading('Cancelling booking...');
    setError('');

    try {
      console.log('Cancelling booking:', bookingId);

      const response = await fetch('/api/bookings/cancel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bookingId }),
      });

      const data = await response.json();
      console.log('Response:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Failed to cancel booking');
      }

      toast.success('Booking cancelled successfully! Email sent to client.', {
        id: loadingToast,
        duration: 5000,
      });

      router.push('/admin/bookings');
      router.refresh();
    } catch (error) {
      toast.error('Error: ' + error.message, {
        id: loadingToast,
      });

      setLoading(false);
    }
  };

  return (
    <div>
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded mb-4">
          Error: {error}
        </div>
      )}
      <button
        onClick={handleCancel}
        disabled={loading}
        className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Cancelling...' : 'Cancel Booking'}
      </button>
    </div>
  );
}
