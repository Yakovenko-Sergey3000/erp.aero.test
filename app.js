import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { db } from "./configs/db.js";
import AuthRoutes from "./modules/auth/auth.routes.js";
import AuthService from "./modules/auth/auth.service.js";
import UserRepository from "./modules/user/user.repo.js";
import TokenRepository from "./modules/token/token.repo.js";
import UserService from "./modules/user/user.service.js";
import TokenService from "./modules/token/token.service.js";
import { setTokenServiceMiddleware } from "./middlewars/set-token-service.middleware.js";

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.set("trust proxy", 1);

const userRepo = new UserRepository(db);
const tokenRepo = new TokenRepository(db);

const userService = new UserService({ userRepository: userRepo });
const tokenService = new TokenService({ tokenRepository: tokenRepo });

const authService = new AuthService({
  userService,
  tokenService,
});

app.use(setTokenServiceMiddleware(tokenService));
app.use("/", new AuthRoutes({ authService }));

export default app;
