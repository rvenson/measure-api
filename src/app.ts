import express, { Application } from 'express';
import routes from './routes';
import ErrorHandler from './middlewares/errorHandler';

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
    this.errorHandling();
  }

  private middlewares(): void {
    this.app.use(express.json());
  }

  private routes(): void {
    this.app.use('/api', routes);
  }

  private errorHandling(): void {
    this.app.use(new ErrorHandler().handleError);
  }
}

export default new App().app;