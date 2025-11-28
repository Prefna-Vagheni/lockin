import Link from 'next/link';

function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">LockIn</h3>
            <p className="text-gray-400">Your trusted salon booking platform</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link
                href="/booking"
                className="block text-gray-400 hover:text-white"
              >
                Book Appointment
              </Link>
              <Link
                href="/auth/signin"
                className="block text-gray-400 hover:text-white"
              >
                Sign In
              </Link>
              <Link
                href="/my-bookings"
                className="block text-gray-400 hover:text-white"
              >
                My Bookings
              </Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <p className="text-gray-400">
              Email: support@lockin.com
              <br />
              Phone: (555) 123-4567
            </p>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} LockIn. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
