import jwt from "jsonwebtoken";
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from "../../configs/config.ts";
import type TokenRepository from "./token-repo.ts";
import { type UserModel } from "../user/user-model.ts";
import Token from "./token-model.ts";
import type {
  GetTokenByRefreshToken,
  GetTokenByUser,
  MarkAsBrokenType,
  TokenPayload,
} from "./types.ts";
import type { CreateTokenResponse } from "../auth/types.ts";
import { TokenNotFound } from "../../errors/index.ts";

class TokenService {
  tokenRepo: TokenRepository;

  constructor({ tokenRepository }: { tokenRepository: TokenRepository }) {
    this.tokenRepo = tokenRepository;
  }

  createToken = async ({
    user,
    fingerprint,
  }: {
    user: UserModel;
    fingerprint: string;
  }): Promise<CreateTokenResponse> => {
    if (!user) {
      logger.error({
        where: "TokenService.createToken",
        message: "User is not defined",
      });
    }

    const payload = { id: user.id, email: user.email, phone: user.phone };

    const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, {
      expiresIn: "10m",
    });

    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {
      expiresIn: "7d",
    });

    const token = new Token({
      user_id: user.id,
      refresh_token: refreshToken,
      is_broken: false,
      fingerprint,
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    await this.tokenRepo.createToken(token);

    return {
      accessToken,
      refreshToken,
    };
  };

  refreshToken = async ({
    refreshToken,
    fingerprint,
  }: GetTokenByRefreshToken) => {
    const payload = jwt.verify(
      refreshToken,
      JWT_REFRESH_SECRET,
    ) as TokenPayload;
    const token = await this.tokenRepo.getTokenByRefreshToken({
      refreshToken,
      fingerprint,
    });

    if (!token || token.isBroken()) {
      throw new TokenNotFound();
    }

    return jwt.sign({ id: payload.id }, JWT_ACCESS_SECRET, {
      expiresIn: "10m",
    });
  };

  async getTokenByUser({ userId, fingerprint }: GetTokenByUser) {
    return await this.tokenRepo.getTokenByUser({ userId, fingerprint });
  }

  markAsBroken = async ({ userId, fingerprint }: MarkAsBrokenType) => {
    await this.tokenRepo.markAsBroken({ userId, fingerprint });
  };
}

export default TokenService;
