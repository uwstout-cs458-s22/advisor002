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
