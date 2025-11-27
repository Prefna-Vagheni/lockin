'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ThemeToggle from '@/_components/ThemeToggle';
import AdminNavLinks from '@/_components/AdminNavLinks';

export default function AdminHeader({ user }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-4 md:space-x-8">
            {/* Logo */}
            <Link
              href="/admin"
              className="text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2"
            >
              <span className="hidden [@media(min-width:950px)]:block">
                LockIn
              </span>
              <span className="inline-block [@media(min-width:950px)]:hidden">
                <Image
                  src="/image/lockin.png"
                  alt="Lockin logo"
                  width={32}
                  height={32}
                  priority
                />
              </span>
              <span className="text-gray-900 dark:text-white">Admin</span>
            </Link>

            {/* Desktop NavLinks - Hidden on mobile */}
            <div className="hidden md:block">
              <AdminNavLinks />
            </div>
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">
            <ThemeToggle />

            {/* User Profile Info */}
            <div className="w-8 aspect-square relative hidden sm:block">
              <Image
                src={user.image}
                alt={user.name}
                fill
                className="rounded-full object-cover"
              />
            </div>
            <span className="text-sm text-gray-700 dark:text-gray-300 hidden [@media(min-width:990px)]:block">
              {user.name}
            </span>

            <Link
              href="/dashboard"
              className="hidden sm:block px-3 py-2 text-xs md:text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              Exit Admin
            </Link>

            {/* --- HAMBURGER BUTTON (Visible only on mobile) --- */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon changes based on state */}
              {isMobileMenuOpen ? (
                // X Icon
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                // Hamburger Icon
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* --- MOBILE MENU DROPDOWN --- */}
      {/* Only render if isMobileMenuOpen is true */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t dark:border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {/* Reusing the AdminNavLinks component inside mobile menu if it supports vertical layout, 
                 otherwise stick to manual links below */}
            <Link
              href="/admin"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 hover:bg-gray-50 dark:hover:bg-gray-700"
              onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
            >
              Dashboard
            </Link>
            <Link
              href="/admin/staff"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 hover:bg-gray-50 dark:hover:bg-gray-700"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Staff
            </Link>
            <Link
              href="/admin/services"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 hover:bg-gray-50 dark:hover:bg-gray-700"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/admin/bookings"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 hover:bg-gray-50 dark:hover:bg-gray-700"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Bookings
            </Link>
          </div>

          {/* Mobile Profile Section (Optional: add Exit button here for mobile) */}
          <div className="pt-4 pb-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center px-5">
              <div className="shrink-0 w-10 aspect-square relative">
                <Image
                  className=" rounded-full object-cover"
                  src={user.image}
                  alt={user.name}
                  fill
                />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium leading-none text-gray-800 dark:text-white">
                  {user.name}
                </div>
                <div className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400 mt-1">
                  {user.email}
                </div>
              </div>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <Link
                href="/dashboard"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Exit Admin Mode
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
