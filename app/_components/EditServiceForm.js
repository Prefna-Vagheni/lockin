'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateService, deleteService } from '../actions/services';
import toast from 'react-hot-toast';

export default function EditServiceForm({ service }) {
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
      const result = await updateService(service.id, formData);

      if (result.success) {
        router.push('/admin/services');
        router.refresh();
      } else {
        setError(result.error || 'Failed to update service');
        setLoading(false);
      }
    } catch (err) {
      console.error('Error:', err);
      setError('An unexpected error occurred');
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (
      !confirm(
        'Are you sure you want to delete this service? This action cannot be undone.'
      )
    ) {
      return;
    }

    setDeleting(true);
    setError('');

    try {
      const result = await deleteService(service.id);

      if (result.success) {
        toast.success('Service Successfuly updated');
        router.push('/admin/services');
        router.refresh();
      } else {
        toast.error('Could now update service');
        setError(result.error || 'Failed to delete service');
        setDeleting(false);
      }
    } catch (err) {
      toast.error('Error' + err.message);
      console.error('Error:', err);
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
        {/* Service Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Service Name *
          </label>
          <input
            type="text"
            name="name"
            required
            defaultValue={service.name}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            name="description"
            rows={3}
            defaultValue={service.description || ''}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Duration (minutes) *
          </label>
          <input
            type="number"
            name="durationMinutes"
            required
            min="15"
            step="15"
            defaultValue={service.duration_minutes}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price ($) *
          </label>
          <input
            type="number"
            name="price"
            step="0.01"
            required
            min="0"
            defaultValue={service.price}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="isActive"
              value="true"
              defaultChecked={service.is_active}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">
              Active (available for booking)
            </span>
          </label>
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
          Deleting this service will remove it permanently. Existing bookings
          with this service will be affected.
        </p>
        <button
          onClick={handleDelete}
          disabled={loading || deleting}
          className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {deleting ? 'Deleting...' : 'Delete Service'}
        </button>
      </div>
    </div>
  );
}
