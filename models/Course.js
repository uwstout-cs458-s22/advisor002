class Course {
  constructor(params) {
    this.name = params.name;
    this.major = params.major;
    this.credits = params.credits;
    this.semester = params.semester;
  }
}

module.exports = Course;
