class User {
  constructor(params) {
    this.id = params.id;
    this.email = params.email;
    this.enable = params.enable;
    this.role = params.role;
    this.userId = params.userId;
    this.userMajor = params.userMajor;
  }

  // future complex logic functions can go here
}

module.exports = User;
