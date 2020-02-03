import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';

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
    console.log(req.userId);
    return next();
  } catch (err) {
    return res
      .status(401)
      .json({ errorCode: '-4', errorMessage: 'Token invalid' });
  }
};
