const pool = require('../db');

exports.placeBet = async (req, res) => {
  const { odd_id, amount } = req.body;

  const odd = await pool.query(
    'SELECT odd FROM odds WHERE id=$1',
    [odd_id]
  );

  const possible = amount * odd.rows[0].odd;

  await pool.query(
    'INSERT INTO bets (user_id, odd_id, amount, possible_return) VALUES ($1,$2,$3,$4)',
    [req.user.id, odd_id, amount, possible]
  );

  await pool.query(
    'UPDATE users SET balance = balance - $1 WHERE id=$2',
    [amount, req.user.id]
  );

  res.json({ message: 'Aposta realizada', possible });
};
