import User, { type CreateUserModel, type UserModel } from "./user-model.ts";
import { type UUIDTypes, v4 as uuidv4 } from "uuid";
import ApiError from "../../errors/api-error.ts";
import type UserRepository from "./user-repo.ts";
import { UserAlreadyExist } from "../../errors/index.ts";
import type { FindUserQueryType } from "./types.ts";

class UserService {
  userRepo: UserRepository;
  constructor({ userRepository }: { userRepository: UserRepository }) {
    this.userRepo = userRepository;
  }

  async createUser({
    email,
    phone,
    password,
  }: CreateUserModel): Promise<Pick<UserModel, "id">> {
    const user = new User({
      id: uuidv4(),
      email,
      phone,
      password,
    });

    if (!user.isValid()) {
      logger.error({
        where: "UserService.createUser",
        message: "User is not valid",
      });

      throw new Error("User is not valid");
    }

    const userExist = await this.findUsersWhere({
      email: user.email,
      phone: user.phone,
    });

    if (userExist.length) {
      const err = new UserAlreadyExist();
      logger.error({
        where: "UserService.createUser",
        message: err.message,
      });

      throw err;
    }

    await this.userRepo.createUser(user);

    return user;
  }

  findUserById(id: UUIDTypes): Promise<UserModel | undefined> {
    return this.userRepo.findUserById(id);
  }

  async findUsersWhere(query: FindUserQueryType) {
    return await this.userRepo.findUsersWhere(query);
  }
}

export default UserService;
