import { supabaseAdmin } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import CancelBookingButton from '@/components/CancelBookingButton';

export default async function BookingDetailsPage({ params }) {
  const { id } = params;

  const { data: booking, error } = await supabaseAdmin
    .from('bookings')
    .select(
      `
      *,
      client:client_id (
        id,
        name,
        email,
        phone
      ),
      staff:staff_id (
        id,
        photo_url,
        users:user_id (
          name,
          email
        )
      ),
      service:service_id (
        name,
        description,
        duration_minutes,
        price
      )
    `
    )
    .eq('id', id)
    .single();

  if (error || !booking) {
    notFound();
  }

  const startTime = new Date(booking.start_time);
  const endTime = new Date(booking.end_time);
  const isPast = startTime < new Date();
  const canCancel = !isPast && booking.status === 'confirmed';

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href="/admin/bookings"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          ← Back to all bookings
        </Link>

        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Booking Details
              </h1>
              <p className="text-gray-500">Booking ID: {booking.id}</p>
            </div>
            <span
              className={`px-4 py-2 text-sm font-semibold rounded-lg ${
                booking.status === 'confirmed'
                  ? 'bg-green-100 text-green-800'
                  : booking.status === 'cancelled'
                  ? 'bg-red-100 text-red-800'
                  : booking.status === 'completed'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {booking.status.toUpperCase()}
            </span>
          </div>

          {/* Service Info */}
          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Service Information
            </h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Service</p>
                <p className="text-lg font-semibold">{booking.service?.name}</p>
                {booking.service?.description && (
                  <p className="text-sm text-gray-600 mt-1">
                    {booking.service.description}
                  </p>
                )}
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Duration</p>
                <p className="text-lg font-semibold">
                  {booking.service?.duration_minutes} minutes
                </p>
              </div>
            </div>
          </div>

          {/* Date & Time */}
          <div className="border-t pt-6 mt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Appointment Time
            </h2>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Date</p>
                <p className="text-lg font-semibold">
                  {startTime.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Start Time</p>
                <p className="text-lg font-semibold">
                  {startTime.toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true,
                  })}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">End Time</p>
                <p className="text-lg font-semibold">
                  {endTime.toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true,
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Client Info */}
          <div className="border-t pt-6 mt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Client Information
            </h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Name</p>
                <p className="text-lg font-semibold">{booking.client?.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Email</p>
                <p className="text-lg font-semibold">{booking.client?.email}</p>
              </div>
            </div>
          </div>

          {/* Staff Info */}
          <div className="border-t pt-6 mt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Hairdresser
            </h2>
            <div className="flex items-center space-x-4">
              {booking.staff?.photo_url ? (
                <img
                  src={booking.staff.photo_url}
                  alt={booking.staff?.users?.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-2xl">
                  👤
                </div>
              )}
              <div>
                <p className="text-lg font-semibold">
                  {booking.staff?.users?.name}
                </p>
                <p className="text-sm text-gray-600">
                  {booking.staff?.users?.email}
                </p>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="border-t pt-6 mt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Payment Information
            </h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Amount</p>
                <p className="text-2xl font-bold text-green-600">
                  ${booking.total_price}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Payment ID</p>
                <p className="text-sm font-mono text-gray-600">
                  {booking.payment_intent_id || 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        {canCancel && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-red-600 mb-2">
              Cancel Appointment
            </h3>
            <p className="text-gray-600 mb-4">
              This will cancel the appointment and notify the client.
            </p>
            <CancelBookingButton bookingId={booking.id} />
          </div>
        )}
      </div>
    </div>
  );
}
