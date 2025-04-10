const { v4: uuidv4 } = require('uuid');
const users = require('../src/models/userModel');
const {
  createUser,
  getUserByEmail
} = require('../src/services/userService');

describe('User Service', () => {
  beforeEach(() => {
    users.length = 0; // pastron array për çdo test
  });

  it('should create a user with valid input', async () => {
    const userData = {
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
      address: {
        street: 'Main St',
        city: 'City',
        zipCode: '12345',
        country: 'Country'
      }
    };

    const user = await createUser(userData);

    expect(user).toHaveProperty('id');
    expect(user.email).toBe(userData.email);
    expect(user.name).toBe(userData.name);
  });

  it('should not allow duplicate emails', async () => {
    const userData = {
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
      address: {
        street: 'Main St',
        city: 'City',
        zipCode: '12345',
        country: 'Country'
      }
    };

    await createUser(userData);

    await expect(createUser(userData)).rejects.toThrow('User already exists');
  });
});
