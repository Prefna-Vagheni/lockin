'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createStaffAction } from '@/admin/staff/new/actions';

export default function AddStaffForm() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleFormAction(formData) {
    setLoading(true);
    setError('');

    try {
      const result = await createStaffAction(formData);

      if (result?.success) {
        router.push('/admin/staff');
        router.refresh();
      }
    } catch (err) {
      setError(err.message || 'Failed to create staff member');
      setLoading(false);
    }
  }

  return (
    <form action={handleFormAction} className="space-y-6">
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded">{error}</div>
      )}

      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Full Name *
        </label>
        <input
          type="text"
          name="name"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email *
        </label>
        <input
          type="email"
          name="email"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Bio */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Bio
        </label>
        <textarea
          name="bio"
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Specialties */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Specialties (comma-separated)
        </label>
        <input
          type="text"
          name="specialties"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Hourly Rate */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Hourly Rate ($) *
        </label>
        <input
          type="number"
          name="hourlyRate"
          step="0.01"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Photo Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Profile Photo
        </label>
        <input
          type="file"
          name="photo"
          accept="image/*"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
        <p className="text-sm text-gray-500 mt-1">JPG, PNG or GIF (max 5MB)</p>
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Create Staff Member'}
        </button>

        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
