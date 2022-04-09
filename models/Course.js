class Course {
  constructor(params) {
    this.id = params.id;
    this.courseId = params.courseId;
    this.name = params.name;
    this.credits = params.credits;
    this.section = params.section;
  }
}


module.exports = Course;
