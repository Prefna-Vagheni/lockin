import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-500 to-purple-600">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">LockIn</h1>
        <p className="text-xl text-white mb-8">
          Professional Salon Booking System
        </p>
        <div className="space-x-4">
          <Link
            href="/api/auth/signin"
            className="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition"
          >
            Sign In
          </Link>
          <Link
            href="/booking"
            className="inline-block px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition"
          >
            Book Appointment
          </Link>
        </div>
      </div>
    </div>
  );
}
