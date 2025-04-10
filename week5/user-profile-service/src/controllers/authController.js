const jwt = require('jsonwebtoken');
const { getUserByEmail } = require('../services/userService');
const { verifyPassword } = require('../utils/passwordUtils');
const { loginSchema } = require('../utils/validation');

const JWT_SECRET = 'sekret-shume-i-fshehte'; // për testim, në prodhim vendoset në .env

const login = async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { email, password } = req.body;
  const user = getUserByEmail(email);

  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const valid = await verifyPassword(password, user.password);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

  user.lastLogin = new Date().toISOString();

  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '24h' });
  return res.status(200).json({ token, userId: user.id });
};

module.exports = { login };
