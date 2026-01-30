'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
// import { rescheduleBooking } from '@/actions/reschedule';
import { rescheduleBooking } from '../actions/reschedule';
import toast from 'react-hot-toast';

export default function RescheduleForm({
  bookingId,
  staffId,
  serviceDuration,
  existingBookings,
}) {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Generate available time slots
  const generateTimeSlots = () => {
    if (!selectedDate) return [];

    const slots = [];
    const date = new Date(selectedDate);

    // Business hours: 9 AM to 6 PM
    for (let hour = 9; hour < 18; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const slotStart = new Date(date);
        slotStart.setHours(hour, minute, 0, 0);

        const slotEnd = new Date(slotStart);
        slotEnd.setMinutes(slotStart.getMinutes() + serviceDuration);

        // Check if slot conflicts with existing bookings
        const isBooked = existingBookings.some((booking) => {
          const bookingStart = new Date(booking.start_time);
          const bookingEnd = new Date(booking.end_time);
          return (
            (slotStart >= bookingStart && slotStart < bookingEnd) ||
            (slotEnd > bookingStart && slotEnd <= bookingEnd) ||
            (slotStart <= bookingStart && slotEnd >= bookingEnd)
          );
        });

        if (!isBooked && slotEnd.getHours() <= 18) {
          slots.push({
            time: slotStart.toTimeString().slice(0, 5),
            display: slotStart.toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: '2-digit',
              hour12: true,
            }),
          });
        }
      }
    }

    return slots;
  };

  const timeSlots = generateTimeSlots();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedDate || !selectedTime) {
      setError('Please select both date and time');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await rescheduleBooking(
        bookingId,
        selectedDate,
        selectedTime,
        serviceDuration,
      );

      if (result.success) {
        toast.success('Appointment rescheduled successfully!');
        router.push(`/my-bookings/${bookingId}`);
        router.refresh();
      } else {
        toast.error('Failed to reschedule');
        setError(result.error || 'Failed to reschedule');
        setLoading(false);
      }
    } catch (err) {
      toast.error('Error ', +err.message);
      setError('An unexpected error occurred');
      setLoading(false);
    }
  };

  const minDate = new Date().toISOString().split('T')[0];

  // Get maximum date (3 months from now)
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded">{error}</div>
      )}

      {/* Date Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select New Date *
        </label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => {
            setSelectedDate(e.target.value);
            setSelectedTime(''); // Reset time when date changes
          }}
          min={minDate}
          max={maxDateStr}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      {selectedDate && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Select New Time *
          </label>
          {timeSlots.length === 0 ? (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
              <p className="text-yellow-800">
                No available time slots for this date. Please choose another
                date.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {timeSlots.map((slot) => (
                <button
                  key={slot.time}
                  type="button"
                  onClick={() => setSelectedTime(slot.time)}
                  className={`px-4 py-3 border-2 rounded-lg font-medium transition ${
                    selectedTime === slot.time
                      ? 'border-blue-600 bg-blue-600 text-white'
                      : 'border-gray-200 hover:border-blue-300 text-gray-700'
                  }`}
                >
                  {slot.display}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {selectedDate && selectedTime && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">
            New Appointment Time
          </h3>
          <p className="text-blue-800">
            <strong>
              {new Date(selectedDate).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </strong>
            {' at '}
            <strong>{selectedTime}</strong>
          </p>
        </div>
      )}

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading || !selectedDate || !selectedTime}
          className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Rescheduling...' : 'Confirm Reschedule'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          disabled={loading}
          className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
