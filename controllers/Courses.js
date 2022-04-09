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

module.exports = {
  // deleteCourse,
  // findOne,
  findAll,
};
