import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import SignOutButton from '@/_components/SignOutButton';

export default async function Dashboard() {
  const session = await auth();

  if (!session) {
    redirect('/auth/signin');
  }

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
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">Welcome back!</h2>
            <div className="space-y-2">
              <p>
                <strong>Email:</strong> {session.user.email}
              </p>
              <p>
                <strong>Name:</strong> {session.user.name}
              </p>
              <p>
                <strong>Role:</strong>{' '}
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
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
                  className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition"
                >
                  <div className="text-4xl mb-3">⚙️</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Admin Panel
                  </h3>
                  <p className="text-gray-600">
                    Manage staff, services, and bookings
                  </p>
                </Link>
                <Link
                  href="/admin/bookings"
                  className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition"
                >
                  <div className="text-4xl mb-3">📅</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    All Bookings
                  </h3>
                  <p className="text-gray-600">
                    View and manage all appointments
                  </p>
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/booking"
                  className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition"
                >
                  <div className="text-4xl mb-3">✂️</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Book Appointment
                  </h3>
                  <p className="text-gray-600">
                    Schedule your next salon visit
                  </p>
                </Link>
                <Link
                  href="/my-bookings"
                  className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition"
                >
                  <div className="text-4xl mb-3">📅</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    My Appointments
                  </h3>
                  <p className="text-gray-600">
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
