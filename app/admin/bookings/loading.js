// 1. Define the custom Tailwind CSS for the shimmer animation
// You would need to add this to your main CSS file or a dedicated utility file
// if you are using a standard Tailwind setup without a custom configuration.

// In your main CSS/styles file (e.g., globals.css or main.css):
/*
@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.animate-shimmer {
  animation: shimmer 2s infinite linear;
  background: linear-gradient(
    to right,
    #f3f4f6 8%,  // Light mode base
    #e5e7eb 18%, // Light mode shine
    #f3f4f6 33%  // Light mode base
  );
  background-size: 200% 100%;
}

.dark .animate-shimmer {
  background: linear-gradient(
    to right,
    #1f2937 8%,  // Dark mode base
    #374151 18%, // Dark mode shine
    #1f2937 33%  // Dark mode base
  );
  background-size: 200% 100%;
}
*/

// 2. The React Component
import React from 'react';

/**
 * Shimmer loading component for a single booking item.
 * @param {string} className - Optional class names to apply to the container.
 */
const ShimmerItem = ({ className }) => (
  <div
    className={`flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg ${className}`}
  >
    {/* Left Content Area - Mimics Client Name and Service */}
    <div className="flex-1 space-y-1 pr-4">
      <div className="h-4 w-3/4 animate-shimmer rounded-md"></div>
      <div className="h-3 w-1/2 animate-shimmer rounded-md"></div>
    </div>

    {/* Right Content Area - Mimics Time and Date/Status */}
    <div className="text-right space-y-1">
      <div className="h-4 w-12 animate-shimmer rounded-md"></div>
      <div className="h-3 w-8 animate-shimmer rounded-md"></div>
    </div>
  </div>
);

/**
 * Fully functioning Shimmer Loading component for a list of bookings.
 * @param {number} count - The number of loading items to display. Defaults to 5.
 * @param {string} className - Optional class names to apply to the main wrapper.
 */
const BookingShimmerLoader = ({ count = 5, className = '' }) => {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <ShimmerItem key={index} />
      ))}
    </div>
  );
};

export default BookingShimmerLoader;
