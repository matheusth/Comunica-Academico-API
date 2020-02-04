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
    const schema = yup.object().shape({
      name: yup.string(),
      email: yup.string().email(),
      password: yup.string().min(8),
      oldPassword: yup
        .string()
        .when(['password', 'email'], (password, email, field) =>
          password || email ? field.required() : field,
        ),
    });
    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ errorCode: -7, errorMessage: 'Invalid request' });
    }
    if (req.body.id) {
      return res
        .status(400)
        .json({ errorCode: -7, errorMessage: 'Invalid request' });
    }
    const user = await User.findOne({
      where: { id: req.userId },
      include: Group,
    });
    const { oldPassword } = req.body;
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.json({
        errorCode: -2,
        errorMessage: 'Password does not match',
      });
    }
    user.update(req.body);
    return res.json({ user });
  }
}
export default new UserController();
