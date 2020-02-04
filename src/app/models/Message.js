import { Model, Sequelize } from 'sequelize';

class Message extends Model {
  static init(sequelize) {
    super.init(
      {
        subject: Sequelize.STRING,
        content: Sequelize.STRING,
      },
      { sequelize },
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'sender', as: 'sender' });
    this.belongsTo(models.User, { foreignKey: 'receiver', as: 'receiver' });
  }
}
export default Message;
