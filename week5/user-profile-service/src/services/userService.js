const { v4: uuidv4 } = require('uuid');
const users = require('../models/userModel');
const { hashPassword } = require('../utils/passwordUtils');

const createUser = async (userData) => {
  const existing = users.find(u => u.email === userData.email);
  if (existing) throw new Error('User already exists');

  const hashed = await hashPassword(userData.password);

  const user = {
    id: uuidv4(),
    email: userData.email,
    password: hashed,
    name: userData.name,
    address: userData.address,
    registrationDate: new Date().toISOString(),
    lastLogin: null,
  };

  users.push(user);

  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

const getUserByEmail = (email) => users.find(u => u.email === email);
const getUserById = (id) => users.find(u => u.id === id);

const updateUser = (id, updates) => {
  const user = users.find(u => u.id === id);
  if (!user) return null;

  user.name = updates.name || user.name;
  user.address = updates.address || user.address;

  return user;
};

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  updateUser
};
