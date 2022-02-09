import express, { Application } from "express";
import mongoose from "mongoose";

import BaseRouter from "./router/router";
import errorMiddleware from "./middlewares/error_middleware";
class App {
  public express: Application;
  /*   3000  */
  public port: number;
  /*   /v1  */
  public version: string;
  constructor({
    appRouters,
    mongoUri,
    port,
    version,
  }: {
    appRouters: BaseRouter[];
    port: number;
    version: string;
    mongoUri: string;
  }) {
    this.express = express();
    this.port = port;
    this.version = version;
    this.initialiseDatabaseConnection(mongoUri);
    this.initialMiddlewares();
    this.initialiseControllers(appRouters);
    this.initialiseErrorHandling();
  }

  private initialMiddlewares() {
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: false }));
  }

  private initialiseControllers(router: BaseRouter[]): void {
    
    router.forEach((controller: BaseRouter) => {
      this.express.use(`/api${this.version}`, controller.router);
    });
  }

  private initialiseErrorHandling(): void {
    this.express.use(errorMiddleware);
  }

  private initialiseDatabaseConnection(mongoUri: string): void {
    // const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH } = process.env;

    mongoose.connect(mongoUri);
  }

  public listen(): void {
    this.express.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}

export default App;
