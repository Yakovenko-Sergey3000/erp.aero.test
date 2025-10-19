"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var body_parser_1 = require("body-parser");
var cookie_parser_1 = require("cookie-parser");
var cors_1 = require("cors");
var app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.set("trust proxy", 1);
// const uploadsPath = "uploads";
// const fileUploader = new FileUploader({ path: uploadsPath });
//
// const userRepo = new UserRepository(db);
// const tokenRepo = new TokenRepository(db);
// const fileRepo = new FileRepository(db);
//
// const userService = new UserService({ userRepository: userRepo });
// const tokenService = new TokenService({ tokenRepository: tokenRepo });
// const fileService = new FileService({ fileRepository: fileRepo, fileUploader });
//
// const authService = new AuthService({
//   userService,
//   tokenService,
// });
// app.use(setTokenServiceMiddleware(tokenService));
// const authRoutes = new AuthControllers({ authService });
// app.use(`/${uploadsPath}`, express.static(uploadsPath));
// app.use("/", authRoutes);
// app.use(
//   "/file",
//   isAuthenticated,
//   new FileRoutes({ fileService, fileUploader })
// );
// app.use(AuthRouter({ authController: new AuthControllers({ authService }) }));
// app.use(errorMiddleware);
exports.default = app;
