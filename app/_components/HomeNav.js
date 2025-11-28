import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

function HomeNav() {
  return (
    <nav className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex justify-between items-center">
        <div className="text-white text-3xl font-bold">LockIn</div>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Link
            href="/auth/signin"
            className="text-white hover:text-gray-200 font-medium"
          >
            Sign In
          </Link>
          <Link
            href="/booking"
            className="px-3 sm:px-6 py-2 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 font-semibold transition"
          >
            Book Now
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default HomeNav;
