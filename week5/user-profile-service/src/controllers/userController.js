const {
    createUser,
    getUserById,
    updateUser
  } = require('../services/userService');
  const { userSchema } = require('../utils/validation');
  
  const register = async (req, res) => {
    const { error } = userSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
  
    try {
      const user = await createUser(req.body);
      res.status(201).json(user);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  
  const getUser = (req, res) => {
    const user = getUserById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
  
    const { password, ...safeUser } = user;
    res.status(200).json(safeUser);
  };
  
  const getCurrentUser = (req, res) => {
    const user = getUserById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
  
    const { password, ...safeUser } = user;
    res.status(200).json(safeUser);
  };
  
  const updateUserDetails = (req, res) => {
    const user = updateUser(req.params.id, req.body);
    if (!user) return res.status(404).json({ error: 'User not found' });
  
    const { password, ...safeUser } = user;
    res.status(200).json(safeUser);
  };
  
  module.exports = {
    register,
    getUser,
    getCurrentUser,
    updateUserDetails
  };
  