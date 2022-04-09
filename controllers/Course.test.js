const axios = require('axios');
const log = require('loglevel');
const Course = require('./Course');

jest.mock('axios');

beforeAll(() => {
  axios.create.mockReturnThis();
  log.disableAll();
});

describe('Course controller tests', () => {
  beforeEach(() => {
    axios.post.mockReset();
    axios.get.mockReset();
  });

  describe('deleteCourses tests', () => {
    test('if deletion of course was successful', async () => {
      const course = 
        {
          id: 1,
          courseId: 157,
          name: 'Mathematics',
          credits: 3,
          section: 1
        };
      axios.post.mockResolvedValueOnce({ status: 201 });
      const result = await Course.deleteCourse('session-token', course);
      expect(result.message).toEqual('Course was deleted successfully');
    });

  
  });
});