import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default async function AdminDashboard() {
  // Fetch stats
  const { data: staff } = await supabase
    .from('staff')
    .select('*', { count: 'exact' });

  const { data: services } = await supabase
    .from('services')
    .select('*', { count: 'exact' });

  const { data: bookings } = await supabase
    .from('bookings')
    .select('*', { count: 'exact' });

  const { data: users } = await supabase
    .from('users')
    .select('*', { count: 'exact' });

  return (
    <div className="px-4 py-6 sm:px-0">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Staff"
          value={staff?.length || 0}
          icon="👥"
          link="/admin/staff"
        />
        <StatCard
          title="Services"
          value={services?.length || 0}
          icon="✂️"
          link="/admin/services"
        />
        <StatCard
          title="Bookings"
          value={bookings?.length || 0}
          icon="📅"
          link="/admin/bookings"
        />
        <StatCard
          title="Total Users"
          value={users?.length || 0}
          icon="👤"
          link="/admin/users"
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/admin/staff/new"
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition text-center"
          >
            <div className="text-3xl mb-2">➕</div>
            <div className="font-medium">Add New Staff</div>
          </Link>
          <Link
            href="/admin/services/new"
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition text-center"
          >
            <div className="text-3xl mb-2">✨</div>
            <div className="font-medium">Add New Service</div>
          </Link>
          <Link
            href="/admin/bookings"
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition text-center"
          >
            <div className="text-3xl mb-2">📋</div>
            <div className="font-medium">View All Bookings</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, link }) {
  return (
    <Link href={link}>
      <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition cursor-pointer">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">{title}</p>
            <p className="text-3xl font-bold text-gray-900">{value}</p>
          </div>
          <div className="text-4xl">{icon}</div>
        </div>
      </div>
    </Link>
  );
}
