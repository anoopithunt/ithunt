import bcrypt from 'bcryptjs';
import db from '../config/db.js';
import { generateToken } from '../utils/jwt.js';
import { successResponse, errorResponse } from '../utils/helpers.js';

export async function register(req, res) {
  try {
    const { name, email, password, role, phone, course, bio } = req.body;

    if (!name || !email || !password) {
      return errorResponse(res, 'Name, email, and password are required fields', 400);
    }

    const existingUser = db.findOne('users', u => u.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
      return errorResponse(res, 'An account with this email address already exists', 409);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const assignedRole = (role && ['student', 'faculty'].includes(role)) ? role : 'student';

    const newUser = db.insert('users', {
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: assignedRole,
      phone: phone || '',
      course: course || '',
      bio: bio || '',
      verified: true
    });

    const token = generateToken({ id: newUser.id, role: newUser.role, email: newUser.email });
    const { password: _, ...userWithoutPassword } = newUser;

    return successResponse(res, 'User registered successfully', {
      user: userWithoutPassword,
      token
    }, 201);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return errorResponse(res, 'Email and password are required', 400);
    }

    const user = db.findOne('users', u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      return errorResponse(res, 'Invalid email or password credentials', 401);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return errorResponse(res, 'Invalid email or password credentials', 401);
    }

    const token = generateToken({ id: user.id, role: user.role, email: user.email });
    const { password: _, ...userWithoutPassword } = user;

    return successResponse(res, 'Authentication successful', {
      user: userWithoutPassword,
      token
    });
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
}

export function getCurrentUser(req, res) {
  const { password: _, ...userWithoutPassword } = req.user;
  return successResponse(res, 'Current user profile fetched successfully', {
    user: userWithoutPassword
  });
}

export function getAllUsers(req, res) {
  const users = db.getCollection('users').map(u => {
    const { password, ...rest } = u;
    return rest;
  });
  return successResponse(res, 'Registered users fetched successfully', { users, count: users.length });
}
