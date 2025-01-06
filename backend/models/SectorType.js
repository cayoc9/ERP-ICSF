const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SectorType = sequelize.define('SectorType', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'sector_types',
  timestamps: true,
});

module.exports = SectorType;
