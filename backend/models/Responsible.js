// models/Responsible.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Responsible = sequelize.define('Responsible', {
  id: {
    type: DataTypes.INTEGER, // CD_USUARIO
    primaryKey: true,
    autoIncrement: true, // Se `CD_USUARIO` é auto-increment
  },
  name: { // DS_USUARIO
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  createDate: { // CREATE_DATE
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW,
  },
  createUser: { // CREATE_USER
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  updateDate: { // UPDATE_DATE
    type: DataTypes.DATE,
    allowNull: true,
  },
  updateUser: { // UPDATE_USER
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  tableName: 'responsibles', // `usuario_profissional`
  timestamps: false,
});

module.exports = Responsible;
