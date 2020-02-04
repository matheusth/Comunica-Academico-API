import { Model, Sequelize } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        phone: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
      },
      { sequelize },
    );
    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 2);
      }
    });
    return this;
  }

  async checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }

  static associate(models) {
    this.belongsTo(models.Group, { foreignKey: 'group_id' });
    this.hasMany(models.Message, { foreignKey: 'sender', as: 'senderUser' });
    this.hasMany(models.Message, {
      foreignKey: 'receiver',
      as: 'receiverUser',
    });
  }
}
export default User;
