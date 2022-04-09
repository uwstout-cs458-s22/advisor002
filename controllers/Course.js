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
  const request = axios.delete(`/remove/${course}`,{
    headers: { Authorization: `Bearer ${sessionToken}` }
  });
  if(request == null) return {message: `request is null with course: ${course}`};
  if(request.status === 201) {
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

module.exports = {
  findOne,
  findAll,
  deleteCourse
};