// routes/forms.js
const express = require('express');
const router = express.Router();
const formController = require('../controllers/FormController');

// Rota para obter todos os forms
router.get('/', formController.getAllForms);

// Rota para obter um form por ID
router.get('/:id', formController.getFormById);

// Rota para criar um novo form
router.post('/', formController.createForm);

// Rota para criar um form com múltiplas falhas
router.post('/with-failures', formController.createFormWithFailures);

// Rota para atualizar um form existente
router.put('/:id', formController.updateForm);

// Rota para deletar um form
router.delete('/:id', formController.deleteForm);

module.exports = router;
