const axios = require('axios');
const log = require('loglevel');

async function deleteCourse(sessionToken, courseId) {
  axios.delete('endpointURL', {
    headers: { Authorization: `Bearer ${sessionToken}` },
    data: {id: courseId}
  }).then(response => {
    log.debug(`Deleted Course: ${response.data}`)
  }).catch(error => {
    log.debug(`Couldn't Delete Course: ${error}`)
  })
}
module.exports = {
  deleteCourse
}