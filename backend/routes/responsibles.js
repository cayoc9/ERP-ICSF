// routes/responsibles.js
const express = require('express');
const router = express.Router();
const responsibleController = require('../controllers/ResponsibleController.js');

// Rota para obter todos os responsibles
router.get('/', responsibleController.getAllResponsibles);

// Rota para obter um responsible por ID
router.get('/:id', responsibleController.getResponsibleById);

// Rota para criar um novo responsible
router.post('/', responsibleController.createResponsible);

// Rota para atualizar um responsible existente
router.put('/:id', responsibleController.updateResponsible);

// Rota para deletar um responsible
router.delete('/:id', responsibleController.deleteResponsible);

module.exports = router;
