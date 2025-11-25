'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function AdminError({ error, reset }) {
  useEffect(() => {
    console.error('Admin Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="text-6xl mb-4">🔧</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Admin Panel Error
        </h2>
        <p className="text-gray-600 mb-6">
          {error.message || 'Unable to load admin panel'}
        </p>
        <div className="flex gap-4">
          <button
            onClick={reset}
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            Retry
          </button>
          <Link
            href="/dashboard"
            className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium text-center"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
