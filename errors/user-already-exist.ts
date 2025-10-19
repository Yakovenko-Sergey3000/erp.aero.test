import ApiError from "./api-error.ts";

export class UserAlreadyExist extends ApiError {
  constructor() {
    super("User already exist", 409);
  }
}
