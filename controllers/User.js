const axios = require('axios');
const log = require('loglevel');
const { deSerializeUser } = require('../serializers/User');
const User = require('../models/User');
const HttpError = require('http-errors');

// if successful return a User model object
// if error, an error is thrown with a message, this way the caller
// doesn't need to the underlying network (axios, advisor api, etc.)
// NOTE: Use caution if attempt to use a Promise instead,
// throwing errors was problematic, didn't determine root cause
async function create(sessionToken, userId, email) {
  const request = axios.create({
    headers: { Authorization: `Bearer ${sessionToken}` },
  });
  const response = await request.post('users', {
    email: email,
    userId: userId,
  });
  if (response.status === 200 || response.status === 201) {
    const userParms = deSerializeUser(response.data);
    const user = new User(userParms);
    log.debug(`Advisor API Success: Created (${response.status}) User ${user.id} (${user.email})`);
    return user;
  } else {
    throw HttpError(
      500,
      `Advisor API Create User Error ${response.status}: ${response.data.Error}`
    );
  }
}

async function fetchAll(sessionToken, offset, limit) {
  const request = axios.create({
    headers: { Authorization: `Bearer ${sessionToken}` },
  });
  const response = await request.get(`users?offset=${offset}&limit=${limit}`);
  if (response.status === 200) {
    const deSerializedData = response.data.map(deSerializeUser);
    const users = deSerializedData.map((params) => new User(params));
    log.debug(
      `Advisor API Success: Retrieved ${users.length} User(s) with offset=${offset}, limit=${limit}`
    );
    return users;
  } else {
    throw HttpError(500, `Advisor API Error ${response.status}: ${response.data.error.message}`);
  }
}

async function deleteUser(sessionToken, userId) {
  const request = axios.create({
    headers: { Authorization: `Bearer ${sessionToken}` },
  });
  const response = await request.delete(`users/${userId}`);
  if (response.status === 200) {
    log.debug(`User: ${userId} was successfully deleted`);
    return response;
  } else {
    throw HttpError(
      500,
      `Advisor API Delete User Error ${response.status}: ${response.data.error.message}`
    );
  }
}

async function editUser(sessionToken, id, permissions) {
  const request = axios.create({
    headers: { Authorization: `Bearer ${sessionToken}` },
  });
  const newPermissions = {
    role: permissions.role,
    enable: permissions.enable,
    id: id,
  };
  console.log('hit controller');
  // console.log(newPermissions.User.role + ' ' + newPermissions.User.enable);
  const response = await request.put(`/users/${id}`, newPermissions);
  console.log('Status code ' + response.status);
  if (response.status === 200 || response.status === 201) {
    console.log(response);
    const userValues = deSerializeUser(response.data);
    console.log(userValues.role + ' ' + userValues.enable);
    const updatedUser = new User(userValues);
    log.debug(`API Success: User: ${id} is now (${newPermissions.role}, ${newPermissions.enable})`);
    return updatedUser;
  } else {
    throw HttpError(
      500,
      `Advisor API Edit User Error ${response.status}: ${response.data.error.message}`
    );
  }
}

module.exports = {
  create,
  fetchAll,
  deleteUser,
  editUser,
};
