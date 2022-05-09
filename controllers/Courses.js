const axios = require('axios');
const log = require('loglevel');
const { deSerializeCourse } = require('../serializers/Course');
const Course = require('../models/Course');
const HttpError = require('http-errors');

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
async function deleteCourse(sessionToken, course) {
  const request = axios.put(`/`, {
    body: course.id
  });
  if(request == null) return {message: `request is null with course: ${course.id}`};
  if(request.status === 204) {
    return {
      message: 'Course was deleted successfully',
      status: request.status
    };
  }
  log.debug(`There was an error deleting course with status code: ${request.status}`);
  return {
    message: request.data.error.message,
    status: request.status
  };
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

async function addToTerm(sessionToken, requestBody, id) {
  const request = axios.create({
    headers: { Authorization: `Bearer ${sessionToken}` },
  });
  const response = await request.put(`users/${id}`, requestBody);

  if (response.status === 200) {
    log.debug(`Advisor API Success: Added Course To User Term`);
    return {
      message: 'Course Successfully Added To User Term',
      status: response.status,
    };
  }
  log.debug(`Advisor API Error: Could not add course. Status code: ${response.status}`);
  return {
    message: response.data.error.message,
    status: response.status,
  };
}

module.exports = {
  // findOne,
  deleteCourse,
  findAll,
  createCourse,
  editCourse,
  addToTerm
};
