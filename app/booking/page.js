import ThemeToggle from '@/_components/ThemeToggle';
import { auth } from '@/auth';
import { supabaseAdmin } from '@/lib/supabase';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function BookingPage() {
  const session = await auth();

  if (!session) {
    redirect('/auth/signin?callbackUrl=/bookings');
  }

  // Fetch active staff
  const { data: staff } = await supabaseAdmin
    .from('staff')
    .select(
      `
      *,
      users:user_id (
        name,
        email
      )
    `
    )
    .eq('is_active', true)
    .order('created_at', { ascending: true });

  // Fetch active services
  const { data: services } = await supabaseAdmin
    .from('services')
    .select('*')
    .eq('is_active', true)
    .order('name', { ascending: true });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <nav className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link
                href="/"
                className="text-2xl font-bold text-blue-600 dark:text-blue-400"
              >
                LockIn
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <span className="text-gray-700 dark:text-gray-300">
                {session.user.name}
              </span>
              <Link
                href="/dashboard"
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                My Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-200 mb-4">
            Book Your Appointment
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Choose your favorite hairdresser and service
          </p>
        </div>

        {/* Check if we have staff and services */}
        {!staff || staff.length === 0 ? (
          <div className="bg-yellow-50 dark:bg-yellow-800 border border-yellow-200 rounded-lg p-8 text-center dark:border-yellow-700">
            <p className="text-yellow-800 dark:text-yellow-200 text-lg">
              We&apos;re not accepting bookings at the moment. Please check back
              later!
            </p>
          </div>
        ) : !services || services.length === 0 ? (
          <div className="bg-yellow-50 dark:bg-yellow-800 border border-yellow-200 dark:border-yellow-700 rounded-lg p-8 text-center">
            <p className="text-yellow-800 dark:text-yellow-200 text-lg">
              No services available at the moment. Please check back later!
            </p>
          </div>
        ) : (
          <>
            {/* Staff Selection */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                <span className="bg-gray-500 p-0.5 rounded-lg dark:bg-gray-600">
                  Step 1
                </span>
                : Choose Your Hairdresser
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {staff.map((member) => (
                  <StaffSelectionCard
                    key={member.id}
                    staff={member}
                    services={services}
                  />
                ))}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

function StaffSelectionCard({ staff, services }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
      {/* Photo */}
      <div className="aspect-square bg-gray-200 dark:bg-gray-700 relative">
        {staff.photo_url ? (
          <div className="relative aspect-square w-full">
            <Image
              src={staff.photo_url}
              alt={staff.users?.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading="eager"
              className="object-cover "
            />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-600 text-6xl">
            👤
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-2">
          {staff.users?.name}
        </h3>

        {staff.bio && (
          <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
            {staff.bio}
          </p>
        )}

        {staff.specialties && staff.specialties.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Specialties:
            </p>
            <div className="flex flex-wrap gap-2">
              {staff.specialties.map((specialty, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-blue-100 text-blue-800 dark:text-blue-300 dark:bg-blue-800 text-sm rounded-full"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>
        )}

        <Link
          href={`/booking/${staff.id}`}
          className="block text-center mt-6 px-6 py-3 bg-blue-600 dark:bg-blue-400 dark:hover:bg-blue-500 text-white dark:text-gray-800 rounded-lg hover:bg-blue-700 font-semibold transition"
        >
          Book with {staff.users?.name?.split(' ')[0]}
        </Link>
      </div>
    </div>
  );
}
