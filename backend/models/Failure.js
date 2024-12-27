// models/Failure.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Failure = sequelize.define('Failure', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  prontuarioCode: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  formularioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'forms',
      key: 'id',
    },
  },
  formularioDate: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW,
  },
  professionalId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'responsibles',
      key: 'id',
    },
  },
  hospitalId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'hospitals',
      key: 'id',
    },
  },
  sectorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'sectors',
      key: 'id',
    },
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Aberto',
  },
  observacoes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  createDate: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW,
  },
  createUser: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  updateDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  updateUser: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  tableName: 'failures',
  timestamps: false,
});

module.exports = Failure;
