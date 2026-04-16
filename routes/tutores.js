// routes/tutores.js

const express = require('express');
const router = express.Router();

const Tutor = require('../models/Tutor');


async function listarTutoresHNG(req, res) {
  try {
    const dados = await Tutor.findAll();
    res.json(dados);

  } catch (erro) {
    res.status(500).json({
      erro: 'Erro ao listar tutores'
    });
  }
}


async function buscarTutorHNG(req, res) {
  try {
    const dado = await Tutor.findByPk(req.params.id);
    res.json(dado);

  } catch (erro) {
    res.status(500).json({
      erro: 'Erro ao buscar tutor'
    });
  }
}


async function criarTutorHNG(req, res) {
  try {
    const novo = await Tutor.create(req.body);

    res.status(201).json(novo);

  } catch (erro) {
    res.status(500).json({
      erro: 'Erro ao cadastrar tutor'
    });
  }
}


async function atualizarTutorHNG(req, res) {
  try {
    await Tutor.update(req.body, {
      where: { id: req.params.id }
    });

    const atualizado = await Tutor.findByPk(req.params.id);

    res.json(atualizado);

  } catch (erro) {
    res.status(500).json({
      erro: 'Erro ao atualizar tutor'
    });
  }
}


async function deletarTutorHNG(req, res) {
  try {
    await Tutor.destroy({
      where: { id: req.params.id }
    });

    res.json({
      mensagem: 'Tutor removido com sucesso'
    });

  } catch (erro) {
    res.status(500).json({
      erro: 'Erro ao remover tutor'
    });
  }
}


router.get('/', listarTutoresHNG);
router.get('/:id', buscarTutorHNG);
router.post('/', criarTutorHNG);
router.put('/:id', atualizarTutorHNG);
router.delete('/:id', deletarTutorHNG);

module.exports = router;