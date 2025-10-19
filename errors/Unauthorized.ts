import ApiError from "./api-error.ts";

export class Unauthorized extends ApiError {
  constructor() {
    super("Unauthorized", 401);
  }
}
