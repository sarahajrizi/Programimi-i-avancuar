// validateUserData.test.js

const validateUserData = require('./validateUserData');

describe('validateUserData - Comprehensive Unit Tests', () => {
  test('duhet të jetë valid kur të gjitha fushat e detyrueshme plotësohen saktë dhe opsionalet janë gjithashtu të sakta', () => {
    const validData = {
      username: 'Valid_User123',
      email: 'valid@example.com',
      password: 'Password1!',
      age: 25,
      referralCode: 'ABCD1234'
    };

    const result = validateUserData(validData);
    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual({});
  });

  // Test për rastin kur userData mungon ose nuk është objekt
  test('duhet të dështojë kur userData mungon (null)', () => {
    const result = validateUserData(null);
    expect(result.isValid).toBe(false);
    expect(result.errors.global).toBe('Invalid user data format');
  });

  test('duhet të dështojë kur userData nuk është objekt (p.sh. string)', () => {
    const result = validateUserData('jo_objekt');
    expect(result.isValid).toBe(false);
    expect(result.errors.global).toBe('Invalid user data format');
  });

  // Teste për username
  test('duhet të dështojë kur mungon username', () => {
    const invalidData = {
      email: 'test@example.com',
      password: 'Password1!'
    };
    const result = validateUserData(invalidData);
    expect(result.isValid).toBe(false);
    expect(result.errors.username).toBe('Username is required');
  });

  test('duhet të dështojë kur username është më i shkurtër se 3 karaktere', () => {
    const invalidData = {
      username: 'ab',
      email: 'test@example.com',
      password: 'Password1!'
    };
    const result = validateUserData(invalidData);
    expect(result.isValid).toBe(false);
    expect(result.errors.username).toBe('Username must be between 3 and 20 characters');
  });

  test('duhet të dështojë kur username është më i gjatë se 20 karaktere', () => {
    const invalidData = {
      username: 'abcdefghijklmnopqrstu', // 21 karaktere
      email: 'test@example.com',
      password: 'Password1!'
    };
    const result = validateUserData(invalidData);
    expect(result.isValid).toBe(false);
    expect(result.errors.username).toBe('Username must be between 3 and 20 characters');
  });

  test('duhet të dështojë kur username përmban karaktere të palejuara', () => {
    const invalidData = {
      username: 'invalid@user!',
      email: 'test@example.com',
      password: 'Password1!'
    };
    const result = validateUserData(invalidData);
    expect(result.isValid).toBe(false);
    expect(result.errors.username).toBe('Username can only contain letters, numbers, and underscores');
  });

  // Teste për email
  test('duhet të dështojë kur mungon email', () => {
    const invalidData = {
      username: 'ValidUser123',
      password: 'Password1!'
    };
    const result = validateUserData(invalidData);
    expect(result.isValid).toBe(false);
    expect(result.errors.email).toBe('Email is required');
  });

  test('duhet të dështojë kur email ka format të gabuar', () => {
    const invalidData = {
      username: 'ValidUser123',
      email: 'gabim@',
      password: 'Password1!'
    };
    const result = validateUserData(invalidData);
    expect(result.isValid).toBe(false);
    expect(result.errors.email).toBe('Invalid email format');
  });

  // Teste për password
  test('duhet të dështojë kur mungon password', () => {
    const invalidData = {
      username: 'ValidUser123',
      email: 'test@example.com'
    };
    const result = validateUserData(invalidData);
    expect(result.isValid).toBe(false);
    expect(result.errors.password).toBe('Password is required');
  });

  test('duhet të dështojë kur password është më i shkurtër se 8 karaktere', () => {
    const invalidData = {
      username: 'ValidUser123',
      email: 'test@example.com',
      password: 'Pa2!'
    };
    const result = validateUserData(invalidData);
    expect(result.isValid).toBe(false);
    expect(result.errors.password).toBe('Password must be at least 8 characters long');
  });

  test('duhet të dështojë kur password nuk përmban numra', () => {
    const invalidData = {
      username: 'ValidUser123',
      email: 'test@example.com',
      password: 'Password!'
    };
    const result = validateUserData(invalidData);
    expect(result.isValid).toBe(false);
    expect(result.errors.password).toBe('Password must contain at least one number');
  });

  test('duhet të dështojë kur password nuk përmban karakter special', () => {
    const invalidData = {
      username: 'ValidUser123',
      email: 'test@example.com',
      password: 'Password1'
    };
    const result = validateUserData(invalidData);
    expect(result.isValid).toBe(false);
    expect(result.errors.password).toBe('Password must contain at least one special character');
  });

  // Teste për age (opsional)
  test('duhet të dështojë kur age nuk është numër', () => {
    const invalidData = {
      username: 'ValidUser123',
      email: 'test@example.com',
      password: 'Password1!',
      age: 'tetembedhjete'
    };
    const result = validateUserData(invalidData);
    expect(result.isValid).toBe(false);
    expect(result.errors.age).toBe('Age must be a number');
  });

  test('duhet të dështojë kur age është më i vogël se 18', () => {
    const invalidData = {
      username: 'ValidUser123',
      email: 'test@example.com',
      password: 'Password1!',
      age: 17
    };
    const result = validateUserData(invalidData);
    expect(result.isValid).toBe(false);
    expect(result.errors.age).toBe('User must be at least 18 years old');
  });

  // Teste për referralCode (opsional)
  test('duhet të dështojë kur referralCode nuk është string', () => {
    const invalidData = {
      username: 'ValidUser123',
      email: 'test@example.com',
      password: 'Password1!',
      referralCode: 12345678
    };
    const result = validateUserData(invalidData);
    expect(result.isValid).toBe(false);
    expect(result.errors.referralCode).toBe('Referral code must be a string');
  });

  test('duhet të dështojë kur referralCode nuk ka saktësisht 8 karaktere', () => {
    const invalidData = {
      username: 'ValidUser123',
      email: 'test@example.com',
      password: 'Password1!',
      referralCode: 'ABCD' // vetëm 4 karaktere
    };
    const result = validateUserData(invalidData);
    expect(result.isValid).toBe(false);
    expect(result.errors.referralCode).toBe('Referral code must be exactly 8 characters');
  });
});
