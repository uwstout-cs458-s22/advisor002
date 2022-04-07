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
    axios.get.mockReset();
  });

  describe('fetchAll tests', () => {
    test('fetchAll - happy path test', async () => {
      
      const testCourses = [
        {
         id: 1,
         name: "computers",
         section: 1,
         credits: 2,
        }       
      ];
      axios.get.mockResolvedValueOnce({ courses: testCourses, status: 200 });

      const result = await Course.findAll('mZAYn5aLEqKUlZ_Ad9U_fWr38GaAQ1oFAhT8ds245v7Q', "", 0, 100);

      expect(axios.get).toHaveBeenCalledWith('courses?criteria=');
      expect(result).toEqual(testCourses);
    });

  });
});
