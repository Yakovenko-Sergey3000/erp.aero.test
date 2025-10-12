import User from "./user.model.ts";
import cleanObject from "../../utils/clear-object.js";

class UserRepository {
  constructor(db) {
    this.db = db;
  }

  async createUser(user) {
    const preparedUser = cleanObject(user);

    return this.db.transaction(async (trx) => {
      await trx(User.tableName).insert(preparedUser);
      const user = await trx(User.tableName).where(preparedUser).first();
      return new User(user);
    });
  }

  async findUsersWhere(query) {
    const preparedQuery = cleanObject(query);
    const users = await this.db(User.tableName)
      .select("*")
      .where(preparedQuery);
    return users.map((user) => new User(user));
  }

  async findUserById(id) {
    const user = await this.db(User.tableName).where({ id }).first();

    return user ? new User(user) : user;
  }
}

export default UserRepository;
