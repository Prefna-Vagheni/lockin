import { auth } from '@/auth';
import { redirect, notFound } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase';
import Link from 'next/link';
import CustomerCancelButton from '@/_components/CustomerCancelButton';
import Image from 'next/image';

export default async function MyBookingDetailsPage({ params }) {
  const session = await auth();

  if (!session) {
    redirect('/auth/signin');
  }

  const { id } = await params;

  const { data: booking, error } = await supabaseAdmin
    .from('bookings')
    .select(
      `
      *,
      staff:staff_id (
        id,
        photo_url,
        bio,
        specialties,
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
    .eq('client_id', session.user.id) // Ensure user can only see their own bookings
    .single();

  if (error || !booking) {
    notFound();
  }

  const startTime = new Date(booking.start_time);
  const endTime = new Date(booking.end_time);
  const isPast = startTime < new Date();
  const canCancel = !isPast && booking.status === 'confirmed';
  const isCancelled = booking.status === 'cancelled';

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/my-bookings"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          ← Back to my appointments
        </Link>

        {/* Main Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-linear-to-r from-blue-500 to-purple-600 p-6 text-white">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  {booking.service?.name}
                </h1>
                <p className="text-blue-100">Appointment Details</p>
              </div>
              <span
                className={`px-4 py-2 text-sm font-semibold rounded-lg ${
                  booking.status === 'confirmed'
                    ? 'bg-green-500 text-white'
                    : booking.status === 'cancelled'
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {booking.status.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Cancelled Notice */}
            {isCancelled && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 font-medium">
                  ❌ This appointment has been cancelled
                </p>
              </div>
            )}

            {/* Staff Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Your Hairdresser
              </h2>
              <div className="flex items-start space-x-4">
                <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 shrink-0">
                  {booking.staff?.photo_url ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={booking.staff.photo_url}
                        alt={booking.staff?.users?.name}
                        className="object-cover"
                        fill
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-3xl">
                      👤
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">
                    {booking.staff?.users?.name}
                  </h3>
                  {booking.staff?.bio && (
                    <p className="text-gray-600 mb-3">{booking.staff.bio}</p>
                  )}
                  {booking.staff?.specialties &&
                    booking.staff.specialties.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {booking.staff.specialties.map((specialty, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    )}
                </div>
              </div>
            </div>

            {/* Date & Time Section */}
            <div className="mb-8 p-6 bg-gray-50 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                📅 When
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {startTime.toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Time</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {startTime.toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true,
                    })}
                    {' - '}
                    {endTime.toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true,
                    })}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Duration: {booking.service?.duration_minutes} minutes
                  </p>
                </div>
              </div>
            </div>

            {/* Service Details */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Service Details
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Service</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {booking.service?.name}
                  </p>
                  {booking.service?.description && (
                    <p className="text-sm text-gray-600 mt-1">
                      {booking.service.description}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Payment Section */}
            <div className="mb-8 p-6 bg-green-50 rounded-lg border-2 border-green-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                💳 Payment Confirmed
              </h2>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    Total Amount Paid
                  </p>
                  <p className="text-3xl font-bold text-green-600">
                    ${booking.total_price}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Payment ID</p>
                  <p className="text-xs font-mono text-gray-600">
                    {booking.payment_intent_id?.slice(0, 20)}...
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              {canCancel && (
                <Link
                  href={`/my-bookings/${booking.id}/reschedule`}
                  className="flex-1 px-6 py-3 bg-green-600 text-white text-center rounded-lg hover:bg-green-700 font-medium"
                >
                  📅 Reschedule
                </Link>
              )}
              <Link
                href="/booking"
                className="flex-1 px-6 py-3 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 font-medium"
              >
                Book Another Appointment
              </Link>
              <Link
                href="/my-bookings"
                className="px-6 py-3 bg-gray-200 text-gray-700 text-center rounded-lg hover:bg-gray-300 font-medium"
              >
                View All Bookings
              </Link>
            </div>
          </div>

          {/* Cancel Section */}
          {canCancel && (
            <div className="border-t p-6 bg-gray-50">
              <h3 className="text-lg font-semibold text-red-600 mb-2">
                Need to Cancel?
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                If you need to cancel this appointment, please do so at least 24
                hours in advance.
              </p>
              <CustomerCancelButton bookingId={booking.id} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
