import ApiError from "../../utils/api-error.js";

class Token {
  constructor({
    id,
    ip,
    user_id,
    refresh_token,
    is_broken = 0,
    expires_at,
  } = {}) {
    if (!user_id) throw ApiError.RequiredField("user_id");
    if (!refresh_token) throw ApiError.RequiredField("refresh_token");
    if (!expires_at) throw ApiError.RequiredField("expires_at");

    if (id) {
      this.id = id;
    }

    if (ip) {
      this.ip = ip;
    }

    this.user_id = user_id;
    this.refresh_token = refresh_token;
    this.is_broken = Boolean(is_broken);
    this.expires_at = expires_at;
  }

  isBroken() {
    return this.is_broken === true;
  }

  isAccessToken() {
    return this.is_broken === false;
  }

  static tableName = "tokens";
}

export default Token;
