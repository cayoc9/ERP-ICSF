const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Responsible extends Model {}

Responsible.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updateDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  modelName: 'Responsible',
  tableName: 'responsibles',
  timestamps: false,
});

module.exports = Responsible;
