import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import { db } from "./configs/db.ts";
import AuthControllers from "./modules/auth/auth.controllers.ts";
import AuthService from "./modules/auth/auth.service.ts";
import UserRepository from "./modules/user/user.repo.ts";
import TokenRepository from "./modules/token/token.repo.ts";
import UserService from "./modules/user/user.service.ts";
import TokenService from "./modules/token/token.service.ts";
import { errorMiddleware } from "./middlewars/error.middleware.ts";
import { AuthRouter } from "./routes/auth.ts";
import { setTokenServiceMiddleware } from "./middlewars/set-token-service.middleware.ts";
import { setFingerprintMiddleware } from "./middlewars/set-fingerprint.middleware.ts";

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);
app.set("trust proxy", 1);

const uploadsPath = "uploads";
app.use(`/${uploadsPath}`, express.static(uploadsPath));

const userRepo = new UserRepository(db);
const tokenRepo = new TokenRepository(db);

const userService = new UserService({ userRepository: userRepo });
const tokenService = new TokenService({ tokenRepository: tokenRepo });
const authService = new AuthService({ userService, tokenService });

app.use(setTokenServiceMiddleware(tokenService));
app.use(setFingerprintMiddleware);
app.use(AuthRouter({ authController: new AuthControllers({ authService }) }));
app.use(errorMiddleware);

export default app;
