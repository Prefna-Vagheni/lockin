import { supabaseAdmin } from '../../lib/supabase';
import Link from 'next/link';

export default async function ServicesPage() {
  const { data: services, error } = await supabaseAdmin
    .from('services')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Services Management
        </h1>
        <Link
          href="/admin/services/new"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
        >
          ➕ Add New Service
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded mb-4">
          Error loading services: {error.message}
        </div>
      )}

      {!services || services.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <div className="text-6xl mb-4">✂️</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No services yet
          </h3>
          <p className="text-gray-500 mb-6">
            Add your first service to get started!
          </p>
          <Link
            href="/admin/services/new"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            Add First Service
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      )}
    </div>
  );
}

function ServiceCard({ service }) {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-6">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-semibold text-gray-900">{service.name}</h3>
        {!service.is_active && (
          <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">
            Inactive
          </span>
        )}
      </div>

      {service.description && (
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {service.description}
        </p>
      )}

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm">
          <span className="text-gray-500 w-20">Duration:</span>
          <span className="font-medium text-gray-900">
            {service.duration_minutes} mins
          </span>
        </div>
        <div className="flex items-center text-sm">
          <span className="text-gray-500 w-20">Price:</span>
          <span className="font-bold text-green-600 text-lg">
            ${service.price}
          </span>
        </div>
      </div>

      <Link
        href={`/admin/services/${service.id}`}
        className="block text-center px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 font-medium"
      >
        Edit Service
      </Link>
    </div>
  );
}
