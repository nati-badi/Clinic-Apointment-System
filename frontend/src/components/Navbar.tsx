"use client";

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { token, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <nav className="bg-white shadow-sm border-b px-6 py-4 flex justify-between items-center">
      <Link href="/" className="font-bold text-xl text-primary">Clinic Mini</Link>
      <div className="flex gap-4 items-center">
        {token ? (
          <>
            <button
              onClick={handleLogout}
              className="bg-red-100 hover:bg-red-200 text-red-800 px-4 py-2 rounded-md transition text-sm font-medium"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="text-gray-600 hover:text-primary transition text-sm font-medium"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md transition text-sm font-medium"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
