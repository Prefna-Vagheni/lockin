import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import SignOutButton from '@/_components/SignOutButton';
import { supabaseAdmin } from '@/lib/supabase';

export default async function Dashboard() {
  const session = await auth();

  if (!session) {
    redirect('/auth/signin');
  }

  // Fetch user's bookings
  const { data: bookings } = await supabaseAdmin
    .from('bookings')
    .select(
      `
      *,
      staff:staff_id (
        photo_url,
        users:user_id (
          name
        )
      ),
      service:service_id (
        name,
        duration_minutes
      )
    `
    )
    .eq('client_id', session.user.id)
    .order('start_time', { ascending: true });

  // Separate upcoming and past bookings
  const now = new Date();
  const upcomingBookings =
    bookings?.filter((b) => new Date(b.start_time) >= now) || [];
  const pastBookings =
    bookings?.filter((b) => new Date(b.start_time) < now) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">LockIn</h1>
            </div>
            <div className="flex items-center space-x-4">
              <img
                src={session.user.image}
                alt={session.user.name}
                className="w-8 h-8 rounded-full"
              />
              <span className="text-gray-700">{session.user.name}</span>
              {session.user.role === 'admin' && (
                <Link
                  href="/admin"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Admin Panel
                </Link>
              )}
              <SignOutButton />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Welcome Card */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">
              Welcome back, {session.user.name?.split(' ')[0]}!
            </h2>
            <div className="space-y-2">
              <p>
                <strong>Email:</strong> {session.user.email}
              </p>
              <p>
                <strong>Role:</strong>{' '}
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                  {session.user.role}
                </span>
              </p>
            </div>

            {session.user.role !== 'admin' && (
              <div className="mt-6">
                <Link
                  href="/booking"
                  className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
                >
                  📅 Book New Appointment
                </Link>
              </div>
            )}
          </div>

          {/* Upcoming Bookings */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Upcoming Appointments ({upcomingBookings.length})
            </h3>
            {upcomingBookings.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <p className="text-gray-500 mb-4">No upcoming appointments</p>
                <Link
                  href="/booking"
                  className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Book Your First Appointment
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {upcomingBookings.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} />
                ))}
              </div>
            )}
          </div>

          {/* Past Bookings */}
          {pastBookings.length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Past Appointments ({pastBookings.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pastBookings.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} isPast />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function BookingCard({ booking, isPast = false }) {
  const startTime = new Date(booking.start_time);

  return (
    <div
      className={`bg-white rounded-lg shadow p-6 ${isPast ? 'opacity-60' : ''}`}
    >
      <div className="flex items-start space-x-4">
        <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
          {booking.staff?.photo_url ? (
            <img
              src={booking.staff.photo_url}
              alt={booking.staff.users?.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-2xl">
              👤
            </div>
          )}
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900">
            {booking.service?.name}
          </h4>
          <p className="text-sm text-gray-600">
            with {booking.staff?.users?.name}
          </p>
          <div className="mt-2 space-y-1 text-sm text-gray-500">
            <p>
              📅{' '}
              {startTime.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
            <p>
              🕐{' '}
              {startTime.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
              })}{' '}
              ({booking.service?.duration_minutes} mins)
            </p>
            <p className="font-semibold text-green-600">
              💰 ${booking.total_price}
            </p>
          </div>
          <div className="mt-3">
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                booking.status === 'confirmed'
                  ? 'bg-green-100 text-green-800'
                  : booking.status === 'cancelled'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
