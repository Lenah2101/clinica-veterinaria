const express = require('express');
const router = express.Router();
const pool = require('../db');


async function listarConsultasHNG(req, res) {
  try {
    const resultado = await pool.query(
      'SELECT * FROM consultas ORDER BY id'
    );

    res.json(resultado.rows);

  } catch (erro) {
    res.status(500).json({
      erro: 'Erro ao listar consultas'
    });
  }
}


async function buscarConsultaHNG(req, res) {
  try {
    const { id } = req.params;

    const resultado = await pool.query(
      'SELECT * FROM consultas WHERE id = $1',
      [id]
    );

    res.json(resultado.rows[0]);

  } catch (erro) {
    res.status(500).json({
      erro: 'Erro ao buscar consulta'
    });
  }
}


async function criarConsultaHNG(req, res) {
  try {
    const {
      animal_id,
      data_consulta,
      motivo,
      diagnostico,
      veterinario
    } = req.body;

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
    res.status(500).json({
      erro: 'Erro ao cadastrar consulta'
    });
  }
}


async function atualizarConsultaHNG(req, res) {
  try {
    const { id } = req.params;

    const {
      animal_id,
      data_consulta,
      motivo,
      diagnostico,
      veterinario
    } = req.body;

    const resultado = await pool.query(
      `UPDATE consultas
       SET animal_id=$1,
           data_consulta=$2,
           motivo=$3,
           diagnostico=$4,
           veterinario=$5
       WHERE id=$6
       RETURNING *`,
      [
        animal_id,
        data_consulta,
        motivo,
        diagnostico,
        veterinario,
        id
      ]
    );

    res.json(resultado.rows[0]);

  } catch (erro) {
    res.status(500).json({
      erro: 'Erro ao atualizar consulta'
    });
  }
}


async function deletarConsultaHNG(req, res) {
  try {
    const { id } = req.params;

    await pool.query(
      'DELETE FROM consultas WHERE id = $1',
      [id]
    );

    res.json({
      mensagem: 'Consulta removida com sucesso'
    });

  } catch (erro) {
    res.status(500).json({
      erro: 'Erro ao remover consulta'
    });
  }
}


router.get('/', listarConsultasHNG);
router.get('/:id', buscarConsultaHNG);
router.post('/', criarConsultaHNG);
router.put('/:id', atualizarConsultaHNG);
router.delete('/:id', deletarConsultaHNG);

module.exports = router;