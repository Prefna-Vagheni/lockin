const shimmer =
  'relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full \
   before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r \
   before:from-transparent before:via-white/40 before:to-transparent';

export default function Loading() {
  return (
    <>
      {/* Shimmer Keyframe */}
      <style>
        {`
          @keyframes shimmer {
            100% {
              transform: translateX(100%);
            }
          }
        `}
      </style>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* NAVBAR */}
        <nav className="bg-white dark:bg-gray-800 shadow border-b dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              {/* Left (Logo) */}
              <div
                className={`${shimmer} bg-gray-200 dark:bg-gray-700 h-7 w-24 rounded`}
              ></div>

              {/* Right (User + Dashboard) */}
              <div className="flex items-center space-x-4">
                <div
                  className={`${shimmer} bg-gray-200 dark:bg-gray-700 h-4 w-20 rounded`}
                ></div>
                <div
                  className={`${shimmer} bg-gray-200 dark:bg-gray-700 h-8 w-24 rounded`}
                ></div>
              </div>
            </div>
          </div>
        </nav>

        {/* MAIN CONTENT */}
        <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          {/* HEADER */}
          <div className="text-center mb-12">
            <div
              className={`${shimmer} bg-gray-300 dark:bg-gray-700 h-10 w-72 mx-auto rounded mb-4`}
            ></div>
            <div
              className={`${shimmer} bg-gray-200 dark:bg-gray-700 h-5 w-96 mx-auto rounded`}
            ></div>
          </div>

          {/* STAFF GRID SKELETON */}
          <section className="mb-12">
            <div
              className={`${shimmer} bg-gray-300 dark:bg-gray-700 h-7 w-80 rounded mb-8`}
            ></div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
                >
                  {/* Image Square */}
                  <div className="aspect-square bg-gray-200 dark:bg-gray-700 relative">
                    <div
                      className={`${shimmer} absolute inset-0 rounded`}
                    ></div>
                  </div>

                  {/* Info */}
                  <div className="p-6 space-y-4">
                    {/* Name */}
                    <div
                      className={`${shimmer} bg-gray-300 dark:bg-gray-700 h-6 w-40 rounded`}
                    ></div>

                    {/* Bio */}
                    <div className="space-y-2">
                      <div
                        className={`${shimmer} bg-gray-200 dark:bg-gray-700 h-3 w-full rounded`}
                      ></div>
                      <div
                        className={`${shimmer} bg-gray-200 dark:bg-gray-700 h-3 w-5/6 rounded`}
                      ></div>
                      <div
                        className={`${shimmer} bg-gray-200 dark:bg-gray-700 h-3 w-4/6 rounded`}
                      ></div>
                    </div>

                    {/* Specialties */}
                    <div className="space-y-2">
                      <div
                        className={`${shimmer} bg-gray-300 dark:bg-gray-700 h-4 w-28 rounded`}
                      ></div>
                      <div className="flex flex-wrap gap-2">
                        {[...Array(3)].map((_, idx) => (
                          <div
                            key={idx}
                            className={`${shimmer} bg-blue-200 dark:bg-blue-900 h-6 w-20 rounded-full`}
                          ></div>
                        ))}
                      </div>
                    </div>

                    {/* Button */}
                    <div
                      className={`${shimmer} bg-blue-300 dark:bg-blue-700 h-10 w-full rounded-lg mt-4`}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
