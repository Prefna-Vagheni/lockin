import AddStaffForm from '../../../_components/AddStaffForm';

export default function NewStaffPage() {
  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Add New Staff Member
        </h1>
        <div className="bg-white rounded-lg shadow p-6">
          <AddStaffForm />
        </div>
      </div>
    </div>
  );
}
