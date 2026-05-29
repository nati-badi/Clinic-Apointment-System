import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { supabase } from '../utils/supabaseClient';
import bcrypt from 'bcrypt';

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret_change_me';

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ message: 'Username and password are required' });
      return;
    }

    const { data: users, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username);

    if (error) {
      console.error('Supabase error:', error);
      res.status(500).json({ message: 'Database error' });
      return;
    }

    if (!users || users.length === 0) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const user = users[0];

    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: { id: user.id, username: user.username }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ message: 'Username and password are required' });
      return;
    }

    if (password.length < 6) {
      res.status(400).json({ message: 'Password must be at least 6 characters' });
      return;
    }

    const { data: existing } = await supabase
      .from('users')
      .select('id')
      .eq('username', username);

    if (existing && existing.length > 0) {
      res.status(409).json({ message: 'Username already exists' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { data: newUser, error } = await supabase
      .from('users')
      .insert([{ username, passwordHash: hashedPassword }])
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      res.status(500).json({ message: 'Database error' });
      return;
    }

    const token = jwt.sign(
      { id: newUser.id, username: newUser.username },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(201).json({
      message: 'Account created successfully',
      token,
      user: { id: newUser.id, username: newUser.username }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
