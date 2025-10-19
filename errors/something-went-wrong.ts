import ApiError from "./api-error.ts";

export class SomethingWentWrong extends ApiError {
  constructor() {
    super("Something went wrong", 500);
  }
}
