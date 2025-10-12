import Token from "./token.model.js";
import jwt from "jsonwebtoken";
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from "../../configs/config.ts";
import ApiError from "../../utils/api-error.js";

class TokenService {
  /**
   * @param {TokenRepository} tokenRepository
   */

  constructor({ tokenRepository }) {
    this.tokenRepo = tokenRepository;
  }

  async createToken({ user, ip }) {
    if (!user) throw ApiError.RequiredField("user data");
    if (!ip) throw ApiError.RequiredField("ip");

    const accessToken = jwt.sign({ id: user.id }, JWT_ACCESS_SECRET, {
      expiresIn: "10m",
    });
    const refreshToken = jwt.sign({ id: user.id }, JWT_REFRESH_SECRET, {
      expiresIn: "7d",
    });

    const token = new Token({
      ip,
      user_id: user.id,
      refresh_token: refreshToken,
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    await this.tokenRepo.createToken(token);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshToken({ refreshToken, ip }) {
    if (!refreshToken) throw ApiError.RequiredField("refreshToken");
    if (!ip) throw ApiError.RequiredField("ip");

    const payload = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
    const token = await this.tokenRepo.getTokenByRefreshToken(refreshToken, ip);

    if (!token || token.isBroken()) {
      throw ApiError.TokenNotFound();
    }

    return jwt.sign({ id: payload.id }, JWT_ACCESS_SECRET, {
      expiresIn: "10m",
    });
  }

  async getTokenByUserId(userId, ip) {
    if (!userId) throw ApiError.RequiredField("user_id");
    if (!ip) throw ApiError.RequiredField("ip");

    return await this.tokenRepo.getTokenByUserId(userId, ip);
  }

  async markAsBroken({ userId, ip }) {
    if (!userId) throw ApiError.RequiredField("user_id");
    if (!ip) throw ApiError.RequiredField("ip");

    await this.tokenRepo.markAsBroken(userId, ip);
  }
}

export default TokenService;
