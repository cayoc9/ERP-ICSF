// controllers/FormController.js
const { Form, Failure, TPInconsistencies, Responsible, Hospital, Sector, sequelize } = require('../models');

exports.createFormWithFailures = async (req, res) => {
  const { description, createUser, failure } = req.body; // Alterado de failures para failure
  
  const transaction = await sequelize.transaction();

  try {
    // Validações iniciais
    if (!description || !createUser || !failure) {
      throw new Error('Campos "description", "createUser" e "failure" são obrigatórios.');
    }

    // Criar o Form
    const newForm = await Form.create(
      { description, createUser },
      { transaction }
    );

    const {
      prontuarioCode,
      formularioDate,
      professionalId,
      hospitalId,
      sectorId,
      status,
      observacoes,
      tpInconsistenciaIds,
    } = failure;

    // Validações da falha
    if (!prontuarioCode || !professionalId || !hospitalId || !sectorId || !status || !Array.isArray(tpInconsistenciaIds) || tpInconsistenciaIds.length === 0) {
      throw new Error('Dados da falha incompletos ou inválidos.');
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
    const tpInconsistencies = await TPInconsistencies.findAll({
      where: { id: tpInconsistenciaIds },
      transaction,
    });

    if (tpInconsistencies.length !== tpInconsistenciaIds.length) {
      throw new Error('Algumas TPInconsistencies fornecidas não foram encontradas.');
    }

    await newFailure.setTpInconsistencies(tpInconsistencies, { transaction });
    await transaction.commit();

    // Retornar o Form com a falha e suas inconsistências
    const formWithFailure = await Form.findByPk(newForm.id, {
      include: [{
        model: Failure,
        as: 'failure',
        include: [{
          model: TPInconsistencies,
          as: 'tpInconsistencies',
          through: { attributes: [] },
        }],
      }],
    });

    res.status(201).json(formWithFailure);

  } catch (error) {
    await transaction.rollback();
    console.error('Erro ao criar o formulário com falha:', error);
    res.status(500).json({ message: 'Erro ao criar o formulário e a falha.', error: error.message });
  }
};

exports.getAllForms = async (req, res) => {
  try {
    const forms = await Form.findAll();
    res.status(200).json(forms);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter formulários', error });
  }
};

// Implementar outros métodos
exports.getFormById = async (req, res) => {
  try {
    const form = await Form.findByPk(req.params.id);
    if (form) {
      res.status(200).json(form);
    } else {
      res.status(404).json({ message: 'Formulário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter formulário', error });
  }
};

exports.createForm = async (req, res) => {
  try {
    console.log('Dados recebidos:', req.body);
    const newForm = await Form.create(req.body);
    res.status(201).json(newForm);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar formulário', error });
  }
};

exports.updateForm = async (req, res) => {
  try {
    const [updated] = await Form.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedForm = await Form.findByPk(req.params.id);
      res.status(200).json(updatedForm);
    } else {
      res.status(404).json({ message: 'Formulário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar formulário', error });
  }
};

exports.deleteForm = async (req, res) => {
  try {
    const deleted = await Form.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ message: 'Formulário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar formulário', error });
  }
};
