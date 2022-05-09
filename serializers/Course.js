// Here we deserialize a JSON structure from the Advisor API
// For a simple object like User, this feels unecessary since
// we are peforming an isophormic transformation
// However, it is good practice to provide this layer in case the FE
// wants to make transformations on the API returned data
// Deserializations that perform a simple map do not need to be unit tested
function deSerializeCourse(data) {
  return {
    id: data.id,
    name: data.name,
    credits: data.credits,
    section: data.section,
    type: data.type,
    year: data.year,
  };
}

module.exports = {
  deSerializeCourse
};
