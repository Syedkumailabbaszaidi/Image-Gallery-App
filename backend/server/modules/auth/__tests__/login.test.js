import userService from '../service';

describe('Auth', () => {
  test(`loginUser`, async () => {
    const user = {
      email: 'testing@venturedive.com',
      password: 'Test_case@123',
    };
    const response = await userService.userLogin(user);
    // eslint-disable-next-line
    expect(response.success).toBe(true);
  });

  test(`loginWithInvalidPassword`, async () => {
    const user = {
      email: 'testing@venturedive.com',
      password: 'Test_case@1234',
    };
    try {
      await userService.userLogin(user);
    } catch (err) {
      // eslint-disable-next-line
      expect(err.message).toMatch('Password is incorrect');
    }
  });
});
