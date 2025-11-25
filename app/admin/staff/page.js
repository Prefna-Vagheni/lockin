import { supabaseAdmin } from '@/lib/supabase';
import Link from 'next/link';

export default async function StaffPage() {
  // Fetch all staff with their user info
  const { data: staff, error } = await supabaseAdmin
    .from('staff')
    .select(
      `
      *,
      users:user_id (
        name,
        email
      )
    `
    )
    .order('created_at', { ascending: false });

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Staff Management</h1>
        <Link
          href="/admin/staff/new"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
        >
          ➕ Add New Staff
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded mb-4">
          Error loading staff: {error.message}
        </div>
      )}

      {!staff || staff.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <div className="text-6xl mb-4">👥</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No staff members yet
          </h3>
          <p className="text-gray-500 mb-6">
            Add your first hairdresser to get started!
          </p>
          <Link
            href="/admin/staff/new"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            Add First Staff Member
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {staff.map((member) => (
            <StaffCard key={member.id} staff={member} />
          ))}
        </div>
      )}
    </div>
  );
}

function StaffCard({ staff }) {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
      {/* Photo */}
      <div className="aspect-square bg-gray-200 relative">
        {staff.photo_url ? (
          <img
            src={staff.photo_url}
            alt={staff.users?.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-6xl">
            👤
          </div>
        )}
        {!staff.is_active && (
          <div className="absolute top-2 right-2 px-2 py-1 bg-red-500 text-white text-xs rounded">
            Inactive
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-900 mb-1">
          {staff.users?.name || 'Unknown'}
        </h3>
        <p className="text-sm text-gray-500 mb-3">{staff.users?.email}</p>

        {staff.bio && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{staff.bio}</p>
        )}

        {staff.specialties && staff.specialties.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {staff.specialties.map((specialty, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
              >
                {specialty}
              </span>
            ))}
          </div>
        )}

        {staff.hourly_rate && (
          <p className="text-lg font-bold text-green-600 mb-4">
            ${staff.hourly_rate}/hour
          </p>
        )}

        {/* Action Buttons */}
        <div className="space-y-2">
          <Link
            href={`/admin/staff/${staff.id}`}
            className="block text-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium"
          >
            Edit Details
          </Link>
          <Link
            href={`/admin/staff/${staff.id}/availability`}
            className="block text-center px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 font-medium"
          >
            ⏰ Set Working Hours
          </Link>
        </div>
      </div>
    </div>
  );
}
