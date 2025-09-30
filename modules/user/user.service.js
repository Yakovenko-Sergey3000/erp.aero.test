import User from "./user.model.js";
import { v4 as uuidv4 } from "uuid";

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

    if (userExist.length) {
      throw new Error("User already exist");
    }

    return await this.userRepo.createUser(user);
  }
  findUserById(id) {
    return this.userRepo.findUserById(id);
  }

  async findUsersWhere(query) {
    return await this.userRepo.findUsersWhere(query);
  }
  findUserByEmail() {}
}

export default UserService;
