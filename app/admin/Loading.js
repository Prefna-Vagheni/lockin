// import Loading from '@/_components/Loading';

// export default function AdminLoading() {
//   return <Loading />;
// }

export default function Loading() {
  return (
    <div className="px-4 py-6 sm:px-0 animate-pulse">
      {/* Header */}
      <div className="mb-8">
        <div className="h-8 w-48 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 w-72 bg-gray-200 rounded"></div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-gray-200 h-32 rounded-lg shadow-lg"></div>
        ))}
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-gray-200 h-24 rounded-lg shadow"></div>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="h-5 w-40 bg-gray-200 rounded mb-4"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-14 bg-gray-200 rounded mb-3"></div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="h-5 w-40 bg-gray-200 rounded mb-4"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-14 bg-gray-200 rounded mb-3"></div>
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
              className="h-24 border-2 border-dashed border-gray-300 rounded-lg"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
