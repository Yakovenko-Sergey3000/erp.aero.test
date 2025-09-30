import ApiError from "../../utils/api-error.js";

class User {
  constructor({ id, email, phone, password } = {}) {
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
