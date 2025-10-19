import type { UUIDTypes } from "uuid";

export type TokenModel = {
  id: number;
  user_id: UUIDTypes;
  refresh_token: string;
  is_broken: boolean;
  fingerprint: string;
  expires_at: Date;
};

export type CreateTokenModel = Omit<TokenModel, "id">;

class Token {
  id: number;
  user_id: UUIDTypes;
  refresh_token: string;
  is_broken: boolean;
  fingerprint: string;
  expires_at: Date;

  constructor(token: TokenModel | CreateTokenModel) {
    if ("id" in token) {
      this.id = token.id;
    } else {
      this.id = 0;
    }

    this.user_id = token.user_id;
    this.refresh_token = token.refresh_token;
    this.is_broken = token.is_broken;
    this.expires_at = token.expires_at;
    this.fingerprint = token.fingerprint;
  }

  isBroken(): boolean {
    return this.is_broken && this.expires_at > new Date();
  }

  isValid(): boolean {
    return Boolean(this.refresh_token && this.user_id && this.fingerprint);
  }

  static tableName = "tokens";
}

export default Token;
