import EditServiceForm from '../../../_components/EditServiceForm';
import { supabaseAdmin } from '@/lib/supabase';
import { notFound } from 'next/navigation';

export default async function EditServicePage({ params }) {
  const { id } = await params;

  const { data: service, error } = await supabaseAdmin
    .from('services')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !service) {
    notFound();
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Edit Service</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <EditServiceForm service={service} />
        </div>
      </div>
    </div>
  );
}
