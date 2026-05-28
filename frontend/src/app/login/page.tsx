"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { fetchWithAuth } from '@/utils/api';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (token) {
      router.push('/appointments');
    }
  }, [token, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await fetchWithAuth('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password })
      });
      
      login(data.token);
      router.push('/appointments');
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  if (token) return null;

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-sm text-gray-500">Sign in to manage appointments</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && <div className="p-3 bg-red-50 text-red-600 text-sm rounded-md">{error}</div>}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input 
              type="text" 
              required
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
              placeholder="Enter username"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
              placeholder="Enter password"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-dark text-white py-2.5 rounded-md transition font-medium disabled:opacity-70 mt-4"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-primary hover:text-primary-dark font-medium">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
