import { supabaseAdmin } from '../../lib/supabase';
import Link from 'next/link';

export default async function AdminBookingsPage() {
  // Fetch all bookings with related data
  const { data: bookings, error } = await supabaseAdmin
    .from('bookings')
    .select(
      `
      *,
      client:client_id (
        name,
        email
      ),
      staff:staff_id (
        id,
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
    .order('start_time', { ascending: true });

  // Group bookings by status
  const upcoming =
    bookings?.filter((b) => {
      const isPast = new Date(b.start_time) < new Date();
      return !isPast && b.status === 'confirmed';
    }) || [];

  const past =
    bookings?.filter((b) => {
      const isPast = new Date(b.start_time) < new Date();
      return isPast || b.status === 'completed';
    }) || [];

  const cancelled = bookings?.filter((b) => b.status === 'cancelled') || [];

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-200">
          All Bookings
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Manage all salon appointments
        </p>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-gray-600 text-red-600 dark:text-red-50 p-4 rounded mb-4">
          Error loading bookings: {error.message}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Upcoming"
          value={upcoming.length}
          color="blue"
          icon="📅"
        />
        <StatCard
          title="Completed"
          value={past.length}
          color="green"
          icon="✅"
        />
        <StatCard
          title="Cancelled"
          value={cancelled.length}
          color="red"
          icon="❌"
        />
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <TabButton active label="Upcoming" count={upcoming.length} />
            <TabButton label="Past" count={past.length} />
            <TabButton label="Cancelled" count={cancelled.length} />
          </nav>
        </div>
      </div>

      {/* Bookings List - Upcoming (default) */}
      {upcoming.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <div className="text-6xl mb-4">📅</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No upcoming bookings
          </h3>
          <p className="text-gray-500">New bookings will appear here</p>
        </div>
      ) : (
        <div className="space-y-4">
          {upcoming.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </div>
      )}
    </div>
  );
}

function StatCard({ title, value, color, icon }) {
  const colors = {
    blue: 'bg-blue-50 text-blue-600 dark:bg-blue-600 dark:text-blue-50',
    green: 'bg-green-50 text-green-600 dark:bg-green-600 dark:text-green-50',
    red: 'bg-red-50 text-red-600 dark:bg-red-600 dark:text-red-50',
  };

  return (
    <div className={`${colors[color]} rounded-lg p-6`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium opacity-80">{title}</p>
          <p className="text-3xl font-bold mt-1">{value}</p>
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
    </div>
  );
}

function TabButton({ label, count, active = false }) {
  return (
    <button
      className={`
        py-4 px-1 border-b-2 font-medium text-sm
        ${
          active
            ? 'border-blue-500 text-blue-600'
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        }
      `}
    >
      {label} ({count})
    </button>
  );
}

function BookingCard({ booking }) {
  const startTime = new Date(booking.start_time);
  const isToday = startTime.toDateString() === new Date().toDateString();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {/* Header */}
          <div className="flex items-center space-x-3 mb-3">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-200">
              {booking.service?.name}
            </h3>
            {isToday && (
              <span className="px-2 py-1 bg-orange-100 dark:bg-orange-800 text-orange-800 dark:text-orange-100 text-xs font-semibold rounded">
                TODAY
              </span>
            )}
            <span
              className={`px-2 py-1 text-xs font-semibold rounded ${
                booking.status === 'confirmed'
                  ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                  : booking.status === 'cancelled'
                  ? 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100'
              }`}
            >
              {booking.status.toUpperCase()}
            </span>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Client</p>
              <p className="font-medium text-gray-900 dark:text-gray-200">
                {booking.client?.name}
              </p>
              <p className="text-gray-500 text-xs">{booking.client?.email}</p>
            </div>
            <div>
              <p className="text-gray-500">Hairdresser</p>
              <p className="font-medium text-gray-900 dark:text-gray-200">
                {booking.staff?.users?.name}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Date & Time</p>
              <p className="font-medium text-gray-900 dark:text-gray-200">
                {startTime.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                {startTime.toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true,
                })}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Price</p>
              <p className="font-bold text-green-600 dark:text-green-500 text-lg">
                ${booking.total_price}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="ml-4">
          <Link
            href={`/admin/bookings/${booking.id}`}
            className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white dark:text-gray-900 rounded hover:bg-blue-700 dark:hover:bg-blue-600 text-sm font-medium"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
