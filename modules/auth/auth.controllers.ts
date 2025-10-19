import type AuthService from "./auth.service.ts";
import type { Request, Response } from "express";
import { BadRequest, UserNotFound } from "../../errors/index.ts";

class AuthControllers {
  authService: AuthService;
  constructor({ authService }: { authService: AuthService }) {
    this.authService = authService;
  }

  signin = async (req: Request, res: Response) => {
    if (req.errors && req.errors.length) {
      throw new BadRequest(null, req.errors);
    }

    const response = await this.authService.signin({
      login: req.body.login,
      password: req.body.password,
      fingerprint: req.fingerprint,
    });

    res.send(response).status(200);
  };

  signup = async (req: Request, res: Response) => {
    if (req.errors && req.errors.length) {
      throw new BadRequest(null, req.errors);
    }

    const json = await this.authService.signup({
      fingerprint: req.fingerprint,
      login: req.body.login,
      password: req.body.password,
    });

    res.status(201).json(json);
  };

  logout = async (req: Request, res: Response) => {
    if (!req.user) {
      throw new UserNotFound();
    }

    await this.authService.logout({
      userId: req.user.id,
      fingerprint: req.fingerprint,
    });
    res.status(200).send("Logout success");
  };

  newToken = async (req: Request, res: Response) => {
    const response = await this.authService.newToken({
      refreshToken: req.body.refreshToken,
      fingerprint: req.fingerprint,
    });

    res.send(response).status(200);
  };

  getId = async (req: Request, res: Response) => {
    if (!req.user) {
      throw new UserNotFound();
    }

    res
      .json({
        id: req.user.id,
        email: req.user.email,
        phone: req.user.phone,
      })
      .status(200);
  };
}

export default AuthControllers;
