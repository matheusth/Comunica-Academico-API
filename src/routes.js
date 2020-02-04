import { Router } from 'express';
import userController from './app/controllers/UserController';
import sessionController from './app/controllers/SessionController';
import authorization from './app/middlewares/authorization';

import groupController from './app/controllers/GroupController';
import './database';
import MessageController from './app/controllers/MessageController';

const routes = new Router();

routes.get('/', (req, res) => {
  res.json();
});
routes.post('/users', userController.store);

routes.post('/sessions', sessionController.store);
routes.use(authorization);
routes.put('/users', userController.update);
routes.post('/groups', groupController.store);
routes.post('/message', MessageController.store);
export default routes;
