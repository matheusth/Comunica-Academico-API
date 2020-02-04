import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';
import User from '../models/User';
import Group from '../models/Group';

export default async (req, res, next) => {
  if (!req.headers.authorization) {
    return res
      .status(401)
      .json({ errorCode: '-3', errorMessage: 'Token not provided' });
  }
  const [, token] = req.headers.authorization.split(' ');
  try {
    const decodedToken = await jwt.verify(token, authConfig.key);
    req.userId = decodedToken.id;
    const user = await User.findOne({
      where: { id: req.userId },
      attributes: ['id'],
      include: [{ model: Group, attributes: ['id'] }],
    });
    console.log(user.Group.id);
    if (user.Group.id !== 1 && req.method === 'POST') {
      return res.json({
        errorCode: -5,
        errorMessage: 'You have no permission',
      });
    }
    return next();
  } catch (err) {
    console.log(err);
    return res
      .status(401)
      .json({ errorCode: '-4', errorMessage: 'Token invalid' });
  }
};
