import { supabaseAdmin } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import AvailabilityForm from '@/components/AvailabilityForm';

export default async function StaffAvailabilityPage({ params }) {
  const { id } = await params;

  // Fetch staff details
  const { data: staff, error: staffError } = await supabaseAdmin
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
    .eq('id', id)
    .single();

  if (staffError || !staff) {
    notFound();
  }

  // Fetch existing availability
  const { data: availability } = await supabaseAdmin
    .from('staff_availability')
    .select('*')
    .eq('staff_id', id)
    .order('day_of_week', { ascending: true });

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Set Working Hours
          </h1>
          <p className="text-gray-600 mt-2">
            Configure availability schedule for {staff.users?.name}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <AvailabilityForm
            staffId={staff.id}
            existingAvailability={availability || []}
          />
        </div>
      </div>
    </div>
  );
}
