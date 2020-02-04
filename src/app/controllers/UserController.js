import * as yup from 'yup';
import User from '../models/User';
import Group from '../models/Group';

class UserController {
  async store(req, res) {
    const schema = yup.object().shape({
      id: yup
        .number()
        .integer()
        .positive()
        .integer()
        .required(),
      name: yup.string().required(),
      email: yup
        .string()
        .email()
        .required(),
      password: yup
        .string()
        .required()
        .min(8),
    });
    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ errorCode: -6, errorMessage: 'Input request is invalid' });
    }
    const userExists = await User.findOne({ where: { id: req.body.id } });
    if (userExists) {
      return res
        .status(400)
        .json({ errorCode: -7, errorMessage: 'User already exists' });
    }
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
