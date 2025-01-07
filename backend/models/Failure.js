// models/Failure.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const failureSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  prontuarioCode: {
    type: DataTypes.STRING,
    allowNull: false
  },
  formularioId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  formularioDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  inconsistencyId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  professionalId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  hospitalId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  sectorId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  createDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  createUser: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  updateDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  updateUser: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  observacoes: {
    type: DataTypes.TEXT,
    allowNull: true
  }
};

const Failure = sequelize.define('Failure', failureSchema, {
  tableName: 'failures',
  timestamps: false,
});

module.exports = Failure;
