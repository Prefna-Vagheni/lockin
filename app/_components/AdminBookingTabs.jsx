'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AdminBookingsTabs({ upcoming, past, cancelled }) {
  const [tab, setTab] = useState('upcoming');

  const tabs = [
    { key: 'upcoming', label: 'Upcoming', count: upcoming.length },
    { key: 'past', label: 'Past', count: past.length },
    { key: 'cancelled', label: 'Cancelled', count: cancelled.length },
  ];

  const selectedList =
    tab === 'upcoming' ? upcoming : tab === 'past' ? past : cancelled;

  return (
    <div>
      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`
                  py-4 px-1 border-b-2 font-medium text-sm
                  ${
                    tab === t.key
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                {t.label} ({t.count})
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Booking List */}
      {selectedList.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <div className="text-6xl mb-4">📅</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No {tab} bookings
          </h3>
          <p className="text-gray-500">Nothing here yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {selectedList.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </div>
      )}
    </div>
  );
}

function BookingCard({ booking }) {
  const startTime = new Date(booking.start_time);
  const isToday = startTime.toDateString() === new Date().toDateString();

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-6">
      {/* Same as your existing BookingCard */}
      ...
    </div>
  );
}
