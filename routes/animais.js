const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
  try {
    const resultado = await pool.query(
      'SELECT * FROM animais ORDER BY id'
    );

    res.json(resultado.rows);

  } catch (erro) {
    console.log(erro);
    res.status(500).json({ erro: 'Erro ao listar animais' });
  }
});


router.get('/:id/consultas', async (req, res) => {
  try {
    const { id } = req.params;

    const resultado = await pool.query(
      `SELECT 
        animais.nome AS animal,
        consultas.id,
        consultas.data_consulta,
        consultas.motivo,
        consultas.diagnostico,
        consultas.veterinario
      FROM consultas
      JOIN animais 
        ON consultas.animal_id = animais.id
      WHERE animais.id = $1
      ORDER BY consultas.id`,
      [id]
    );

    res.json(resultado.rows);

  } catch (erro) {
    console.log(erro);
    res.status(500).json({
      erro: 'Erro ao buscar consultas do animal'
    });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const resultado = await pool.query(
      'SELECT * FROM animais WHERE id = $1',
      [id]
    );

    res.json(resultado.rows[0]);

  } catch (erro) {
    console.log(erro);
    res.status(500).json({ erro: 'Erro ao buscar animal' });
  }
});


router.post('/', async (req, res) => {
  try {
    const {
      nome,
      especie,
      raca,
      data_nascimento,
      tutor_id
    } = req.body;

    const resultado = await pool.query(
      `INSERT INTO animais
      (nome, especie, raca, data_nascimento, tutor_id)
      VALUES ($1,$2,$3,$4,$5)
      RETURNING *`,
      [nome, especie, raca, data_nascimento, tutor_id]
    );

    res.status(201).json(resultado.rows[0]);

  } catch (erro) {
    console.log(erro);
    res.status(500).json({ erro: 'Erro ao cadastrar animal' });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const {
      nome,
      especie,
      raca,
      data_nascimento,
      tutor_id
    } = req.body;

    const resultado = await pool.query(
      `UPDATE animais
      SET nome=$1,
          especie=$2,
          raca=$3,
          data_nascimento=$4,
          tutor_id=$5
      WHERE id=$6
      RETURNING *`,
      [nome, especie, raca, data_nascimento, tutor_id, id]
    );

    res.json(resultado.rows[0]);

  } catch (erro) {
    console.log(erro);
    res.status(500).json({ erro: 'Erro ao atualizar animal' });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      'DELETE FROM animais WHERE id = $1',
      [id]
    );

    res.json({
      mensagem: 'Animal removido com sucesso'
    });

  } catch (erro) {
    console.log(erro);
    res.status(500).json({ erro: 'Erro ao remover animal' });
  }
});

module.exports = router;