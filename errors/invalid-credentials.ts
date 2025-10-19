import ApiError from "./api-error.ts";

export class InvalidCredentials extends ApiError {
  constructor() {
    super("Invalid login or password", 401);
  }
}
