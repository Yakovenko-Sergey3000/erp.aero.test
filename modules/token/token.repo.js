import clearObject from "../../utils/clear-object.js";
import Token from "./token.model.js";

class TokenRepository {
  constructor(db) {
    this.db = db;
  }

  createToken(token) {
    const preparedToken = clearObject(token);

    return this.db.transaction(async (trx) => {
      const [tokenId] = await trx(Token.tableName).insert(preparedToken);
      const token = await trx(Token.tableName).where({ id: tokenId }).first();
      return new Token(token);
    });
  }

  async getTokenByUserId(userId, ip) {
    const token = await this.db(Token.tableName)
      .where({ user_id: userId, ip, is_broken: false })
      .orderBy("id", "desc")
      .first();

    return token ? new Token(token) : token;
  }

  async getTokenByRefreshToken(refreshToken, ip) {
    const token = await this.db(Token.tableName)
      .where({ refresh_token: refreshToken, ip, is_broken: false })
      .first();

    return token ? new Token(token) : token;
  }

  async markAsBroken(userId, ip) {
    await this.db(Token.tableName)
      .where({ user_id: userId, ip })
      .update({ is_broken: true });
  }
}

export default TokenRepository;
