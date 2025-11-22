import { auth, signOut } from '@/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';

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
              <form
                action={async () => {
                  'use server';
                  await signOut({ redirectTo: '/' });
                }}
              >
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Sign Out
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-lg shadow p-6">
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

            {session.user.role === 'admin' ? (
              <div className="mt-6 p-4 bg-blue-50 rounded">
                <h3 className="font-semibold text-blue-900">🎉 Admin Access</h3>
                <p className="text-blue-700 mt-2">
                  You have admin privileges! Click the &quot;Admin Panel&quot;
                  button above to manage staff, services, and bookings.
                </p>
              </div>
            ) : (
              <div className="mt-6 p-4 bg-green-50 rounded">
                <h3 className="font-semibold text-green-900">
                  ✅ Ready to Book!
                </h3>
                <p className="text-green-700 mt-2">
                  Browse our talented hairdressers and book your next
                  appointment.
                </p>
                <Link
                  href="/booking"
                  className="mt-4 inline-block px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Book Appointment
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
