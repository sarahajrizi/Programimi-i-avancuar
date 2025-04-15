const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(express.json());

// ✅ Supabase konfigurimi
const supabaseUrl = 'https://wxsktbfkltjzkkwzrucq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4c2t0YmZrbHRqemtrd3pydWNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyNzM0NzgsImV4cCI6MjA1OTg0OTQ3OH0.HT0dMhTjqe_LFAQhUDa-POPykLX02UyVwIy4HZ723sE'; // ruaje me .env për siguri
const supabase = createClient(supabaseUrl, supabaseKey);

const PORT = process.env.PORT || 3000;
const SECRET_KEY = 'jwt_secret_key'; // ruaje në .env për prodhim

// ✅ Middleware për verifikimin e tokenit
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access token required' });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
}

// ✅ Regjistrimi i përdoruesit
app.post('/users', async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const { data: existingUser, error: checkError } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .limit(1);

  if (checkError) {
    return res.status(500).json({ error: 'Database error', details: checkError.message });
  }

  if (existingUser && existingUser.length > 0) {
    return res.status(400).json({ error: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const { data, error } = await supabase.from('users').insert([
    {
      email,
      name,
      password: hashedPassword
    }
  ]).select();

  if (error) {
    return res.status(500).json({ error: 'Database insert error', details: error.message });
  }

  res.status(201).json({ message: 'User registered successfully', user: data[0] });
});

// ✅ Autentifikimi
app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;

  const { data: users, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .limit(1);

  if (error) {
    return res.status(500).json({ error: 'Database error', details: error.message });
  }

  if (!users || users.length === 0) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const user = users[0];
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  await supabase
    .from('users')
    .update({ last_login: new Date().toISOString() })
    .eq('id', user.id);

  const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '24h' });

  res.status(200).json({ token, userId: user.id });
});

// ✅ Profili i përdoruesit të loguar
app.get('/users/me', authenticateToken, async (req, res) => {
  const { data: users, error } = await supabase
    .from('users')
    .select('id, name, email, created_at, last_login')
    .eq('id', req.user.userId)
    .limit(1);

  if (error || !users || users.length === 0) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json(users[0]);
});

// ✅ Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// ✅ Startimi i serverit
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

