const axios = require('axios');
const log = require('loglevel');
const { deSerializeCourse } = require('../serializers/Course');
const Course = require('../models/Course');
const HttpError = require('http-errors');

/*
async function deleteCourse(sessionToken, Id) {
  const request = axios.create({
    headers: { Authorization: `Bearer ${sessionToken}` },
  });
}
*/

/*
async function findOne(sessionToken, criteria) {
  const request = axios.create({
    headers: { Authorization: `Bearer ${sessionToken}` },
  });
  const response = await request.get(`courses?criteria=${criteria}`);
  if (response.status === 200 || response.status === 201) {
    const deSerializedData = response.data.map(deSerializeCourse);
    const courses = deSerializedData.map((params) => new Course(params));
    log.debug(
      `Advisor API Success: Retrieved ${courses.length} Course(s) with criteria=${criteria}`
    );
    return courses;
  } else {
    throw HttpError(500, `Advisor API Error ${response.status}: ${response.data.error.message}`);
  }
}
*/

async function findAll(sessionToken, criteria, limit = 100, offset = 0) {
  const request = axios.create({
    headers: { Authorization: `Bearer ${sessionToken}` },
  });
  const response = await request.get(`courses?criteria=${criteria}`);
  if (response.status === 200) {
    const deSerializedData = response.data.map(deSerializeCourse);
    const courses = deSerializedData.map((params) => new Course(params));
    log.debug(
      `Advisor API Success: Retrieved ${courses.length} Course(s) with offset=${offset}, limit=${limit}`
    );
    return courses;
  } else {
    throw HttpError(500, `Advisor API Error ${response.status}: ${response.data.error.message}`);
  }
}

async function createCourse(sessionToken, requestBody) {
  const request = axios.create({
    headers: { Authorization: `Bearer ${sessionToken}` },
  });
  const response = await request.post('courses', requestBody);

  if (response.status === 201) {
    log.debug(`Advisor API Success: Created Course`);
    return {
      message: 'Course Successfully Created',
      status: response.status,
    };
  }

  log.debug(`Advisor API Error: Could not create course. Status code: ${response.status}`);
  return {
    message: response.data.error.message,
    status: response.status,
  };
}

async function editCourse(sessionToken, requestBody, id) {
  const request = axios.create({
    headers: { Authorization: `Bearer ${sessionToken}` },
  });
  const response = await request.put(`courses/${id}`, requestBody);

  if (response.status === 200) {
    log.debug(`Advisor API Success: Updated Course`);
    return {
      message: 'Course Successfully Updated',
      status: response.status,
    };
  }
  log.debug(`Advisor API Error: Could not update course. Status code: ${response.status}`);
  return {
    message: response.data.error.message,
    status: response.status,
  };
}

module.exports = {
  // deleteCourse,
  // findOne,
  findAll,
  createCourse,
  editCourse
};
