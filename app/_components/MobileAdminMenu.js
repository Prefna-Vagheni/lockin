'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import AdminNavLinks from './AdminNavLinks';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

export default function MobileAdminMenu({ session }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger button */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden p-2 rounded text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Slide-down mobile menu */}
      {open && (
        <div className="md:hidden mt-3 pb-3 space-y-2 animate-fadeIn">
          <div className="flex items-center space-x-2 md:space-x-4">
            <ThemeToggle />
            <img
              src={session.user.image}
              alt={session.user.name}
              className="w-8 h-8 rounded-full hidden sm:block"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300 hidden sm:block">
              {session.user.name}
            </span>
            <Link
              href="/dashboard"
              className="px-3 py-2 text-xs md:text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              Exit Admin
            </Link>
          </div>
          <AdminNavLinks mobile />

          {/* Extra user info for mobile */}
          <div className="flex items-center space-x-3 px-3 pt-3 border-t border-gray-200 dark:border-gray-700">
            <img
              src={session.user.image}
              alt={session.user.name}
              className="w-8 h-8 rounded-full"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {session.user.name}
            </span>
          </div>

          <Link
            href="/dashboard"
            className="block px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 
                       text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 
                       dark:hover:bg-gray-600"
          >
            Exit Admin
          </Link>
        </div>
      )}
    </>
  );
}
