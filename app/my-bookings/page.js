import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase';
import Link from 'next/link';

export default async function MyBookingsPage() {
  const session = await auth();

  if (!session) {
    redirect('/auth/signin?callbackUrl=/my-bookings');
  }

  // Fetch user's bookings
  const { data: bookings } = await supabaseAdmin
    .from('bookings')
    .select(
      `
      *,
      staff:staff_id (
        id,
        photo_url,
        users:user_id (
          name
        )
      ),
      service:service_id (
        name,
        duration_minutes,
        price
      )
    `
    )
    .eq('client_id', session.user.id)
    .order('start_time', { ascending: false });

  // Separate upcoming and past bookings
  const now = new Date();
  const upcoming =
    bookings?.filter(
      (b) => new Date(b.start_time) >= now && b.status !== 'cancelled'
    ) || [];

  const past =
    bookings?.filter(
      (b) => new Date(b.start_time) < now || b.status === 'cancelled'
    ) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-blue-600">
                LockIn
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/booking"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Book New Appointment
              </Link>
              <Link
                href="/dashboard"
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            My Appointments
          </h1>
          <p className="text-gray-600">View and manage your salon bookings</p>
        </div>

        {/* No bookings yet */}
        {!bookings || bookings.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No appointments yet
            </h3>
            <p className="text-gray-500 mb-6">
              Book your first appointment with our talented hairdressers!
            </p>
            <Link
              href="/booking"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              Book Appointment
            </Link>
          </div>
        ) : (
          <>
            {/* Upcoming Bookings */}
            {upcoming.length > 0 && (
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Upcoming Appointments ({upcoming.length})
                </h2>
                <div className="space-y-4">
                  {upcoming.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} upcoming />
                  ))}
                </div>
              </section>
            )}

            {/* Past Bookings */}
            {past.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Past Appointments ({past.length})
                </h2>
                <div className="space-y-4">
                  {past.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </main>
    </div>
  );
}

function BookingCard({ booking, upcoming = false }) {
  const startTime = new Date(booking.start_time);
  const endTime = new Date(booking.end_time);
  const isToday = startTime.toDateString() === new Date().toDateString();
  const isCancelled = booking.status === 'cancelled';

  return (
    <div
      className={`bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition ${
        isCancelled ? 'opacity-60' : ''
      }`}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            {/* Staff Photo */}
            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
              {booking.staff?.photo_url ? (
                <img
                  src={booking.staff.photo_url}
                  alt={booking.staff?.users?.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-2xl">
                  👤
                </div>
              )}
            </div>

            {/* Booking Info */}
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                {booking.service?.name}
              </h3>
              <p className="text-gray-600">with {booking.staff?.users?.name}</p>
            </div>
          </div>

          {/* Status Badges */}
          <div className="flex flex-col items-end space-y-2">
            {isToday && !isCancelled && (
              <span className="px-3 py-1 bg-orange-100 text-orange-800 text-xs font-semibold rounded-full">
                TODAY
              </span>
            )}
            <span
              className={`px-3 py-1 text-xs font-semibold rounded-full ${
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
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-500">Date</p>
            <p className="font-semibold text-gray-900">
              {startTime.toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Time</p>
            <p className="font-semibold text-gray-900">
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
          </div>
          <div>
            <p className="text-sm text-gray-500">Duration</p>
            <p className="font-semibold text-gray-900">
              {booking.service?.duration_minutes} minutes
            </p>
          </div>
        </div>

        {/* Price & Actions */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div>
            <p className="text-sm text-gray-500">Total Paid</p>
            <p className="text-2xl font-bold text-green-600">
              ${booking.total_price}
            </p>
          </div>

          {upcoming && !isCancelled && (
            <Link
              href={`/my-bookings/${booking.id}`}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              View Details
            </Link>
          )}
        </div>

        {/* Cancellation Notice */}
        {isCancelled && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded">
            <p className="text-sm text-red-800">
              ❌ This appointment was cancelled
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
