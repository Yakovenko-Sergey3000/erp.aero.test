import type { UUIDTypes } from "uuid";

export type TokenPayload = {
  id: UUIDTypes;
  email?: string;
  phone?: string;
};

export type MarkAsBrokenType = {
  userId: UUIDTypes;
  fingerprint: string;
};

export type GetTokenByUser = {
  userId: UUIDTypes;
  fingerprint: string;
};

export type GetTokenByRefreshToken = {
  refreshToken: string;
  fingerprint: string;
};
