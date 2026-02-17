const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

// Mock user database (in real app, use MongoDB/PostgreSQL)
let users = [];

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'mediAI-secret-key-2024';

// Helper function to validate email
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Helper function to validate password
const validatePassword = (password) => {
  return password.length >= 8;
};

// Register/Sign Up
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        message: 'Name, email, and password are required' 
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ 
        error: 'Invalid email',
        message: 'Please provide a valid email address' 
      });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({ 
        error: 'Weak password',
        message: 'Password must be at least 8 characters long' 
      });
    }

    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return res.status(409).json({ 
        error: 'User already exists',
        message: 'An account with this email already exists' 
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const newUser = {
      id: uuidv4(),
      name,
      email,
      password: hashedPassword,
      phone: phone || '',
      createdAt: new Date().toISOString(),
      profile: {
        avatar: null,
        dateOfBirth: null,
        gender: null,
        bloodGroup: null,
        allergies: [],
        medicalHistory: []
      }
    };

    users.push(newUser);

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Remove password from response
    const { password: _, ...userWithoutPassword } = newUser;

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      user: userWithoutPassword,
      token
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      error: 'Registration failed',
      message: 'Failed to create account' 
    });
  }
});

// Login/Sign In
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ 
        error: 'Missing credentials',
        message: 'Email and password are required' 
      });
    }

    // Find user
    const user = users.find(user => user.email === email);
    if (!user) {
      return res.status(401).json({ 
        error: 'Invalid credentials',
        message: 'Email or password is incorrect' 
      });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ 
        error: 'Invalid credentials',
        message: 'Email or password is incorrect' 
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      success: true,
      message: 'Login successful',
      user: userWithoutPassword,
      token
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      error: 'Login failed',
      message: 'Failed to authenticate user' 
    });
  }
});

// Get current user profile
router.get('/profile', (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        error: 'No token provided',
        message: 'Authentication token is required' 
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = users.find(user => user.id === decoded.userId);

    if (!user) {
      return res.status(404).json({ 
        error: 'User not found',
        message: 'User account not found' 
      });
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      success: true,
      user: userWithoutPassword
    });

  } catch (error) {
    console.error('Profile error:', error);
    res.status(401).json({ 
      error: 'Invalid token',
      message: 'Authentication token is invalid or expired' 
    });
  }
});

// Update profile
router.put('/profile', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        error: 'No token provided',
        message: 'Authentication token is required' 
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const userIndex = users.findIndex(user => user.id === decoded.userId);

    if (userIndex === -1) {
      return res.status(404).json({ 
        error: 'User not found',
        message: 'User account not found' 
      });
    }

    const { name, phone, profile } = req.body;

    // Update user data
    if (name) users[userIndex].name = name;
    if (phone) users[userIndex].phone = phone;
    if (profile) {
      users[userIndex].profile = { ...users[userIndex].profile, ...profile };
    }

    users[userIndex].updatedAt = new Date().toISOString();

    // Remove password from response
    const { password: _, ...userWithoutPassword } = users[userIndex];

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: userWithoutPassword
    });

  } catch (error) {
    console.error('Profile update error:', error);
    res.status(401).json({ 
      error: 'Invalid token',
      message: 'Authentication token is invalid or expired' 
    });
  }
});

module.exports = router;
