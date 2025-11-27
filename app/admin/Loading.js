// import Loading from '@/_components/Loading';

// export default function AdminLoading() {
//   return <Loading />;
// }

export default function Loading() {
  return (
    <div className="px-4 py-6 sm:px-0 animate-pulse">
      {/* Header */}
      <div className="mb-8">
        <div className="h-8 w-56 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 w-80 bg-gray-200 rounded"></div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="rounded-lg shadow-lg p-6 text-white bg-gradient-to-br from-gray-300 to-gray-200"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="h-3 w-24 bg-white/40 rounded"></div>
              <div className="h-8 w-8 bg-white/30 rounded-full"></div>
            </div>
            <div className="h-6 w-20 bg-white/50 rounded mb-1"></div>
            <div className="h-2 w-28 bg-white/40 rounded"></div>
          </div>
        ))}
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="h-3 w-24 bg-gray-200 rounded"></div>
              <div className="h-7 w-7 bg-gray-200 rounded-full"></div>
            </div>
            <div className="h-6 w-16 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Upcoming */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="h-5 w-48 bg-gray-200 rounded"></div>
            <div className="h-4 w-20 bg-blue-100 rounded"></div>
          </div>

          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-3"
            >
              <div className="flex-1 space-y-2">
                <div className="h-3 w-32 bg-gray-200 rounded"></div>
                <div className="h-2 w-24 bg-gray-200 rounded"></div>
              </div>
              <div className="text-right space-y-2 ml-4">
                <div className="h-3 w-16 bg-gray-200 rounded"></div>
                <div className="h-2 w-10 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="h-5 w-40 bg-gray-200 rounded"></div>
            <div className="h-4 w-20 bg-blue-100 rounded"></div>
          </div>

          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-3"
            >
              <div className="flex-1 space-y-2">
                <div className="h-3 w-32 bg-gray-200 rounded"></div>
                <div className="h-2 w-20 bg-gray-200 rounded"></div>
              </div>
              <div className="text-right space-y-2 ml-4">
                <div className="h-4 w-14 bg-gray-200 rounded"></div>
                <div className="h-2 w-10 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="h-5 w-40 bg-gray-200 rounded mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="p-4 border-2 border-dashed border-gray-300 rounded-lg"
            >
              <div className="h-8 w-8 bg-gray-200 rounded mb-2 mx-auto"></div>
              <div className="h-3 w-20 bg-gray-200 rounded mx-auto mb-1"></div>
              <div className="h-2 w-24 bg-gray-200 rounded mx-auto"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
