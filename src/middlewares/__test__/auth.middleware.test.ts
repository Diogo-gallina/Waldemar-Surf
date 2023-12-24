import AuthService from '@src/services/auth.service';

describe('Auth Middleware', () => {
  it('should verify a JWT token and call the next middleware', async () => {
    const jwtToken = AuthService.generateToken({ data: 'fake' });
    const reqFake = {
      headers: {
        'x-access-token': jwtToken,
      },
    }
    const resFake = {};
    const nextFake = jest.fn();
    authMiddleware(reqFake, resFake, nextFake);

    expect(nextFake).toHaveBeenCalled();
  });
});
