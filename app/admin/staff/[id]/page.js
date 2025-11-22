import { supabaseAdmin } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import EditStaffForm from '@/_components/EditStaffForm';

export default async function EditStaffPage({ params }) {
  const { id } = params;

  // Fetch staff details
  const { data: staff, error } = await supabaseAdmin
    .from('staff')
    .select(
      `
      *,
      users:user_id (
        id,
        name,
        email
      )
    `
    )
    .eq('id', id)
    .single();

  if (error || !staff) {
    notFound();
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Edit Staff Member
        </h1>
        <div className="bg-white rounded-lg shadow p-6">
          <EditStaffForm staff={staff} />
        </div>
      </div>
    </div>
  );
}
