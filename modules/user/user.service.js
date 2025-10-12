import User from "./user.model.ts";
import { v4 as uuidv4 } from "uuid";
import ApiError from "../../utils/api-error.js";

class UserService {
  /**
   * @param {UserRepository} userRepository
   */
  constructor({ userRepository }) {
    this.userRepo = userRepository;
  }

  async createUser({ email, phone, password }) {
    const user = new User({
      id: uuidv4(),
      email,
      phone,
      password,
    });

    const userExist = await this.findUsersWhere({
      email: user.email,
      phone: user.phone,
    });

    if (userExist.length) throw ApiError.UserAlreadyExists();

    return await this.userRepo.createUser(user);
  }

  findUserById(id) {
    if (!id) throw ApiError.RequiredField("id");
    return this.userRepo.findUserById(id);
  }

  async findUsersWhere(query) {
    return await this.userRepo.findUsersWhere(query);
  }
}

export default UserService;
