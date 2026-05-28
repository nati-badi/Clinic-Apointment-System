export interface User {
  id: string;
  username: string;
  passwordHash: string; // In a real app, this would be hashed
}

export interface Appointment {
  id: string;
  patientName: string;
  doctorName: string;
  date: string;
  notes?: string;
  userId: string;
}

export const users: User[] = [
  {
    id: '1',
    username: 'admin',
    passwordHash: 'password123', // Hardcoded for demo purposes
  }
];

export const appointments: Appointment[] = [
  {
    id: '1',
    patientName: 'John Doe',
    doctorName: 'Dr. Smith',
    date: '2026-06-01T10:00:00.000Z',
    notes: 'Regular checkup',
    userId: '1'
  }
];
