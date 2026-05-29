"use client";

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { fetchWithAuth } from '@/utils/api';
import AppointmentCard from '@/components/AppointmentCard';
import CreateAppointmentModal from '@/components/CreateAppointmentModal';

interface Appointment {
  id: string;
  patientName: string;
  doctorName: string;
  date: string;
  notes?: string;
}

export default function AppointmentsDashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { token } = useAuth();
  const router = useRouter();

  const loadAppointments = useCallback(async () => {
    if (!token) return;

    setLoading(true);
    setError('');

    try {
      const data = await fetchWithAuth('/appointments');
      setAppointments(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load appointments');
      if (err.message?.includes('Unauthorized') || err.message?.includes('Forbidden')) {
        router.push('/login');
      }
    } finally {
      setLoading(false);
    }
  }, [token, router]);

  useEffect(() => {
    if (!token) {
      router.push('/login');
      return;
    }
    loadAppointments();
  }, [token, loadAppointments, router]);

  if (!token) return null;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Appointments Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Manage and view all your clinic appointments</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-md transition font-medium shadow-sm flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          New Appointment
        </button>
      </div>

      {error && <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg">{error}</div>}

      {loading ? (
        <div className="flex justify-center items-center py-20 text-gray-500">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mr-3"></div>
          Loading appointments...
        </div>
      ) : appointments.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="w-16 h-16 bg-blue-50 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No appointments yet</h3>
          <p className="text-gray-500 mb-6 max-w-sm mx-auto">Get started by creating your first clinic appointment.</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-primary hover:text-primary-dark font-medium underline-offset-4 hover:underline"
          >
            Create an appointment
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {appointments.map(appointment => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ))}
        </div>
      )}

      <CreateAppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={loadAppointments}
      />
    </div>
  );
}
