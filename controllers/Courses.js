const axios = require('axios');
const log = require('loglevel');

async function addCourse(sessionToken, formData) {
  const request = axios.create({
    headers: { Authorization: `Bearer ${sessionToken}` },
  });
  const response = await request.post('courses', formData);

  if (response.status === 201) {
    log.debug(`Advisor API Success: Created Course`);
    return {
      message: 'Course Successfully Created',
      status: response.status,
    };
  }

  if (response.status === 200) {
    log.debug(`Advisor API Success: Created Course`);
    return {
      message: 'Course Already Exists',
      status: response.status,
    };
  }

  log.debug(`Advisor API Error: Could not create course. Status code: ${response.status}`);
  return {
    message: response.data.error.message,
    status: response.status,
  };
}

module.exports = {
  addCourse,
};
