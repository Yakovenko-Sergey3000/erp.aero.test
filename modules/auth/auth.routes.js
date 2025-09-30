import { Router } from "express";
import { bodyValidator } from "../../libs/body-validator.js";
import {
  checkUserEmail,
  checkUserPhone,
} from "../../utils/check-user-login.js";
import { isAuthenticated } from "../../middlewars/auth.middleware.js";

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
      this.signUp.bind(this),
    );
    this.router.post(
      "/signin",
      this._loginAndPassValidator,
      this.signIn.bind(this),
    );
    this.router.post("/signup/new_token", this.newToken.bind(this));
    this.router.get("/logout", isAuthenticated, this.logout.bind(this));
    this.router.get("/info", isAuthenticated, this.getId.bind(this));

    return this.router;
  }

  async signIn(req, res) {
    try {
      const response = await this.authService.signin({
        login: req.body.login,
        password: req.body.password,
        ip: req.ip,
      });

      res.send(response).status(200);
    } catch (error) {
      res.send(error.message).status(400);
    }
  }
  async signUp(req, res) {
    try {
      const response = await this.authService.signup({
        login: req.body.login,
        password: req.body.password,
        ip: req.ip,
      });

      res.send(response).status(201);
    } catch (error) {
      res.send(error.message).status(400);
    }
  }
  async logout(req, res) {
    try {
      await this.authService.logout({ userId: req.user.id, ip: req.ip });
      res.send("Logout success").status(200);
    } catch (error) {
      res.send(error.message).status(400);
    }
  }
  async newToken(req, res) {
    try {
      const response = await this.authService.newToken({
        refreshToken: req.body.refreshToken,
        ip: req.ip,
      });

      res.send(response).status(200);
    } catch (e) {
      res.send(e.message).status(400);
    }
  }

  getId(req, res) {
    try {
      res
        .send({
          id: req.user.id,
        })
        .status(200);
    } catch (error) {
      res.send(error.message).status(400);
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
