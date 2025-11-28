import Link from 'next/link';
import ThemeToggle from '@/_components/ThemeToggle';
import HomeNav from './_components/HomeNav';
import FeatureCard from './_components/FeatureCard';

export default function Home() {
  return (
    <div className="min-h-screen dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative bg-linear-to-br from-blue-600 via-purple-600 to-pink-500 dark:from-blue-900 dark:via-purple-900 dark:to-pink-900 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10 dark:opacity-30"></div>

        <HomeNav />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Book Your Perfect
              <br />
              <span className="text-yellow-300 dark:text-yellow-400">
                Salon Experience
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto">
              Choose from our talented hairdressers, pick your service, and
              secure your appointment with instant payment
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                href="/booking"
                className="px-8 py-4 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 font-bold text-lg shadow-lg transform hover:scale-105 transition"
              >
                Book Appointment →
              </Link>
              <Link
                href="/auth/signin"
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white hover:text-blue-600 dark:hover:bg-gray-800 dark:hover:text-blue-400 font-bold text-lg transition"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-20 md:h-32">
            <path
              fill="currentColor"
              className="text-gray-50 dark:text-gray-900"
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            ></path>
          </svg>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 dark:bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose LockIn?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Making salon bookings easy, secure, and hassle-free
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-linear-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Transform Your Look?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Book your appointment now and experience the difference
          </p>
          <Link
            href="/booking"
            className="inline-block px-10 py-4 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 font-bold text-lg shadow-xl transform hover:scale-105 transition"
          >
            Book Your Appointment →
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">LockIn</h3>
              <p className="text-gray-400">
                Your trusted salon booking platform
              </p>
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
            <p>
              &copy; {new Date().getFullYear()} LockIn. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// function FeatureCard({ icon='', title, description, color }) {
//   return (
//     <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition border dark:border-gray-700">
//       <div className={`w-14 h-14 bg-${color}-100 rounded-full flex items-center justify-center mb-6`}><{icon} className="w-7 h-7 text-rose-600" /></div>
//       <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
//         {title}
//       </h3>
//       <p className="text-gray-600 dark:text-gray-400">{description}</p>
//     </div>
//   );
// }
