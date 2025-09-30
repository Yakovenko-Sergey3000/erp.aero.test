import Token from "./token.model.js";
import jwt from "jsonwebtoken";
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from "../../configs/config.js";

class TokenService {
  /**
   * @param {TokenRepository} tokenRepository
   */

  constructor({ tokenRepository }) {
    this.tokenRepo = tokenRepository;
  }

  async createToken({ user, ip }) {
    if (!user) throw new Error("User is required");
    if (!ip) throw new Error("IP is required");

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
    if (!refreshToken) throw new Error("refreshToken is required");
    if (!ip) throw new Error("IP is required");

    try {
      const payload = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
      const token = await this.tokenRepo.getTokenByRefreshToken(
        refreshToken,
        ip,
      );

      if (!token || token.isBroken()) {
        throw new Error("Token not valid");
      }

      return jwt.sign({ id: payload.id }, JWT_ACCESS_SECRET, {
        expiresIn: "10m",
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  async getTokenByUserId(userId, ip) {
    if (!userId) throw new Error("user_id is required");
    if (!ip) throw new Error("ip is required");

    const token = await this.tokenRepo.getTokenByUserId(userId, ip);

    if (token.isBroken()) {
      return undefined;
    }

    return token;
  }

  async markAsBroken({ userId, ip }) {
    if (!userId) throw new Error("user_id is required");
    if (!ip) throw new Error("ip is required");

    await this.tokenRepo.markAsBroken(userId, ip);
  }
}

export default TokenService;
