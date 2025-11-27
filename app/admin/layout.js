import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import ThemeToggle from '@/_components/ThemeToggle';
import AdminNavLinks from '@/_components/AdminNavLinks';
import Image from 'next/image';

export default async function AdminLayout({ children }) {
  const session = await auth();

  if (!session) {
    redirect('/auth/signin');
  }

  if (session.user.role !== 'admin') {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-4 md:space-x-8">
              <Link
                href="/admin"
                className="text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-400"
              >
                <span className="hidden sm:block">LockIn</span>{' '}
                <span className="inline-block sm:hidden">
                  <Image
                    src="image/lockin.png"
                    alt="Lockin logo"
                    width={32}
                    height={32}
                  />
                </span>{' '}
                Admin
              </Link>
              {/* NavLinks */}
              <AdminNavLinks />
              {/* <div className="hidden md:flex space-x-4">
                <Link
                  href="/admin"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Dashboard
                </Link>
                <Link
                  href="/admin/staff"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Staff
                </Link>
                <Link
                  href="/admin/services"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Services
                </Link>
                <Link
                  href="/admin/bookings"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Bookings
                </Link>
              </div> */}
            </div>
            <div className="flex items-center space-x-2 md:space-x-4">
              <ThemeToggle />
              <img
                src={session.user.image}
                alt={session.user.name}
                className="w-8 h-8 rounded-full hidden sm:block"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300 hidden sm:block">
                {session.user.name}
              </span>
              <Link
                href="/dashboard"
                className="px-3 py-2 text-xs md:text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                Exit Admin
              </Link>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden pb-3 space-y-1">
            <Link
              href="/admin"
              className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Dashboard
            </Link>
            <Link
              href="/admin/staff"
              className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Staff
            </Link>
            <Link
              href="/admin/services"
              className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Services
            </Link>
            <Link
              href="/admin/bookings"
              className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Bookings
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
