'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function BookingForm({
  staff,
  services,
  existingBookings,
  userId,
}) {
  const router = useRouter();
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [loading, setLoading] = useState(false);

  // Generate available time slots
  const generateTimeSlots = () => {
    if (!selectedService || !selectedDate) return [];

    const slots = [];
    const date = new Date(selectedDate);

    // Business hours: 9 AM to 6 PM
    for (let hour = 9; hour < 18; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const slotStart = new Date(date);
        slotStart.setHours(hour, minute, 0, 0);

        const slotEnd = new Date(slotStart);
        slotEnd.setMinutes(
          slotStart.getMinutes() + selectedService.duration_minutes
        );

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

    if (!selectedService || !selectedDate || !selectedTime) {
      alert('Please select a service, date, and time');
      return;
    }

    setLoading(true);

    // Redirect to checkout
    const bookingData = {
      staffId: staff.id,
      staffName: staff.users.name,
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      servicePrice: selectedService.price,
      serviceDuration: selectedService.duration_minutes,
      date: selectedDate,
      time: selectedTime,
      userId: userId,
    };

    const queryString = new URLSearchParams(bookingData).toString();
    router.push(`/booking/checkout?${queryString}`);
  };

  // Get minimum date (today)
  const minDate = new Date().toISOString().split('T')[0];

  // Get maximum date (3 months from now)
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Service Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Select Service *
        </label>
        <div className="grid grid-cols-1 gap-3">
          {services.map((service) => (
            <button
              key={service.id}
              type="button"
              onClick={() => {
                setSelectedService(service);
                setSelectedTime(''); // Reset time when service changes
              }}
              className={`p-4 border-2 rounded-lg text-left transition ${
                selectedService?.id === service.id
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {service.name}
                  </h3>
                  {service.description && (
                    <p className="text-sm text-gray-600 mt-1">
                      {service.description}
                    </p>
                  )}
                  <p className="text-sm text-gray-500 mt-2">
                    Duration: {service.duration_minutes} minutes
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-green-600">
                    ${service.price}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Date Selection */}
      {selectedService && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Date *
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
      )}

      {/* Time Selection */}
      {selectedService && selectedDate && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Select Time *
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

      {/* Summary & Submit */}
      {selectedService && selectedDate && selectedTime && (
        <div className="border-t pt-6">
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-gray-900 mb-4">
              Booking Summary
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Hairdresser:</span>
                <span className="font-medium">{staff.users.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Service:</span>
                <span className="font-medium">{selectedService.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium">
                  {new Date(selectedDate).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time:</span>
                <span className="font-medium">{selectedTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Duration:</span>
                <span className="font-medium">
                  {selectedService.duration_minutes} minutes
                </span>
              </div>
              <div className="flex justify-between pt-3 border-t">
                <span className="text-gray-900 font-semibold">Total:</span>
                <span className="text-2xl font-bold text-green-600">
                  ${selectedService.price}
                </span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {loading ? 'Processing...' : 'Proceed to Payment'}
          </button>

          <p className="text-sm text-gray-500 text-center mt-4">
            You&apos;ll be redirected to secure payment. Payment is required to
            confirm your booking.
          </p>
        </div>
      )}
    </form>
  );
}
