// controllers/tpInconsistenciesController.js
const { TPInconsistencies, Failure } = require('../models');

// Obter todas as TP Inconsistencies
exports.getAllTPInconsistencies = async (req, res) => {
  try {
    const tpInconsistencies = await TPInconsistencies.findAll({
      include: [{ model: Failure, as: 'failures' }],
    });
    res.status(200).json(tpInconsistencies);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter as TP Inconsistencies.', error });
  }
};

// Obter uma TP Inconsistency por ID
exports.getTPInconsistencyById = async (req, res) => {
  const { id } = req.params;
  try {
    const tpInconsistency = await TPInconsistencies.findByPk(id, {
      include: [{ model: Failure, as: 'failures' }],
    });
    if (tpInconsistency) {
      res.status(200).json(tpInconsistency);
    } else {
      res.status(404).json({ message: 'TP Inconsistency não encontrada.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter a TP Inconsistency.', error });
  }
};

// Criar uma nova TP Inconsistency
exports.createTPInconsistency = async (req, res) => {
  const { description, status, createUser } = req.body;
  try {
    const newTPInconsistency = await TPInconsistencies.create({ description, status, createUser });
    res.status(201).json(newTPInconsistency);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar a TP Inconsistency.', error });
  }
};

// Atualizar uma TP Inconsistency existente
exports.updateTPInconsistency = async (req, res) => {
  const { id } = req.params;
  const { description, status, updateUser } = req.body;
  try {
    const tpInconsistency = await TPInconsistencies.findByPk(id);
    if (tpInconsistency) {
      await tpInconsistency.update({ description, status, updateUser });
      res.status(200).json(tpInconsistency);
    } else {
      res.status(404).json({ message: 'TP Inconsistency não encontrada.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar a TP Inconsistency.', error });
  }
};

// Deletar uma TP Inconsistency
exports.deleteTPInconsistency = async (req, res) => {
  const { id } = req.params;
  try {
    const tpInconsistency = await TPInconsistencies.findByPk(id);
    if (tpInconsistency) {
      await tpInconsistency.destroy();
      res.status(200).json({ message: 'TP Inconsistency deletada com sucesso.' });
    } else {
      res.status(404).json({ message: 'TP Inconsistency não encontrada.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar a TP Inconsistency.', error });
  }
};
