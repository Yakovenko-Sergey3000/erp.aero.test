import bycrypt from "bcrypt";
import {
  checkUserEmail,
  checkUserPhone,
} from "../../utils/check-user-login.js";
import ApiError from "../../utils/api-error.js";

class AuthService {
  /**
   * @param {UserService} userService
   * @param {TokenService} tokenService
   */
  constructor({ userService, tokenService }) {
    this.userService = userService;
    this.tokenService = tokenService;
  }

  _prepareUserLogin(login) {
    if (checkUserEmail(login)) {
      return { email: login };
    }

    if (checkUserPhone(login)) {
      return { phone: login };
    }
  }

  async signup({ login, password, ip }) {
    if (!login) throw ApiError.RequiredField("login");
    if (!password) throw ApiError.RequiredField("password");
    if (!ip) throw ApiError.RequiredField("ip");

    const hashPassword = await bycrypt.hashSync(password, 10);

    const userData = {
      password: hashPassword,
      ...this._prepareUserLogin(login),
    };

    const createdUser = await this.userService.createUser(userData);

    return await this.tokenService.createToken({ user: createdUser, ip });
  }

  async signin({ login, password, ip }) {
    const currentUser = await this.userService.findUsersWhere({
      ...this._prepareUserLogin(login),
    });

    if (currentUser.length === 0) {
      throw ApiError.UserNotFound();
    }
    const matchPassword = await bycrypt.compare(
      password,
      currentUser[0].password,
    );

    if (!matchPassword) {
      throw ApiError.InvalidCredentials();
    }

    await this.tokenService.markAsBroken({ userId: currentUser[0].id, ip });

    return await this.tokenService.createToken({ user: currentUser[0], ip });
  }

  async logout({ userId, ip }) {
    if (!userId) throw ApiError.RequiredField("user id");
    if (!ip) throw ApiError.RequiredField("ip");

    const user = await this.userService.findUserById(userId);

    if (!user) throw ApiError.UserNotFound();

    const token = await this.tokenService.getTokenByUserId(user.id, ip);

    if (!token) throw ApiError.TokenNotFound();

    await this.tokenService.markAsBroken({ userId: user.id, ip });
  }

  async newToken({ refreshToken, ip }) {
    if (!refreshToken) throw ApiError.RequiredField("refreshToken");
    if (!ip) throw ApiError.RequiredField("ip");

    const newAccessToken = await this.tokenService.refreshToken({
      refreshToken,
      ip,
    });

    return {
      accessToken: newAccessToken,
      refreshToken,
    };
  }
}

export default AuthService;
