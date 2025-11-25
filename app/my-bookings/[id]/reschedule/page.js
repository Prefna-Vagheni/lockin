import { auth } from '@/auth';
import { redirect, notFound } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase';
import RescheduleForm from '@/_components/RescheduleForm';

export default async function ReschedulePage({ params }) {
  const session = await auth();

  if (!session) {
    redirect('/auth/signin');
  }

  const { id } = await params;

  // Fetch booking
  const { data: booking, error } = await supabaseAdmin
    .from('bookings')
    .select(
      `
      *,
      staff:staff_id (
        id,
        photo_url,
        users:user_id (name)
      ),
      service:service_id (
        name,
        duration_minutes
      )
    `
    )
    .eq('id', id)
    .eq('client_id', session.user.id)
    .single();

  if (error || !booking) {
    notFound();
  }

  // Check if booking can be rescheduled
  const startTime = new Date(booking.start_time);
  const isPast = startTime < new Date();
  const isCancelled = booking.status === 'cancelled';

  if (isPast || isCancelled) {
    redirect(`/my-bookings/${id}`);
  }

  // Fetch existing bookings for availability checking
  const { data: existingBookings } = await supabaseAdmin
    .from('bookings')
    .select('start_time, end_time')
    .eq('staff_id', booking.staff_id)
    .neq('id', id) // Exclude current booking
    .gte('start_time', new Date().toISOString())
    .order('start_time', { ascending: true });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Reschedule Appointment
          </h1>
          <p className="text-gray-600">
            Choose a new date and time for your appointment
          </p>
        </div>

        {/* Current Booking Info */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Current Appointment
          </h2>
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
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
            <div>
              <h3 className="font-semibold text-gray-900">
                {booking.service?.name}
              </h3>
              <p className="text-gray-600">with {booking.staff?.users?.name}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Current Date</p>
              <p className="font-medium">
                {new Date(booking.start_time).toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                })}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Current Time</p>
              <p className="font-medium">
                {new Date(booking.start_time).toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true,
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Reschedule Form */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <RescheduleForm
            bookingId={booking.id}
            staffId={booking.staff_id}
            serviceDuration={booking.service.duration_minutes}
            existingBookings={existingBookings || []}
          />
        </div>
      </div>
    </div>
  );
}
