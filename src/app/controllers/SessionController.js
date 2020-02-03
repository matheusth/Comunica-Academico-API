import jwt from 'jsonwebtoken';
import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const { id, password } = req.body;
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return res
        .status(401)
        .json({ errorCode: -1, errorMessage: 'User does not exists' });
    }
    if (!(await user.checkPassword(password))) {
      return res
        .status(401)
        .json({ errorCode: -2, errorMessage: 'Password does not match' });
    }
    const token = jwt.sign({ id: user.id }, authConfig.key, {
      expiresIn: authConfig.expiresIn,
    });
    return res.json({ token });
  }
}
export default new SessionController();
