function deSerializeCourse(data) {
  return {
    id: data.id,
    section: data.section,
    name: data.name,
    credits: data.credits,
  };
}

module.exports = {
  deSerializeCourse
};
