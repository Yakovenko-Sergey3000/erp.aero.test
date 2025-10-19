import ApiError from "./api-error.ts";

export class BadRequest extends ApiError {
  constructor(message?: string | null, errors?: string[]) {
    const msg = message || "Bad request";
    super(msg, 400);

    if (errors?.length) {
      this.errors = errors;
    }
  }
}
