// Shimmer skeleton utility class
const shimmer =
  'relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full \
   before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r \
   before:from-transparent before:via-white/40 before:to-transparent';

export default function Loading() {
  return (
    <>
      {/* Shimmer Keyframes */}
      <style>
        {`
          @keyframes shimmer {
            100% {
              transform: translateX(100%);
            }
          }
        `}
      </style>

      <div className="px-4 py-6 sm:px-0">
        {/* Header */}
        <div className="mb-8">
          <div className={`${shimmer} bg-gray-200 h-8 w-56 rounded mb-2`}></div>
          <div className={`${shimmer} bg-gray-200 h-4 w-80 rounded`}></div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="relative rounded-lg shadow-lg p-6 bg-linear-to-br from-gray-300 to-gray-200 text-white"
            >
              <div className="flex items-center justify-between mb-2">
                <div
                  className={`${shimmer} bg-white/40 h-3 w-24 rounded`}
                ></div>
                <div
                  className={`${shimmer} bg-white/30 h-8 w-8 rounded-full`}
                ></div>
              </div>
              <div
                className={`${shimmer} bg-white/50 h-6 w-20 rounded mb-1`}
              ></div>
              <div className={`${shimmer} bg-white/40 h-2 w-28 rounded`}></div>
            </div>
          ))}
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-2">
                <div
                  className={`${shimmer} bg-gray-200 h-3 w-24 rounded`}
                ></div>
                <div
                  className={`${shimmer} bg-gray-200 h-7 w-7 rounded-full`}
                ></div>
              </div>
              <div className={`${shimmer} bg-gray-300 h-6 w-16 rounded`}></div>
            </div>
          ))}
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Upcoming */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`${shimmer} bg-gray-200 h-5 w-48 rounded`}></div>
              <div className={`${shimmer} bg-blue-100 h-4 w-20 rounded`}></div>
            </div>

            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-3"
              >
                <div className="flex-1 space-y-2">
                  <div
                    className={`${shimmer} bg-gray-200 h-3 w-32 rounded`}
                  ></div>
                  <div
                    className={`${shimmer} bg-gray-200 h-2 w-24 rounded`}
                  ></div>
                </div>
                <div className="text-right space-y-2 ml-4">
                  <div
                    className={`${shimmer} bg-gray-200 h-3 w-16 rounded`}
                  ></div>
                  <div
                    className={`${shimmer} bg-gray-200 h-2 w-10 rounded`}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Recent */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`${shimmer} bg-gray-200 h-5 w-40 rounded`}></div>
              <div className={`${shimmer} bg-blue-100 h-4 w-20 rounded`}></div>
            </div>

            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-3"
              >
                <div className="flex-1 space-y-2">
                  <div
                    className={`${shimmer} bg-gray-200 h-3 w-32 rounded`}
                  ></div>
                  <div
                    className={`${shimmer} bg-gray-200 h-2 w-20 rounded`}
                  ></div>
                </div>
                <div className="text-right space-y-2 ml-4">
                  <div
                    className={`${shimmer} bg-gray-200 h-4 w-14 rounded`}
                  ></div>
                  <div
                    className={`${shimmer} bg-gray-200 h-2 w-10 rounded`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className={`${shimmer} bg-gray-200 h-5 w-40 rounded mb-4`}></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center"
              >
                <div
                  className={`${shimmer} bg-gray-200 h-8 w-8 rounded mb-2 mx-auto`}
                ></div>
                <div
                  className={`${shimmer} bg-gray-200 h-3 w-20 rounded mx-auto mb-1`}
                ></div>
                <div
                  className={`${shimmer} bg-gray-200 h-2 w-24 rounded mx-auto`}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
