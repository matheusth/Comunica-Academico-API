import { Model, Sequelize } from 'sequelize';

class Group extends Model {
  static init(sequelize) {
    super.init(
      {
        description: Sequelize.STRING,
      },
      { sequelize },
    );
  }

  static associate(models) {
    this.hasMany(models.User, { foreignKey: 'group_id' });
  }
}
export default Group;
