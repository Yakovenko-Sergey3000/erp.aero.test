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
import FileRepository from "./modules/files/file.repo.js";
import FileService from "./modules/files/file.service.js";
import FileRoutes from "./modules/files/file.routes.js";
import { isAuthenticated } from "./middlewars/auth.middleware.js";
import FileUploader from "./libs/file-uploader.js";
import { setTokenServiceMiddleware } from "./middlewars/set-token-service.middleware.js";
import { errorMiddleware } from "./middlewars/error.middleware.js";

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.set("trust proxy", 1);

const uploadsPath = "uploads";
const fileUploader = new FileUploader({ path: uploadsPath });

const userRepo = new UserRepository(db);
const tokenRepo = new TokenRepository(db);
const fileRepo = new FileRepository(db);

const userService = new UserService({ userRepository: userRepo });
const tokenService = new TokenService({ tokenRepository: tokenRepo });
const fileService = new FileService({ fileRepository: fileRepo, fileUploader });

const authService = new AuthService({
  userService,
  tokenService,
});

app.use(setTokenServiceMiddleware(tokenService));

app.use(`/${uploadsPath}`, express.static(uploadsPath));
app.use("/", new AuthRoutes({ authService }));
app.use(
  "/file",
  isAuthenticated,
  new FileRoutes({ fileService, fileUploader }),
);
app.use(errorMiddleware);

export default app;
