'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/staff', label: 'Staff' },
  { href: '/admin/services', label: 'Services' },
  { href: '/admin/bookings', label: 'Bookings' },
];

export default function AdminNavLinks() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex space-x-4">
      {links.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={clsx(
            'px-3 py-2 rounded-md text-sm font-medium',
            pathname === href
              ? 'bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white border-b-2 border-blue-500 dark:border-blue-200'
              : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
          )}
        >
          {label}
        </Link>
      ))}
    </div>
  );
}
