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
    type: DataTypes.STRING,
    allowNull: false,
  },
  formularioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  formularioDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  professionalId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  hospitalId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  sectorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  observacoes: { // Adicionando a coluna observacoes
    type: DataTypes.STRING,
    allowNull: true,
  },
  createUser: {
    type: DataTypes.INTEGER,
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
