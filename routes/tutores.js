const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
  try {
    const resultado = await pool.query('SELECT * FROM tutores ORDER BY id');

    res.json(resultado.rows);
  } catch (erro) {
    console.log(erro);
    res.status(500).json({ erro: 'Erro ao buscar tutores' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { nome, telefone, email } = req.body;

    const resultado = await pool.query(
      'INSERT INTO tutores (nome, telefone, email) VALUES ($1, $2, $3) RETURNING *',
      [nome, telefone, email]
    );

    res.status(201).json(resultado.rows[0]);

  } catch (erro) {
    console.log(erro);
    res.status(500).json({ erro: 'Erro ao cadastrar tutor' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const resultado = await pool.query(
      'SELECT * FROM tutores WHERE id = $1',
      [id]
    );

    res.json(resultado.rows[0]);

  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao buscar tutor' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, telefone, email } = req.body;

    const resultado = await pool.query(
      'UPDATE tutores SET nome=$1, telefone=$2, email=$3 WHERE id=$4 RETURNING *',
      [nome, telefone, email, id]
    );

    res.json(resultado.rows[0]);

  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao atualizar tutor' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      'DELETE FROM tutores WHERE id = $1',
      [id]
    );

    res.json({ mensagem: 'Tutor removido com sucesso' });

  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao remover tutor' });
  }
});

module.exports = router;