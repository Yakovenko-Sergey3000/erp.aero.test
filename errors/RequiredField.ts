import ApiError from "./api-error.ts";

export class RequiredField extends ApiError {
  constructor(field: string) {
    super(`Field ${field} is required`, 400);
  }
}
