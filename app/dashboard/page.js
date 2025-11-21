import { auth, signOut } from '@/auth';
import { redirect } from 'next/navigation';

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
              <span className="text-gray-700">
                {session.user.name} ({session.user.role})
              </span>
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
            <h2 className="text-2xl font-bold mb-4">
              Welcome to LockIn Dashboard
            </h2>
            <div className="space-y-2">
              <p>
                <strong>Email:</strong> {session.user.email}
              </p>
              <p>
                <strong>Name:</strong> {session.user.name}
              </p>
              <p>
                <strong>Role:</strong> {session.user.role}
              </p>
            </div>

            <div className="mt-6 p-4 bg-green-50 rounded">
              <h3 className="font-semibold text-green-900">
                ✅ Google Auth Working!
              </h3>
              <p className="text-green-700 mt-2">
                Much cleaner! Now let&apos;s build the admin panel.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
