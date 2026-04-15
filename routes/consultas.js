
const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
  try {
    const resultado = await pool.query('SELECT * FROM consultas ORDER BY id');
    res.json(resultado.rows);
  } catch (erro) {
    console.log(erro);
    res.status(500).json({ erro: 'Erro ao listar consultas' });
  }
});

router.post('/', async (req, res) => {
  try {
    const dados = req.body || {};

    const {
      animal_id,
      data_consulta,
      motivo,
      diagnostico,
      veterinario
    } = dados;

    const resultado = await pool.query(
      `INSERT INTO consultas
      (animal_id, data_consulta, motivo, diagnostico, veterinario)
      VALUES ($1,$2,$3,$4,$5)
      RETURNING *`,
      [animal_id, data_consulta, motivo, diagnostico, veterinario]
    );

    res.status(201).json(resultado.rows[0]);

  } catch (erro) {
    console.log(erro);
    res.status(500).json({ erro: 'Erro ao cadastrar consulta' });
  }
});

module.exports = router;