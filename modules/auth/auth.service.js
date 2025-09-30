import bycrypt from "bcrypt";
import {
  checkUserEmail,
  checkUserPhone,
} from "../../utils/check-user-login.js";

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
    if (!login) throw new Error("Login is required");
    if (!password) throw new Error("Password is required");
    if (!ip) throw new Error("IP is required");

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
      throw new Error("User not found");
    }
    const matchPassword = await bycrypt.compare(
      password,
      currentUser[0].password,
    );

    if (!matchPassword) {
      throw new Error("Invalid login or password");
    }

    await this.tokenService.markAsBroken({ userId: currentUser[0].id, ip });

    return await this.tokenService.createToken({ user: currentUser[0], ip });
  }

  async logout({ userId, ip }) {
    const user = await this.userService.findUserById(userId);

    if (!user) throw new Error("User not found");

    const token = await this.tokenService.getTokenByUserId(user.id, ip);

    if (!token) throw new Error("Token not found");

    await this.tokenService.markAsBroken({ userId: user.id, ip });
  }

  async newToken({ refreshToken, ip }) {
    if (!refreshToken) throw new Error("refreshToken is required");
    if (!ip) throw new Error("IP is required");

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
