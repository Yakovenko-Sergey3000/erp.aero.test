import type { UUIDTypes } from "uuid";

export type UserModel = {
  id: UUIDTypes;
  email: string | undefined;
  phone: string | undefined;
  password: string;
};

export type CreateUserModel = Omit<UserModel, "id">;

class User {
  id: UUIDTypes;
  email: string | undefined;
  phone: string | undefined;
  password: string;

  constructor(user: UserModel | CreateUserModel) {
    if ("id" in user) {
      this.id = user.id;
    } else {
      this.id = "";
    }

    this.email = user.email;
    this.phone = user.phone;
    this.password = user.password;
  }

  isValid(): boolean {
    return Boolean((this.email || this.phone) && this.password);
  }

  static tableName = "users";
}

export default User;
