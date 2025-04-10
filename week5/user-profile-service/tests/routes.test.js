const request = require('supertest');
const express = require('express');
const userRoutes = require('../src/routes/userRoutes');
const authRoutes = require('../src/routes/authRoutes');

const app = express();
app.use(express.json());
app.use('/users', userRoutes);
app.use('/auth', authRoutes);

describe('User API', () => {
  it('should register a new user', async () => {
    const res = await request(app).post('/users').send({
      email: 'testapi@example.com',
      password: 'testpass',
      name: 'API Test',
      address: {
        street: 'API St',
        city: 'TestCity',
        zipCode: '00000',
        country: 'APIland'
      }
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.email).toBe('testapi@example.com');
  });

  it('should login with correct credentials', async () => {
    await request(app).post('/users').send({
      email: 'login@example.com',
      password: 'mypassword',
      name: 'Login User',
      address: {
        street: 'Street 1',
        city: 'City',
        zipCode: '12345',
        country: 'Country'
      }
    });

    const res = await request(app).post('/auth/login').send({
      email: 'login@example.com',
      password: 'mypassword'
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});
