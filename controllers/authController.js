const pool = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);

  await pool.query(
    'INSERT INTO users (name,email,password) VALUES ($1,$2,$3)',
    [name, email, hash]
  );

  res.json({ message: 'Usuário criado' });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await pool.query('SELECT * FROM users WHERE email=$1', [email]);

  if (!user.rows[0]) return res.sendStatus(401);

  const valid = await bcrypt.compare(password, user.rows[0].password);
  if (!valid) return res.sendStatus(401);

  const token = jwt.sign(
    { id: user.rows[0].id, role: user.rows[0].role },
    process.env.JWT_SECRET
  );

  res.json({ token });
};
