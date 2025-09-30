class Token {
  constructor({
    id,
    ip,
    user_id,
    refresh_token,
    is_broken = 0,
    expires_at,
  } = {}) {
    if (!user_id) throw new Error("user_id is required");
    if (!refresh_token) throw new Error("refresh_token is required");
    if (!expires_at) throw new Error("expires_at is required");

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
