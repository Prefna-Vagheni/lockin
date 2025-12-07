import { auth } from '../auth';
import { redirect } from 'next/navigation';

import AdminHeader from '../_components/AdminHeader';

export default async function AdminLayout({ children }) {
  const session = await auth();

  if (!session) {
    redirect('/auth/signin');
  }

  if (session.user.role !== 'admin') {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AdminHeader user={session.user} />

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
