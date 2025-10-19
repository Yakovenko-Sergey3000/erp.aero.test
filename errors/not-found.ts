import ApiError from "./api-error.ts";

export class NotFound extends ApiError {
  constructor() {
    super("Not found", 404);
  }
}
