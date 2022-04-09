function deSerializeCourse(data) {
  return {
    id: data.id,
    courseid: data.courseid, // not implemented on the api
    name: data.name,
    credits: data.credits,
    section: data.section,
  };
}

module.exports = {
  deSerializeCourse
};
