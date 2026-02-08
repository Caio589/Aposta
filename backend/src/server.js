require('dotenv').config();
const express = require('express');

const authRoutes = require('./routes/authRoutes');
const betRoutes = require('./routes/betRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/bet', betRoutes);
app.use('/admin', adminRoutes);

app.listen(3000, () => {
  console.log('🚀 Plataforma rodando na porta 3000');
});
