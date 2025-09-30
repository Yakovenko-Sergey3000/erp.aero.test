import { Router } from "express";
import { bodyValidator } from "../../libs/body-validator.js";
import {
  checkUserEmail,
  checkUserPhone,
} from "../../utils/check-user-login.js";
import { isAuthenticated } from "../../middlewars/auth.middleware.js";
import ApiError from "../../utils/api-error.js";

class AuthRoutes {
  /**
   * @param {AuthService} authService
   */

  constructor({ authService } = {}) {
    this.authService = authService;
    this.router = Router();
    this.router.post(
      "/signup",
      this._loginAndPassValidator,
      this.signup.bind(this),
    );
    this.router.post(
      "/signin",
      this._loginAndPassValidator,
      this.signin.bind(this),
    );
    this.router.post("/signup/new_token", this.newToken.bind(this));
    this.router.get("/logout", isAuthenticated, this.logout.bind(this));
    this.router.get("/info", isAuthenticated, this.getId.bind(this));

    return this.router;
  }

  async signin(req, res, next) {
    try {
      const response = await this.authService.signin({
        login: req.body.login,
        password: req.body.password,
        ip: req.ip,
      });

      res.send(response).status(200);
    } catch (e) {
      next(e);
    }
  }
  async signup(req, res, next) {
    if (req.errors.length) {
      return next(ApiError.BadRequest(null, req.errors));
    }

    try {
      const json = await this.authService.signup({
        login: req.body.login,
        password: req.body.password,
        ip: req.ip,
      });

      res.status(201).json(json);
    } catch (e) {
      next(e);
    }
  }
  async logout(req, res, next) {
    try {
      await this.authService.logout({ userId: req.user.id, ip: req.ip });
      res.status(200).send("Logout success");
    } catch (e) {
      next(e);
    }
  }
  async newToken(req, res, next) {
    try {
      const response = await this.authService.newToken({
        refreshToken: req.body.refreshToken,
        ip: req.ip,
      });

      res.send(response).status(200);
    } catch (e) {
      next(e);
    }
  }

  getId(req, res, next) {
    try {
      res
        .send({
          id: req.user.id,
        })
        .status(200);
    } catch (e) {
      next(e);
    }
  }

  _loginAndPassValidator = bodyValidator({
    required: ["login", "password"],
    validate: [
      {
        field: "login",
        message: "Login must be email or phone",
        validateFn: (value) => {
          return checkUserEmail(value) || checkUserPhone(value);
        },
      },
      {
        field: "password",
        message: "Password must be at least 6 characters long",
        validateFn: (value) => value.length >= 6,
      },
    ],
  });
}

export default AuthRoutes;
