// models/index.js
const { Sequelize } = require('sequelize');
const config = require('../config/database');

const sequelize = new Sequelize(config);

// Importação dos modelos
const Hospital = require('./Hospital')(sequelize);
const Sector = require('./Sector');
const Responsible = require('./Responsible');
const Failure = require('./Failure');
const Form = require('./Form');
const TPInconsistencies = require('./TP_Inconsistencies');
const FailureTPInconsistencies = require('./FailureTP_Inconsistencies');
const Indicator = require('./Indicator');
const HospitalGroup = require('./HospitalGroup');
const SectorType = require('./SectorType')(sequelize);
const HospitalSector = require('./HospitalSector')(sequelize);

// Definição das associações

// 1. Relações de HospitalGroup e Hospital
HospitalGroup.hasMany(Hospital, { foreignKey: 'groupId', as: 'hospitals' });
Hospital.belongsTo(HospitalGroup, { foreignKey: 'groupId', as: 'hospitalGroup' });

// 2. Relações de Hospital e Sector
Hospital.hasMany(Sector, { foreignKey: 'hospitalId', as: 'sectors' });
Sector.belongsTo(Hospital, { foreignKey: 'hospitalId', as: 'hospital' });

// 3. Relações de Sector e Failure
Sector.hasMany(Failure, { foreignKey: 'sectorId', as: 'failures' });
Failure.belongsTo(Sector, { foreignKey: 'sectorId', as: 'sector' });

// 4. Relações de Responsible e Failure
Responsible.hasMany(Failure, { foreignKey: 'professionalId', as: 'failures' });
Failure.belongsTo(Responsible, { foreignKey: 'professionalId', as: 'responsible' });

// 5. Relações de Form e Failure (alterando para 1:1)
Form.hasOne(Failure, { foreignKey: 'formularioId', as: 'failure' });
Failure.belongsTo(Form, { foreignKey: 'formularioId', as: 'formulario' });

// 6. Relação Muitos-para-Muitos entre Failure e TPInconsistencies via FailureTPInconsistencies
Failure.belongsToMany(TPInconsistencies, {
  through: FailureTPInconsistencies,
  foreignKey: 'failureId',
  otherKey: 'tpInconsistencyId',
  as: 'tpInconsistencies',
});

TPInconsistencies.belongsToMany(Failure, {
  through: FailureTPInconsistencies,
  foreignKey: 'tpInconsistencyId',
  otherKey: 'failureId',
  as: 'failures',
});

// Relações Many-to-Many entre Hospital e SectorType
Hospital.belongsToMany(SectorType, {
  through: HospitalSector,
  foreignKey: 'hospitalId',
  otherKey: 'sectorTypeId'
});

SectorType.belongsToMany(Hospital, {
  through: HospitalSector,
  foreignKey: 'sectorTypeId',
  otherKey: 'hospitalId'
});

// Relação entre HospitalSector e Failure
HospitalSector.hasMany(Failure, {
  foreignKey: 'hospitalSectorId',
  as: 'failures'
});

Failure.belongsTo(HospitalSector, {
  foreignKey: 'hospitalSectorId',
  as: 'hospitalSector'
});

// Exportação dos modelos e da instância do Sequelize
module.exports = {
  sequelize,
  Sequelize,
  Hospital,
  Sector,
  Responsible,
  Failure,
  Form,
  TPInconsistencies,
  FailureTPInconsistencies,
  Indicator,
  HospitalGroup,
  SectorType,
  HospitalSector,
};
