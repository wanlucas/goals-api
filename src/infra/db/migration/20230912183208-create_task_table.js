/** @type {import('sequelize-cli').Migration} */
module.exports = {

  async up (queryInterface, Sequelize) {
    queryInterface.createTable('Task', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      days: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      goalId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Goal',
          key: 'id',
        }
      },
      endDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      quantity: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      duration: {
        type: Sequelize.FLOAT,
        allowNull: true,
      }
    });
  },

  async down (queryInterface) {
    queryInterface.dropTable('Task');
  }
};
