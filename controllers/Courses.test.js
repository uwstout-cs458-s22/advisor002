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
    axios.get.mockReset();
    axios.post.mockReset();
    axios.put.mockReset();
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
  
  const testCourse = [
    {
      name: 'Intro Computer Science',
      credits: 4,
      section: 1,
    },
  ];
  describe('fetchAll tests', () => {
    test('fetchAll - happy path test', async () => {
      const testCourses = [
        {
          id: 1,
          name: 'computers',
          section: 1,
          credits: 2,
        },
      ];
      axios.get.mockResolvedValueOnce({ data: testCourses, status: 200 });

      const result = await Course.findAll(
        'mZAYn5aLEqKUlZ_Ad9U_fWr38GaAQ1oFAhT8ds245v7Q',
        '',
        0,
        100
      );

      expect(axios.get).toHaveBeenCalledWith('courses?criteria=');
      expect(result).toEqual(testCourses);
    });
    test('findall -no records returned', async () => {
      const courses = [];
      axios.get.mockResolvedValueOnce({ status: 200, data: courses });
      const result = await Course.findAll('mZAYn5aLEqKUlZ_Ad9U_fWr38GaAQ1oFAhT8ds245v7Q', '', 0, 100);
      expect(axios.get).toHaveBeenCalledWith('courses?criteria=');
      expect(result).toHaveLength(0);
    });

    test('findAll - error response', async () => {
      axios.get.mockResolvedValueOnce({
        status: 500,
        data: { error: { status: 500, message: 'Internal Server Error' } },
      });
      await expect(
        Course.findAll('mZAYn5aLEqKUlZ_Ad9U_fWr38GaAQ1oFAhT8ds245v7Q', '', 0, 100)
      ).rejects.toThrow('Advisor API Error 500: Internal Server Error');
      expect(axios.get).toHaveBeenCalledWith('courses?criteria=');
    });
  });  

  describe('createCourse tests', () => {
    test('that createCourse returns success message', async () => {
      axios.post.mockResolvedValueOnce({ status: 201 });
      const result = await Course.createCourse('session-token', testCourse);

      expect(result.message).toEqual('Course Successfully Created');
    });

    test('that createCourse returns error message', async () => {
      axios.post.mockResolvedValueOnce({
        status: 500,
        data: { error: { message: 'Unauthorized' } },
      });
      const result = await Course.createCourse('session-token', testCourse);


      expect(result.message).toEqual('Unauthorized');
    });
  });

  describe('editCourse tests', () => {
    test('that editCourse returns success message', async () => {
      axios.put.mockResolvedValueOnce({ status: 200 });
      const result = await Course.editCourse('session-token', testCourse[0]);

      expect(result.message).toEqual('Course Successfully Updated');
    });

    test('that editCourse returns error message', async () => {
      axios.put.mockResolvedValueOnce({
        status: 500,
        data: { error: { message: 'Unauthorized' } },
      });
      const result = await Course.editCourse('session-token', testCourse[0]);

      expect(result.message).toEqual('Unauthorized');
    });
  });
});
