import App from './app';
import ProductRouter from "./router/product_router";
import UserRouter from "./router/user_router";
import dotenv from "dotenv";
import { TokensRouter } from "./router/tokens_router";
dotenv.config();

const app = new App({
  appRouters: [new ProductRouter(), new UserRouter(), new TokensRouter()],
  mongoUri: process.env.MONGO_URI as string,
  port: Number.parseInt((process.env.PORT ?? 1377 )as string),
  version: "/v1",
});

app.listen();
