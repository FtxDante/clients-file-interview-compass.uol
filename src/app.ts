import 'reflect-metadata';
import express from 'express';
import routes from './routes';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './docs/swagger.json';
import dotenv from 'dotenv';
dotenv.config();
class App {
  private _server;
  constructor() {
    this._server = express();
    this.middlewares();
    this.router();
  }

  private middlewares() {
    this.server.use(express.json());
    this.server.use('/documentation', swaggerUi.serve,
        swaggerUi.setup(swaggerDocs));
  }

  private router() {
    routes(this.server);
  }

  public get server() {
    return this._server;
  }
};

export default new App().server;
