import ApiError from "./api-error.ts";

export class TokenNotFound extends ApiError {
  constructor() {
    super("Token not found", 404);
  }
}
