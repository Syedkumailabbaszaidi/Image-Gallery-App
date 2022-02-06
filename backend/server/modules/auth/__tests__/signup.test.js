import userService from '../service';

describe('Auth Service', () => {
  test(`createUser`, async () => {
    let errorCatched = false;
    const user = {
      name: 'Test',
      password: 'Test_case@123',
      gender: 'male',
      dob: '1996-12-1',
      email: 'testing@venturedive.com',
      isMobile: false,
    };
    const channelType = 'app';
    try {
      await userService.createUser(user, channelType);
    } catch (err) {
      errorCatched = err.error;
    }

    if (!errorCatched) {
      try {
        await userService.createUser(user, channelType);
      } catch (err) {
        errorCatched = err.error;
      }
    }

    // eslint-disable-next-line
    expect(errorCatched).toEqual('user already exists ');
  });
});
