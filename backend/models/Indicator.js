// models/Indicator.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Indicator = sequelize.define('Indicator', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  name: { // name
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  value: { // value
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  description: { // description
    type: DataTypes.TEXT,
    allowNull: true,
  },
  status: { // status
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true, // Active
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
  tableName: 'indicators',
  timestamps: false,
});

module.exports = Indicator;
