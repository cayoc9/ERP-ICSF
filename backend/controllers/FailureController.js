// controllers/failureController.js
const { Failure, Form, TPInconsistencies, Responsible, Hospital, Sector } = require('../models');

// Obter todas as falhas
exports.getAllFailures = async (req, res) => {
  try {
    const failures = await Failure.findAll({
      include: [
        { model: Form, as: 'formulario' },
        { model: TPInconsistencies, as: 'tpInconsistencies', through: { attributes: [] } },
        { model: Responsible, as: 'responsible' },
        { model: Hospital, as: 'hospital' },
        { model: Sector, as: 'sector' }
      ],
    });
    res.status(200).json(failures);
  } catch (error) {
    console.error('Erro ao obter as falhas:', error);
    res.status(500).json({ message: 'Erro ao obter as falhas.', error });
  }
};

// Obter uma falha por ID
exports.getFailureById = async (req, res) => {
  const { id } = req.params;
  try {
    const failure = await Failure.findByPk(id, {
      include: [
        { model: Form, as: 'formulario' },
        { model: TPInconsistencies, as: 'tpInconsistencies', through: { attributes: [] } },
        { model: Responsible, as: 'responsible' },
        { model: Hospital, as: 'hospital' },
        { model: Sector, as: 'sector' }
      ],
    });
    if (failure) {
      res.status(200).json(failure);
    } else {
      res.status(404).json({ message: 'Falha não encontrada.' });
    }
  } catch (error) {
    console.error('Erro ao obter a falha:', error);
    res.status(500).json({ message: 'Erro ao obter a falha.', error });
  }
};

// Criar uma nova falha
exports.createFailure = async (req, res) => {
  const { prontuarioCode, formularioId, formularioDate, tpInconsistenciaIds, professionalId, hospitalId, sectorId, status, createUser, observacoes } = req.body;
  const transaction = await sequelize.transaction();
  
  try {
    // Validações
    if (!prontuarioCode || !formularioId || !professionalId || !hospitalId || !sectorId || !status || !Array.isArray(tpInconsistenciaIds) || tpInconsistenciaIds.length === 0) {
      throw new Error('Campos obrigatórios faltando ou inconsistências inválidas.');
    }

    // Criar a falha
    const newFailure = await Failure.create({
      prontuarioCode,
      formularioId,
      formularioDate,
      professionalId,
      hospitalId,
      sectorId,
      status,
      observacoes,
      createUser,
      inconsistencyId: tpInconsistenciaIds[0], // Adiciona o primeiro ID como principal
    }, { transaction });

    // Associar as TPInconsistencies
    const tpInconsistencies = await TPInconsistencies.findAll({
      where: { id: tpInconsistenciaIds },
      transaction,
    });

    if (tpInconsistencies.length !== tpInconsistenciaIds.length) {
      throw new Error('Algumas TPInconsistencies fornecidas não foram encontradas.');
    }

    await newFailure.addTpInconsistencies(tpInconsistencies, { transaction });

    // Commit da transação
    await transaction.commit();

    // Recarregar a falha com as associações
    const failureWithAssociations = await Failure.findByPk(newFailure.id, {
      include: [
        { model: Form, as: 'formulario' },
        { model: TPInconsistencies, as: 'tpInconsistencies', through: { attributes: [] } },
        { model: Responsible, as: 'responsible' },
        { model: Hospital, as: 'hospital' },
        { model: Sector, as: 'sector' }
      ],
    });

    res.status(201).json(failureWithAssociations);

  } catch (error) {
    await transaction.rollback();
    console.error('Erro ao criar a falha:', error);
    res.status(500).json({ message: 'Erro ao criar a falha.', error: error.message });
  }
};

// Atualizar uma falha existente
exports.updateFailure = async (req, res) => {
  const { id } = req.params;
  const { prontuarioCode, formularioId, formularioDate, tpInconsistenciaIds, professionalId, hospitalId, sectorId, status, updateUser, observacoes } = req.body;
  const transaction = await sequelize.transaction();

  try {
    const failure = await Failure.findByPk(id, { transaction });
    if (!failure) {
      return res.status(404).json({ message: 'Falha não encontrada.' });
    }

    // Atualizar campos
    await failure.update(
      {
        prontuarioCode,
        formularioId,
        formularioDate,
        professionalId,
        hospitalId,
        sectorId,
        status,
        updateUser,
        observacoes,
      },
      { transaction }
    );

    // Atualizar associações de TPInconsistencies
    if (Array.isArray(tpInconsistenciaIds)) {
      const tpInconsistencies = await TPInconsistencies.findAll({
        where: { id: tpInconsistenciaIds },
        transaction,
      });

      if (tpInconsistencies.length !== tpInconsistenciaIds.length) {
        throw new Error('Algumas TPInconsistencies fornecidas não foram encontradas.');
      }

      await failure.setTpInconsistencies(tpInconsistencies, { transaction });
    }

    // Commit da transação
    await transaction.commit();

    // Recarregar a falha com as associações atualizadas
    const updatedFailure = await Failure.findByPk(id, {
      include: [
        { model: Form, as: 'formulario' },
        { model: TPInconsistencies, as: 'tpInconsistencies', through: { attributes: [] } },
        { model: Responsible, as: 'responsible' },
        { model: Hospital, as: 'hospital' },
        { model: Sector, as: 'sector' }
      ],
    });

    res.status(200).json(updatedFailure);

  } catch (error) {
    await transaction.rollback();
    console.error('Erro ao atualizar a falha:', error);
    res.status(500).json({ message: 'Erro ao atualizar a falha.', error: error.message });
  }
};

// Deletar uma falha
exports.deleteFailure = async (req, res) => {
  const { id } = req.params;
  try {
    const failure = await Failure.findByPk(id);
    if (failure) {
      await failure.destroy();
      res.status(200).json({ message: 'Falha deletada com sucesso.' });
    } else {
      res.status(404).json({ message: 'Falha não encontrada.' });
    }
  } catch (error) {
    console.error('Erro ao deletar a falha:', error);
    res.status(500).json({ message: 'Erro ao deletar a falha.', error });
  }
};
