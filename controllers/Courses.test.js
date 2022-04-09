const axios = require('axios');
const log = require('loglevel');
const Course = require('./Courses');

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

  describe('createCourse tests', () => {
    test('that createCourse returns success message', async () => {
      const course = [
        {
          name: 'Intro Computer Science',
          credits: 4,
          section: 1,
        },
      ];
      axios.post.mockResolvedValueOnce({ status: 201 });

      const result = await Course.createCourse('session-token', course);

      expect(result.message).toEqual('Course Successfully Created');
    });

    test('that createCourse returns error message', async () => {
      const course = [
        {
          name: 'Intro Computer Science',
          credits: 4,
          section: 1,
        },
      ];
      axios.post.mockResolvedValueOnce({
        status: 500,
        data: { error: { message: 'Unauthorized' } },
      });

      const result = await Course.createCourse('session-token', course);

      expect(result.message).toEqual('Unauthorized');
    });
  });
});
