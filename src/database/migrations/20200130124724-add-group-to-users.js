module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'group_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: { model: 'groups', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'group_id');
  },
};
