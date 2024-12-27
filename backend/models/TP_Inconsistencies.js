// models/TP_Inconsistencies.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TPInconsistencies = sequelize.define('TPInconsistencies', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
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
  tableName: 'tp_inconsistencies',
  timestamps: false,
});

module.exports = TPInconsistencies;
