import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase';
import Link from 'next/link';
import BookingCard from '@/_components/BookingCard';

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
