'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Failures', {
      fields: ['formularioId'],
      type: 'unique',
      name: 'failures_formularioId_unique'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Failures', 'failures_formularioId_unique');
  }
};
