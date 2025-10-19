import cleanObject from "../../utils/clear-object.ts";
import Token, { type CreateTokenModel } from "./token-model.ts";
import type { Knex } from "knex";
import type {
  GetTokenByRefreshToken,
  GetTokenByUser,
  MarkAsBrokenType,
} from "./types.ts";

class TokenRepository {
  db: Knex;
  constructor(db: Knex) {
    this.db = db;
  }

  createToken = async (token: CreateTokenModel): Promise<void> => {
    const preparedToken = cleanObject(token);
    await this.db<Token>(Token.tableName).insert(preparedToken);
  };

  getTokenByUser = async ({
    userId,
    fingerprint,
  }: GetTokenByUser): Promise<Token | undefined> => {
    const token = await this.db<Token>(Token.tableName)
      .where({ user_id: userId, fingerprint, is_broken: false })
      .orderBy("id", "desc")
      .first();

    return token ? new Token(token) : token;
  };

  getTokenByRefreshToken = async ({
    refreshToken,
    fingerprint,
  }: GetTokenByRefreshToken) => {
    const token = await this.db<Token>(Token.tableName)
      .where({ refresh_token: refreshToken, fingerprint, is_broken: false })
      .first();

    return token ? new Token(token) : token;
  };

  markAsBroken = async ({ userId, fingerprint }: MarkAsBrokenType) => {
    await this.db<Token>(Token.tableName)
      .where({ user_id: userId, fingerprint })
      .update({ is_broken: true });
  };
}

export default TokenRepository;
