import { Router, Request, Response } from 'express';
import App from '../app';

export default interface BaseRouter {
  path: string;
  router: Router;
}

export class InitialRouter implements BaseRouter {
  constructor() {
    this.router = Router();
    this.initRoutes();
  }
  path = '/';
  router: Router;
  private initRoutes(): void {
    this.router.get(this.path, (req: Request, res: Response) => {
      const paths: string[] = [];
      App.routers.forEach(ctr => {
        paths.push(ctr.path);
      });
      res.send({
        routes: paths,
      });
    });
    this.router.get('/health', (req: Request, res: Response) =>
      res.sendStatus(200)
    );
  }
}
