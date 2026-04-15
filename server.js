const express = require('express');
require('dotenv').config();

const app = express();
const pool = require('./db');

const rotaTutores = require('./routes/tutores');
const rotaAnimais = require('./routes/animais');
const rotaConsultas = require('./routes/consultas');

app.use(express.json());

app.use('/tutores', rotaTutores);
app.use('/animais', rotaAnimais);
app.use('/consultas', rotaConsultas);

app.get('/', async (req, res) => {
  try {
    const resultado = await pool.query('SELECT NOW()');

    res.json({
      mensagem: 'Banco conectado!',
      horario: resultado.rows[0]
    });

  } catch (erro) {
    console.log(erro);

    res.status(500).json({
      erro: 'Falha na conexão com banco'
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});