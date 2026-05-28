import { Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
import { supabase } from '../utils/supabaseClient';

export const getAppointments = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { data: appointments, error } = await supabase
      .from('appointments')
      .select('*')
      .order('date', { ascending: true });

    if (error) {
      console.error('Supabase error:', error);
      res.status(500).json({ message: 'Database error' });
      return;
    }

    res.status(200).json(appointments || []);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const createAppointment = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { patientName, doctorName, date, notes } = req.body;
    const userId = req.user?.id;

    if (!patientName || !doctorName || !date) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }

    // Basic date validation
    const appointmentDate = new Date(date);
    if (isNaN(appointmentDate.getTime())) {
      res.status(400).json({ message: 'Invalid date format' });
      return;
    }
    
    if (appointmentDate < new Date()) {
      res.status(400).json({ message: 'Appointment date must be in the future' });
      return;
    }

    const { data: appointment, error } = await supabase
      .from('appointments')
      .insert([
        {
          patientName,
          doctorName,
          date: appointmentDate.toISOString(),
          notes: notes || null,
          userId
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      res.status(500).json({ message: 'Database error' });
      return;
    }

    res.status(201).json({
      message: 'Appointment created successfully',
      appointment
    });
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

