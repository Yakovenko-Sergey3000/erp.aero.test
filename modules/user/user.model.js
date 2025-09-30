class User {
  constructor({ id, email, phone, password } = {}) {
    if (!id) {
      throw new Error("id is required");
    }

    if (!password) {
      throw new Error("password is required");
    }

    if (!email && !phone) {
      throw new Error("email or phone is required");
    }

    this.id = id;
    this.email = email;
    this.phone = phone;
    this.password = password;
  }

  static tableName = "users";
}

export default User;
