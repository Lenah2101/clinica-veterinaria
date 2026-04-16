const express = require('express');
require('dotenv').config();

const app = express();

const rotaTutoresHNG = require('./routes/tutores');
const rotaAnimaisHNG = require('./routes/animais');
const rotaConsultasHNG = require('./routes/consultas');

const sequelize = require('./config/database');

app.use(express.json());
app.use('/tutores', rotaTutoresHNG);
app.use('/animais', rotaAnimaisHNG);
app.use('/consultas', rotaConsultasHNG);

app.get('/', async (req, res) => {
  res.json({
    mensagem: 'API Clínica Veterinária com ORM funcionando!'
  });
});

sequelize.authenticate()
  .then(() => {
    console.log('ORM conectado ao PostgreSQL!');
  })
  .catch((erro) => {
    console.log('Erro ORM:', erro);
  });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});