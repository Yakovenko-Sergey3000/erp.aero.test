import ApiError from "../../utils/api-error.js";
import type { UUID } from "node:crypto";

class User {
  id: UUID;
  email: string | undefined;
  phone: string | undefined;
  password: string;

  constructor({ id, email, phone, password }: User) {
    if (!id) {
      throw ApiError.RequiredField("id");
    }

    if (!password) {
      throw ApiError.RequiredField("password");
    }

    if (!email && !phone) {
      throw ApiError.RequiredField("email or phone");
    }

    this.id = id;
    this.email = email;
    this.phone = phone;
    this.password = password;
  }

  static tableName = "users";
}

export default User;
