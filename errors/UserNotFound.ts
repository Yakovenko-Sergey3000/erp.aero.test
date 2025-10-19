import ApiError from "./api-error.ts";

export class UserNotFound extends ApiError {
  constructor() {
    super("User not found", 404);
  }
}
