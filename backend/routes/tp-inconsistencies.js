// routes/tp-inconsistencies.js
const express = require('express');
const router = express.Router();
const tpInconsistenciesController = require('../controllers/TPInconsistenciesController');

// Rota para obter todas as TP Inconsistencies
router.get('/', tpInconsistenciesController.getAllTPInconsistencies);

// Rota para obter uma TP Inconsistency por ID
router.get('/:id', tpInconsistenciesController.getTPInconsistencyById);

// Rota para criar uma nova TP Inconsistency
router.post('/', tpInconsistenciesController.createTPInconsistency);

// Rota para atualizar uma TP Inconsistency existente
router.put('/:id', tpInconsistenciesController.updateTPInconsistency);

// Rota para deletar uma TP Inconsistency
router.delete('/:id', tpInconsistenciesController.deleteTPInconsistency);

module.exports = router;
