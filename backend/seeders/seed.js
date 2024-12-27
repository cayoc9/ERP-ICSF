// seed.js
require('dotenv').config();
const { sequelize, HospitalGroup, Hospital, Sector, Responsible, Form, TPInconsistencies, Indicator, Failure } = require('../models');

async function seed() {
  const transaction = await sequelize.transaction();
  try {
    // Conectar ao banco de dados
    await sequelize.authenticate();
    console.log('Conectado ao banco de dados.');

    // Sincronizar os modelos sem recriar tabelas (force: false)
    await sequelize.sync({ force: false, transaction });
    console.log('Modelos sincronizados.');

    // 1. Hospital Groups
    const hospitalGroups = await HospitalGroup.bulkCreate([
      { description: 'Grupo A' },
      { description: 'Grupo B' },
    ], { returning: true, transaction });
    console.log('Dados inseridos em HospitalGroups.');

    // 2. Hospitals
    const hospitals = await Hospital.bulkCreate([
      { name: 'Hospital Central', address: 'Rua Principal, 123', groupId: hospitalGroups[0].id },
      { name: 'Hospital das Clínicas', address: 'Av. Secundária, 456', groupId: hospitalGroups[1].id },
    ], { returning: true, transaction });
    console.log('Dados inseridos em Hospitals.');

    // 3. Sectors
    const sectors = await Sector.bulkCreate([
      { name: 'Setor de Emergência', hospitalId: hospitals[0].id },
      { name: 'Setor de Radiologia', hospitalId: hospitals[1].id },
    ], { returning: true, transaction });
    console.log('Dados inseridos em Sectors.');

    // 4. Responsibles
    const responsibles = await Responsible.bulkCreate([
      { name: 'Dr. João Silva', email: 'joao.silva@hospital.com' },
      { name: 'Dra. Maria Souza', email: 'maria.souza@hospital.com' },
    ], { returning: true, transaction });
    console.log('Dados inseridos em Responsibles.');

    // 5. Forms
    const forms = await Form.bulkCreate([
      { description: 'Formulário de Admissão' },
      { description: 'Formulário de Alta' },
    ], { returning: true, transaction });
    console.log('Dados inseridos em Forms.');

    // 6. TPInconsistencies
    const tpInconsistencies = await TPInconsistencies.bulkCreate([
      { description: 'Dados Incompletos', status: true },
      { description: 'Informação Duplicada', status: true },
    ], { returning: true, transaction });
    console.log('Dados inseridos em TPInconsistencies.');

    // 7. Indicators
    await Indicator.bulkCreate([
      { name: 'Tempo médio de espera', value: 30.0, description: 'Tempo médio que os pacientes esperam', status: true },
      { name: 'Taxa de ocupação de leitos', value: 85.0, description: 'Percentual de ocupação dos leitos disponíveis', status: true },
    ], { transaction });
    console.log('Dados inseridos em Indicators.');

    // 8. Failures
    await Failure.bulkCreate([
      { 
        description: 'Erro de registro de paciente', // Adicionado
        prontuarioCode: '123456', // Agora STRING
        formularioId: forms[0].id,
        formularioDate: new Date(), // DATE
        inconsistencyId: tpInconsistencies[0].id,
        professionalId: responsibles[0].id,
        hospitalId: hospitals[0].id,
        sectorId: sectors[0].id,
        status: 'Open',
        createDate: new Date(),
        createUser: responsibles[0].id,
        updateDate: null,
        updateUser: null,
      },
      { 
        description: 'Falha na impressão de relatório', // Adicionado
        prontuarioCode: '654321', // Agora STRING
        formularioId: forms[1].id,
        formularioDate: new Date(), // DATE
        inconsistencyId: tpInconsistencies[1].id,
        professionalId: responsibles[1].id,
        hospitalId: hospitals[1].id,
        sectorId: sectors[1].id,
        status: 'Open',
        createDate: new Date(),
        createUser: responsibles[1].id,
        updateDate: null,
        updateUser: null,
      },
    ], { transaction });
    console.log('Dados inseridos em Failures.');

    // Commit da transação
    await transaction.commit();
    console.log('Seeding concluído com sucesso.');
    process.exit(0);
  } catch (error) {
    // Rollback da transação em caso de erro
    await transaction.rollback();
    console.error('Erro durante o seeding:', error);
    process.exit(1);
  }
}

seed();
