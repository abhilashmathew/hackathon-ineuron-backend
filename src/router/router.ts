import { Router } from "express";

export default interface BaseRouter {
  path: string;
  router: Router;
}
