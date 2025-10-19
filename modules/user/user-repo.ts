import User, { type CreateUserModel, type UserModel } from "./user-model.ts";
import cleanObject from "../../utils/clear-object.ts";
import type { Knex } from "knex";
import { SomethingWentWrong } from "../../errors/index.ts";
import type { FindUserQueryType } from "./types.ts";
import type { UUIDTypes } from "uuid";

class UserRepository {
  db: Knex;
  constructor(db: Knex) {
    this.db = db;
  }

  async createUser(user: CreateUserModel): Promise<Pick<UserModel, "id">> {
    const preparedUser = cleanObject(user);

    const [createdUser] = await this.db<User>(User.tableName).insert(
      preparedUser,
      ["id"],
    );

    if (!createdUser) {
      logger.error({
        where: "UserRepository.createUser",
        message: "User not created",
      });

      throw new SomethingWentWrong();
    }

    return createdUser;
  }

  async findUsersWhere(query: FindUserQueryType) {
    const preparedQuery = cleanObject(query);
    const users = await this.db(User.tableName)
      .select("*")
      .where(preparedQuery);
    return users.map((user) => new User(user));
  }

  async findUserById(id: UUIDTypes): Promise<User | undefined> {
    const user = await this.db<User>(User.tableName).where({ id }).first();

    return user ? new User(user) : user;
  }
}

export default UserRepository;
