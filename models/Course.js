class Course {
  constructor(params) {
    this.id = params.id;
    this.section = params.section;
    this.name = params.name;
    this.credits = params.credits;
  }
}

module.exports = Course;
