const pool = require('../db');

exports.resolveBet = async (req, res) => {
  const { bet_id, result } = req.body;

  const bet = await pool.query(
    'SELECT * FROM bets WHERE id=$1',
    [bet_id]
  );

  if (result === 'win') {
    await pool.query(
      'UPDATE users SET balance = balance + $1 WHERE id=$2',
      [bet.rows[0].possible_return, bet.rows[0].user_id]
    );
  }

  await pool.query(
    'UPDATE bets SET status=$1 WHERE id=$2',
    [result, bet_id]
  );

  res.json({ message: 'Aposta resolvida' });
};
