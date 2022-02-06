import userController from '../controller';

describe('auth', () => {
  test(`registerUser`, async () => {
    const req = {
      body: {
        name: 'Murtaz',
        password: '123',
        email: 'email@vd.com',
      },
    };
    const res = {
      json: {},
    };
    const test = await userController.registerUser(req, res);
    // eslint-disable-next-line
    expect(test).toBe(null);
  });
});
