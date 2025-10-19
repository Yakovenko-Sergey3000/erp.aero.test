import type { UUIDTypes } from "uuid";

export type AuthDto = {
  login: string;
  password: string;
  fingerprint: string;
};

export type LogoutDto = {
  userId: UUIDTypes;
  fingerprint: string;
};

export type NewTokenDto = {
  refreshToken: string;
  fingerprint: string;
};

export type CreateTokenResponse = {
  accessToken: string;
  refreshToken: string;
};
