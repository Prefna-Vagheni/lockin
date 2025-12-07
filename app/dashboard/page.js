import { auth } from '../auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import DashboardHeader from '../_components/DashboardHeader';

export default async function Dashboard() {
  const session = await auth();

  if (!session) {
    redirect('/auth/signin');
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardHeader user={session.user} />

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6 border dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">
              Welcome back!
            </h2>
            <div className="space-y-2">
              <p className="dark:text-gray-300">
                <strong>Email:</strong> {session.user.email}
              </p>
              <p className="dark:text-gray-300">
                <strong>Name:</strong> {session.user.name}
              </p>
              <p className="dark:text-gray-300">
                <strong>Role:</strong>
                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-sm ml-2">
                  {session.user.role}
                </span>
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {session.user.role === 'admin' ? (
              <>
                <Link
                  href="/admin"
                  className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition border dark:border-gray-700"
                >
                  <div className="text-4xl mb-3">⚙️</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Admin Panel
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Manage staff, services, and bookings
                  </p>
                </Link>
                <Link
                  href="/admin/bookings"
                  className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition border dark:border-gray-700"
                >
                  <div className="text-4xl mb-3">📅</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    All Bookings
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    View and manage all appointments
                  </p>
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/booking"
                  className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition border dark:border-gray-700"
                >
                  <div className="text-4xl mb-3">✂️</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Book Appointment
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Schedule your next salon visit
                  </p>
                </Link>
                <Link
                  href="/my-bookings"
                  className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition border dark:border-gray-700"
                >
                  <div className="text-4xl mb-3">📅</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    My Appointments
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    View your upcoming and past bookings
                  </p>
                </Link>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
