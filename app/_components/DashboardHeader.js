'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ThemeToggle from '@/_components/ThemeToggle';
import SignOutButton from '@/_components/SignOutButton';
import { Menu, X } from 'lucide-react';

export default function DashboardHeader({ user }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // --- SCROLL LOCK LOGIC ---
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <nav className="bg-white dark:bg-gray-800 shadow border-b dark:border-gray-700 relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* LEFT: Logo */}
          <div className="flex items-center">
            <Link href="/dashboard">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                LockIn
              </h1>
            </Link>
          </div>

          {/* RIGHT: Desktop Menu (Hidden on Mobile) */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />

            {/* User Info */}
            <div className="flex items-center space-x-3">
              <img
                src={user.image}
                alt={user.name}
                className="w-8 h-8 rounded-full"
              />
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                {user.name}
              </span>
            </div>

            {/* Admin Link (Conditional) */}
            {user.role === 'admin' && (
              <Link
                href="/admin"
                className="px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded hover:bg-blue-700 dark:hover:bg-blue-600 text-sm font-medium"
              >
                Admin Panel
              </Link>
            )}

            <SignOutButton />
          </div>

          {/* RIGHT: Mobile Hamburger (Visible on Mobile) */}
          <div className="flex md:hidden items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
            >
              <span className="sr-only">Open menu</span>

              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* --- MOBILE MENU OVERLAY (Full Screen & No Scroll) --- */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-40 bg-white dark:bg-gray-900 md:hidden overflow-y-auto h-[calc(100vh-4rem)]">
          <div className="flex flex-col h-full px-4 pt-8 pb-6 space-y-6">
            <div className="space-y-4">
              {/* Quick links to core user features */}
              <Link
                href="/booking"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-xl font-semibold text-gray-800 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3"
              >
                Book Appointment ✂️
              </Link>
              <Link
                href="/my-bookings"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-xl font-semibold text-gray-800 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3"
              >
                My Bookings 📅
              </Link>

              {user.role === 'admin' && (
                <Link
                  href="/admin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-xl font-semibold text-blue-600 dark:text-blue-400 border-b border-gray-100 dark:border-gray-800 pb-3"
                >
                  Switch to Admin Panel ⚙️
                </Link>
              )}
            </div>

            {/* Mobile Footer Area (User Profile & Sign Out) */}
            <div className="mt-auto pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-6">
                <img
                  className="h-12 w-12 rounded-full"
                  src={user.image}
                  alt=""
                />
                <div className="ml-4">
                  <div className="text-lg font-medium text-gray-900 dark:text-white">
                    {user.name}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {user.email}
                  </div>
                </div>
              </div>

              {/* SignOutButton Wrapper to make it full width */}
              <div className="w-full">
                <SignOutButton className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700" />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
