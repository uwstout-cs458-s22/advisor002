class Course {
  constructor(params) {
    this.id = params.id;
    this.courseId = params.courseId;
    this.name = params.name;
    this.credits = params.credits;
  }
}

module.exports = Course;
