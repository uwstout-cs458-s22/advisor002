class Course {
  constructor(params) {
    this.id = params.id;
    this.courseId = params.courseId;
    this.name = params.name;
    this.credits = params.credits;
    this.section = params.section;
    this.type = params.type;
    this.year = params.year;
  }
}

module.exports = Course;
