import { supabaseAdmin } from '../lib/supabase';
import Link from 'next/link';

export default async function AdminDashboard() {
  // Fetch comprehensive stats
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const nextMonthStart = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  // All bookings
  const { data: allBookings } = await supabaseAdmin
    .from('bookings')
    .select('*');

  // Today's bookings
  const { data: todayBookings } = await supabaseAdmin
    .from('bookings')
    .select('*')
    .gte('start_time', today.toISOString())
    .lt('start_time', tomorrow.toISOString())
    .eq('status', 'confirmed');

  // This month's bookings
  const { data: monthBookings } = await supabaseAdmin
    .from('bookings')
    .select('*')
    .gte('start_time', thisMonthStart.toISOString())
    .lt('start_time', nextMonthStart.toISOString());

  // Revenue calculations
  const totalRevenue =
    allBookings?.reduce((sum, b) => sum + parseFloat(b.total_price || 0), 0) ||
    0;
  const monthRevenue =
    monthBookings?.reduce(
      (sum, b) => sum + parseFloat(b.total_price || 0),
      0
    ) || 0;

  // Staff count
  const { data: staff } = await supabaseAdmin
    .from('staff')
    .select('*', { count: 'exact' });

  const activeStaff = staff?.filter((s) => s.is_active).length || 0;

  // Services count
  const { data: services } = await supabaseAdmin
    .from('services')
    .select('*', { count: 'exact' });

  const activeServices = services?.filter((s) => s.is_active).length || 0;

  // Users count
  const { data: users } = await supabaseAdmin
    .from('users')
    .select('*', { count: 'exact' });

  // Upcoming bookings (next 7 days)
  const weekFromNow = new Date(now);
  weekFromNow.setDate(weekFromNow.getDate() + 7);

  const { data: upcomingBookings } = await supabaseAdmin
    .from('bookings')
    .select(
      `
      *,
      client:client_id (name),
      staff:staff_id (users:user_id (name)),
      service:service_id (name)
    `
    )
    .gte('start_time', now.toISOString())
    .lte('start_time', weekFromNow.toISOString())
    .eq('status', 'confirmed')
    .order('start_time', { ascending: true })
    .limit(5);

  // Recent bookings
  const { data: recentBookings } = await supabaseAdmin
    .from('bookings')
    .select(
      `
      *,
      client:client_id (name),
      staff:staff_id (users:user_id (name)),
      service:service_id (name)
    `
    )
    .order('created_at', { ascending: false })
    .limit(5);

  return (
    <div className="px-4 py-6 sm:px-0">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-200 mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-600">
          Welcome back! Here&apos;s what&apos;s happening today.
        </p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Today's Appointments"
          value={todayBookings?.length || 0}
          icon="📅"
          color="blue"
          subtitle="Scheduled for today"
        />
        <MetricCard
          title="This Month"
          value={monthBookings?.length || 0}
          icon="📊"
          color="purple"
          subtitle={`${
            monthBookings?.filter((b) => b.status === 'confirmed').length || 0
          } confirmed`}
        />
        <MetricCard
          title="Month Revenue"
          value={`$${monthRevenue.toFixed(2)}`}
          icon="💰"
          color="green"
          subtitle="Total earnings"
        />
        <MetricCard
          title="Total Revenue"
          value={`$${totalRevenue.toFixed(2)}`}
          icon="💵"
          color="emerald"
          subtitle="All time"
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Active Staff"
          value={activeStaff}
          total={staff?.length || 0}
          icon="👥"
          link="/admin/staff"
        />
        <StatCard
          title="Services"
          value={activeServices}
          total={services?.length || 0}
          icon="✂️"
          link="/admin/services"
        />
        <StatCard
          title="Total Clients"
          value={users?.length || 0}
          icon="👤"
          link="/admin/users"
        />
        <StatCard
          title="All Bookings"
          value={allBookings?.length || 0}
          icon="📋"
          link="/admin/bookings"
        />
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Upcoming Appointments */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              Upcoming This Week
            </h2>
            <Link
              href="/admin/bookings"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              View All →
            </Link>
          </div>

          {upcomingBookings && upcomingBookings.length > 0 ? (
            <div className="space-y-3">
              {upcomingBookings.map((booking) => (
                <UpcomingBookingItem key={booking.id} booking={booking} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">
              No upcoming appointments this week
            </p>
          )}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Recent Bookings</h2>
            <Link
              href="/admin/bookings"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              View All →
            </Link>
          </div>

          {recentBookings && recentBookings.length > 0 ? (
            <div className="space-y-3">
              {recentBookings.map((booking) => (
                <RecentBookingItem key={booking.id} booking={booking} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No recent bookings</p>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <QuickActionCard
            href="/admin/staff/new"
            icon="➕"
            title="Add Staff"
            description="Add new hairdresser"
          />
          <QuickActionCard
            href="/admin/services/new"
            icon="✨"
            title="Add Service"
            description="Create new service"
          />
          <QuickActionCard
            href="/admin/bookings"
            icon="📅"
            title="View Bookings"
            description="Manage appointments"
          />
          <QuickActionCard
            href="/admin/staff"
            icon="⏰"
            title="Manage Hours"
            description="Set staff schedules"
          />
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, icon, color, subtitle }) {
  const colors = {
    blue: 'from-blue-500 to-blue-600',
    purple: 'from-purple-500 to-purple-600',
    green: 'from-green-500 to-green-600',
    emerald: 'from-emerald-500 to-emerald-600',
  };

  return (
    <div
      className={`bg-gradient-to-br ${colors[color]} rounded-lg shadow-lg p-6 text-white`}
    >
      <div className="flex items-center justify-between mb-2">
        <p className="text-white/80 text-sm font-medium">{title}</p>
        <span className="text-3xl">{icon}</span>
      </div>
      <p className="text-3xl font-bold mb-1">{value}</p>
      <p className="text-white/80 text-xs">{subtitle}</p>
    </div>
  );
}

function StatCard({ title, value, total, icon, link }) {
  return (
    <Link href={link}>
      <div className="bg-white dark:bg-gray-700 rounded-lg shadow hover:shadow-lg transition p-6 cursor-pointer">
        <div className="flex items-center justify-between mb-2">
          <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
            {title}
          </p>
          <span className="text-2xl">{icon}</span>
        </div>
        <p className="text-2xl font-bold text-gray-900 dark:text-gray-200">
          {value}
          {total > 0 && value !== total && (
            <span className="text-sm text-gray-500 font-normal">
              {' '}
              / {total}
            </span>
          )}
        </p>
      </div>
    </Link>
  );
}

function UpcomingBookingItem({ booking }) {
  const startTime = new Date(booking.start_time);
  const isToday = startTime.toDateString() === new Date().toDateString();

  return (
    <Link href={`/admin/bookings/${booking.id}`}>
      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer">
        <div className="flex-1">
          <p className="font-semibold text-gray-900 text-sm">
            {booking.client?.name}
          </p>
          <p className="text-xs text-gray-600">
            {booking.service?.name} • {booking.staff?.users?.name}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-gray-900">
            {startTime.toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: '2-digit',
              hour12: true,
            })}
          </p>
          <p
            className={`text-xs ${
              isToday ? 'text-orange-600 font-semibold' : 'text-gray-500'
            }`}
          >
            {isToday
              ? 'Today'
              : startTime.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })}
          </p>
        </div>
      </div>
    </Link>
  );
}

function RecentBookingItem({ booking }) {
  const statusColors = {
    confirmed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
    completed: 'bg-blue-100 text-blue-800',
  };

  return (
    <Link href={`/admin/bookings/${booking.id}`}>
      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer">
        <div className="flex-1">
          <p className="font-semibold text-gray-900 text-sm">
            {booking.client?.name}
          </p>
          <p className="text-xs text-gray-600">{booking.service?.name}</p>
        </div>
        <div className="text-right">
          <span
            className={`px-2 py-1 text-xs font-semibold rounded ${
              statusColors[booking.status]
            }`}
          >
            {booking.status}
          </span>
          <p className="text-xs text-gray-500 mt-1">${booking.total_price}</p>
        </div>
      </div>
    </Link>
  );
}

function QuickActionCard({ href, icon, title, description }) {
  return (
    <Link href={href}>
      <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition text-center cursor-pointer">
        <div className="text-3xl mb-2">{icon}</div>
        <div className="font-medium text-gray-900 mb-1">{title}</div>
        <div className="text-xs text-gray-600">{description}</div>
      </div>
    </Link>
  );
}
