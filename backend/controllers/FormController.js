// controllers/FormController.js
const { Form, Failure, TPInconsistencies, Responsible, Hospital, Sector, sequelize } = require('../models');

exports.createFormWithFailures = async (req, res) => {
  const { description, createUser, failures } = req.body;
  
  const transaction = await sequelize.transaction();

  try {
    // Validações iniciais
    if (!description || !createUser) {
      throw new Error('Campos "description" e "createUser" são obrigatórios.');
    }

    if (!Array.isArray(failures) || failures.length === 0) {
      throw new Error('O campo "failures" deve ser um array com pelo menos uma falha.');
    }

    // Criar o Form
    const newForm = await Form.create(
      { description, createUser },
      { transaction }
    );

    // Iterar sobre as falhas
    for (const failureData of failures) {
      const {
        prontuarioCode,
        formularioDate,
        professionalId,
        hospitalId,
        sectorId,
        status,
        observacoes,
        tpInconsistenciaIds, // Array de IDs de TPInconsistencies
      } = failureData;

      // Validações de cada falha
      if (
        !prontuarioCode ||
        !professionalId ||
        !hospitalId ||
        !sectorId ||
        !status ||
        !Array.isArray(tpInconsistenciaIds) ||
        tpInconsistenciaIds.length === 0
      ) {
        throw new Error('Cada falha deve ter "prontuarioCode", "professionalId", "hospitalId", "sectorId", "status" e pelo menos uma "tpInconsistenciaId".');
      }

      // Verificar se os IDs referenciados existem
      const [responsible, hospital, sector] = await Promise.all([
        Responsible.findByPk(professionalId, { transaction }),
        Hospital.findByPk(hospitalId, { transaction }),
        Sector.findByPk(sectorId, { transaction }),
      ]);

      if (!responsible) {
        throw new Error(`Responsible com ID ${professionalId} não encontrado.`);
      }

      if (!hospital) {
        throw new Error(`Hospital com ID ${hospitalId} não encontrado.`);
      }

      if (!sector) {
        throw new Error(`Sector com ID ${sectorId} não encontrado.`);
      }

      // Verificar se todas as TPInconsistencies existem
      const tpInconsistencies = await TPInconsistencies.findAll({
        where: { id: tpInconsistenciaIds },
        transaction,
      });

      if (tpInconsistencies.length !== tpInconsistenciaIds.length) {
        throw new Error('Algumas TPInconsistencies fornecidas não foram encontradas.');
      }

      // Criar a falha
      const newFailure = await Failure.create(
        {
          prontuarioCode,
          formularioId: newForm.id,
          formularioDate,
          professionalId,
          hospitalId,
          sectorId,
          status,
          observacoes,
          createUser,
        },
        { transaction }
      );

      // Associar as TPInconsistencies
      await newFailure.addTpInconsistencies(tpInconsistencies, { transaction });
    }

    // Commit da transação
    await transaction.commit();

    // Retornar o Form com as falhas e suas inconsistências
    const formWithFailures = await Form.findByPk(newForm.id, {
      include: [{
        model: Failure,
        as: 'failures',
        include: [{
          model: TPInconsistencies,
          as: 'tpInconsistencies',
          through: { attributes: [] },
        }],
      }],
    });

    res.status(201).json(formWithFailures);

  } catch (error) {
    // Rollback da transação em caso de erro
    await transaction.rollback();
    console.error('Erro ao criar o formulário com falhas:', error);
    res.status(500).json({ message: 'Erro ao criar o formulário e as falhas.', error: error.message });
  }
};
