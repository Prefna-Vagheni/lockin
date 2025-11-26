'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateStaff, deleteStaff } from '@/actions/staff';
import toast from 'react-hot-toast';
// import { updateStaff, deleteStaff } from '@/app/actions/staff';

export default function EditStaffForm({ staff }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formData = new FormData(e.target);
      formData.append('userId', staff.users.id);
      formData.append('currentPhotoUrl', staff.photo_url || '');

      const result = await updateStaff(staff.id, formData);

      if (result.success) {
        toast.success('Staff successfully updated');
        router.push('/admin/staff');
        router.refresh();
      } else {
        toast.error('Could not update Staff member');
        setError(result.error || 'Failed to update staff member');
        setLoading(false);
      }
    } catch (err) {
      console.error('Error:', err);
      toast.error('An unexpected error occurred');
      setError('An unexpected error occurred');
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (
      !confirm(
        'Are you sure you want to delete this staff member? This action cannot be undone.'
      )
    ) {
      return;
    }

    setDeleting(true);
    setError('');

    try {
      const result = await deleteStaff(staff.id);

      if (result.success) {
        toast.success('Staff successfully deleted');
        router.push('/admin/staff');
        router.refresh();
      } else {
        toast.error('Failed to delete staff member');
        setError(result.error || 'Failed to delete staff member');
        setDeleting(false);
      }
    } catch (err) {
      console.error('Error:', err);
      toast.error('Something went wrong');
      setError('An unexpected error occurred');
      setDeleting(false);
    }
  };

  return (
    <div>
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded mb-6">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Current Photo Preview */}
        {staff.photo_url && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Photo
            </label>
            <img
              src={staff.photo_url}
              alt={staff.users.name}
              className="w-32 h-32 object-cover rounded-lg"
            />
          </div>
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
            defaultValue={staff.users.name}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Email (Read-only) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            defaultValue={staff.users.email}
            disabled
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
          />
          <p className="text-sm text-gray-500 mt-1">Email cannot be changed</p>
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bio
          </label>
          <textarea
            name="bio"
            rows={4}
            defaultValue={staff.bio || ''}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            defaultValue={staff.specialties?.join(', ') || ''}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            defaultValue={staff.hourly_rate}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="isActive"
              value="true"
              defaultChecked={staff.is_active}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">
              Active (available for bookings)
            </span>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload New Photo (optional)
          </label>
          <input
            type="file"
            name="photo"
            accept="image/*"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <p className="text-sm text-gray-500 mt-1">
            Leave empty to keep current photo
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading || deleting}
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            disabled={loading || deleting}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </form>

      {/* Delete Section */}
      <div className="mt-8 pt-8 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-red-600 mb-2">Danger Zone</h3>
        <p className="text-sm text-gray-600 mb-4">
          Deleting this staff member will remove all their information and
          scheduled bookings. This action cannot be undone.
        </p>
        <button
          onClick={handleDelete}
          disabled={loading || deleting}
          className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {deleting ? 'Deleting...' : 'Delete Staff Member'}
        </button>
      </div>
    </div>
  );
}
