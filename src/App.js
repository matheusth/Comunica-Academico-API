import express from 'express';
import routes from './routes';

class App {
  constructor() {
    this.server = express();
    this.loadMiddlewares();
    this.loadRoutes();
  }

  loadMiddlewares() {
    this.server.use(express.json());
  }

  loadRoutes() {
    this.server.use(routes);
  }
}
export default new App().server;
