import User from '../models/User';
import Group from '../models/Group';

class UserController {
  async store(req, res) {
    const user = await User.create(req.body);

    return res.json(user);
  }

  async update(req, res) {
    const user = await User.findOne({
      where: { id: req.userId },
      include: Group,
    });
    user.update(req.body);
    res.json({ user });
  }
}
export default new UserController();
