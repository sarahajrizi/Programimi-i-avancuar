const express = require('express');
const router = express.Router();
const {
  register,
  getUser,
  getCurrentUser,
  updateUserDetails
} = require('../controllers/userController');
const authenticate = require('../middleware/authMiddleware');

// POST /users - Regjistro përdorues
router.post('/', register);

// GET /users/:id - Merr përdoruesin sipas ID (autentikim kërkohet)
router.get('/:id', authenticate, getUser);

// PUT /users/:id - Përditëso të dhënat (autentikim kërkohet)
router.put('/:id', authenticate, updateUserDetails);

// GET /users/me - Merr profilin e përdoruesit aktual
router.get('/me', authenticate, getCurrentUser);

module.exports = router;
