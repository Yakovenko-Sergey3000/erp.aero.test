class User {
  constructor({ id, email, phone, password } = {}) {
    this.id = id;
    this.email = email;
    this.phone = phone;
    this.password = password;
  }
}

export default User;
