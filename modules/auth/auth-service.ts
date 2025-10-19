import bycrypt from "bcrypt";
import {
  checkUserEmail,
  checkUserPhone,
} from "../../utils/check-user-login.ts";
import type TokenService from "../token/token-service.ts";
import type UserService from "../user/user-service.ts";
import type { AuthDto, LogoutDto, NewTokenDto } from "./types.ts";
import type { CreateUserModel } from "../user/user-model.ts";
import {
  InvalidCredentials,
  SomethingWentWrong,
  TokenNotFound,
  UserNotFound,
} from "../../errors/index.ts";

class AuthService {
  userService: UserService;
  tokenService: TokenService;

  constructor({
    userService,
    tokenService,
  }: {
    userService: UserService;
    tokenService: TokenService;
  }) {
    this.userService = userService;
    this.tokenService = tokenService;
  }

  _prepareUserLogin = (login: string): { email: string; phone: string } => {
    if (checkUserEmail(login)) {
      return { email: login, phone: "" };
    }

    if (checkUserPhone(login)) {
      return { phone: login, email: "" };
    }

    return {
      email: "",
      phone: "",
    };
  };

  signup = async ({ login, password, fingerprint }: AuthDto) => {
    const hashPassword = await bycrypt.hashSync(password, 10);

    const userData: CreateUserModel = {
      password: String(hashPassword),
      ...this._prepareUserLogin(login),
    };

    const createdUser = await this.userService.createUser(userData);
    const user = await this.userService.findUserById(createdUser.id);

    if (!user) {
      throw new SomethingWentWrong();
    }

    return await this.tokenService.createToken({
      user,
      fingerprint,
    });
  };

  signin = async ({ login, password, fingerprint }: AuthDto) => {
    const users = await this.userService.findUsersWhere({
      ...this._prepareUserLogin(login),
    });

    if (users.length === 0 || users[0] === undefined) {
      logger.debug({
        where: "AuthService.signin",
        message: "User found",
        data: {
          users,
        },
      });

      throw new UserNotFound();
    }
    const user = users[0];

    const matchPassword = await bycrypt.compare(password, user.password);

    if (!matchPassword) {
      logger.debug({
        where: "AuthService.signin",
        message: "Password is not match",
        data: {
          users,
        },
      });

      throw new InvalidCredentials();
    }

    await this.tokenService.markAsBroken({ userId: user.id, fingerprint });

    return await this.tokenService.createToken({ user, fingerprint });
  };

  async logout({ userId, fingerprint }: LogoutDto) {
    const user = await this.userService.findUserById(userId);

    if (!user) {
      throw new UserNotFound();
    }

    const token = await this.tokenService.getTokenByUser({
      userId,
      fingerprint,
    });

    if (!token) throw new TokenNotFound();

    await this.tokenService.markAsBroken({ userId: user.id, fingerprint });
  }

  async newToken({ refreshToken, fingerprint }: NewTokenDto) {
    const newAccessToken = await this.tokenService.refreshToken({
      refreshToken,
      fingerprint,
    });

    return {
      accessToken: newAccessToken,
      refreshToken,
    };
  }
}

export default AuthService;
