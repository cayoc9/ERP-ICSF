const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const HospitalSector = sequelize.define('HospitalSector', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    hospitalId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'hospitals',
        key: 'id'
      }
    },
    sectorTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'sector_types',
        key: 'id'
      }
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'HospitalSector',
    tableName: 'hospital_sectors',
    timestamps: true
  });

  return HospitalSector;
};
