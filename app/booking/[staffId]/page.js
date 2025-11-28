import { auth } from '@/auth';
import { supabaseAdmin } from '@/lib/supabase';
import { notFound, redirect } from 'next/navigation';
import BookingForm from '@/_components/BookingForm';
import Link from 'next/link';

export default async function StaffBookingPage({ params }) {
  const session = await auth();

  if (!session) {
    redirect('/auth/signin?callbackUrl=/bookings');
  }

  const { staffId } = await params;

  // Fetch staff details
  const { data: staff, error: staffError } = await supabaseAdmin
    .from('staff')
    .select(
      `
      *,
      users:user_id (
        id,
        name,
        email
      )
    `
    )
    .eq('id', staffId)
    .eq('is_active', true)
    .single();

  if (staffError || !staff) {
    notFound();
  }

  // Fetch active services
  const { data: services } = await supabaseAdmin
    .from('services')
    .select('*')
    .eq('is_active', true)
    .order('name', { ascending: true });

  // Fetch existing bookings for this staff (for availability checking)
  const { data: existingBookings } = await supabaseAdmin
    .from('bookings')
    .select('start_time, end_time')
    .eq('staff_id', staffId)
    .gte('start_time', new Date().toISOString())
    .order('start_time', { ascending: true });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}

        <Link
          href="/booking"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-600  mb-6"
        >
          ← Back to all staff
        </Link>

        {/* Staff Info Card */}
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-start space-x-6">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-600 shrink-0">
              {staff.photo_url ? (
                <img
                  src={staff.photo_url}
                  alt={staff.users?.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-600 text-4xl">
                  👤 {/* HERE I WILL ADD A REAL AVATAR */}
                </div>
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-200 mb-2">
                Book with {staff.users?.name}
              </h1>
              {staff.bio && (
                <p className="text-gray-600 dark:text-gray-300 mb-3">
                  {staff.bio}
                </p>
              )}
              {staff.specialties && staff.specialties.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {staff.specialties.map((specialty, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 text-sm rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Select Service & Time
          </h2>
          <BookingForm
            staff={staff}
            services={services || []}
            existingBookings={existingBookings || []}
            userId={session.user.id}
          />
        </div>
      </div>
    </div>
  );
}
