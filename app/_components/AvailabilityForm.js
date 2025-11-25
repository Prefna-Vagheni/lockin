'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { saveStaffAvailability } from '@/actions/availabity';
// import { saveStaffAvailability } from '@/actions/availability';

const DAYS = [
  { value: 0, label: 'Sunday' },
  { value: 1, label: 'Monday' },
  { value: 2, label: 'Tuesday' },
  { value: 3, label: 'Wednesday' },
  { value: 4, label: 'Thursday' },
  { value: 5, label: 'Friday' },
  { value: 6, label: 'Saturday' },
];

export default function AvailabilityForm({ staffId, existingAvailability }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Initialize availability state from existing data
  const initialState = DAYS.reduce((acc, day) => {
    const existing = existingAvailability.find(
      (a) => a.day_of_week === day.value
    );
    acc[day.value] = {
      enabled: !!existing,
      start: existing?.start_time || '09:00',
      end: existing?.end_time || '18:00',
    };
    return acc;
  }, {});

  const [availability, setAvailability] = useState(initialState);

  const handleToggleDay = (dayValue) => {
    setAvailability((prev) => ({
      ...prev,
      [dayValue]: {
        ...prev[dayValue],
        enabled: !prev[dayValue].enabled,
      },
    }));
  };

  const handleTimeChange = (dayValue, field, value) => {
    setAvailability((prev) => ({
      ...prev,
      [dayValue]: {
        ...prev[dayValue],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await saveStaffAvailability(staffId, availability);

      if (result.success) {
        alert('Working hours saved successfully!');
        router.push('/admin/staff');
        router.refresh();
      } else {
        setError(result.error || 'Failed to save availability');
        setLoading(false);
      }
    } catch (err) {
      console.error('Error:', err);
      setError('An unexpected error occurred');
      setLoading(false);
    }
  };

  const handleSetDefault = () => {
    const defaultHours = {
      enabled: true,
      start: '09:00',
      end: '18:00',
    };

    setAvailability({
      0: { enabled: false, start: '09:00', end: '18:00' }, // Sunday off
      1: defaultHours,
      2: defaultHours,
      3: defaultHours,
      4: defaultHours,
      5: defaultHours,
      6: { enabled: false, start: '09:00', end: '18:00' }, // Saturday off
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded">{error}</div>
      )}

      {/* Quick Actions */}
      <div className="flex justify-between items-center pb-4 border-b">
        <h3 className="text-lg font-semibold text-gray-900">Weekly Schedule</h3>
        <button
          type="button"
          onClick={handleSetDefault}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-sm font-medium"
        >
          Set Default Hours (Mon-Fri, 9am-6pm)
        </button>
      </div>

      {/* Days */}
      <div className="space-y-4">
        {DAYS.map((day) => (
          <div
            key={day.value}
            className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
          >
            {/* Day Toggle */}
            <div className="flex items-center min-w-[120px]">
              <input
                type="checkbox"
                id={`day-${day.value}`}
                checked={availability[day.value].enabled}
                onChange={() => handleToggleDay(day.value)}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor={`day-${day.value}`}
                className="ml-3 font-medium text-gray-900 cursor-pointer"
              >
                {day.label}
              </label>
            </div>

            {/* Time Inputs */}
            {availability[day.value].enabled ? (
              <div className="flex items-center space-x-4 flex-1">
                <div className="flex-1">
                  <label className="block text-xs text-gray-500 mb-1">
                    Start Time
                  </label>
                  <input
                    type="time"
                    value={availability[day.value].start}
                    onChange={(e) =>
                      handleTimeChange(day.value, 'start', e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div className="text-gray-400 pt-5">→</div>
                <div className="flex-1">
                  <label className="block text-xs text-gray-500 mb-1">
                    End Time
                  </label>
                  <input
                    type="time"
                    value={availability[day.value].end}
                    onChange={(e) =>
                      handleTimeChange(day.value, 'end', e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            ) : (
              <div className="flex-1 text-gray-400 italic">Not available</div>
            )}
          </div>
        ))}
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>💡 Tip:</strong> Set your regular working hours here. Bookings
          will only be available during these times. You can always update this
          later.
        </p>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Saving...' : 'Save Working Hours'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          disabled={loading}
          className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
