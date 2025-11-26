'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function CustomerCancelButton({ bookingId }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleCancel = async () => {
    if (
      !confirm(
        'Are you sure you want to cancel this appointment? This action cannot be undone.'
      )
    ) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/bookings/cancel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bookingId }),
      });

      if (!response.ok) {
        throw new Error('Failed to cancel booking');
      }

      toast.success('Appointment cancelled successfully');
      router.push('/my-bookings');
      router.refresh();
    } catch (error) {
      toast.error('Error cancelling appointment: ' + error.message);
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCancel}
      disabled={loading}
      className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? 'Cancelling...' : 'Cancel Appointment'}
    </button>
  );
}
