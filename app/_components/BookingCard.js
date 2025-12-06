import Link from 'next/link';

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
            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 shrink-0">
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
export default BookingCard;
