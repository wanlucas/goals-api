/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.createTable('TaskDay', {
      taskId: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'Task',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      day: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
      }
    });
  },

  async down (queryInterface) {
    queryInterface.dropTable('TaskDay');
  }
};
