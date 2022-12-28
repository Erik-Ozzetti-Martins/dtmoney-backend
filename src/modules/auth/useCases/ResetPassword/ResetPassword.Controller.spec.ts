import request from 'supertest';
import { app } from '@/shared/infra/http/app';

describe('Reset Password Controller', () => {
  it('should be able to reset password', async () => {
    const response = await request(app)
      .post('/api/v1/auth/password/reset')
      .send({
        token: 'cxcxczxczxcxzc',
        password: '123456',
      });

    expect(response.status).toBe(204);
  });

  it('should not be able to reset password with non-existing token', async () => {
    const response = await request(app)
      .post('/api/v1/auth/password/reset/')
      .send({
        token: 'non-existing',
        password: '123456',
      });
    expect(response.status).toBe(401);
  });

  it('should not be able to reset password with non-existing user', async () => {
    const response = await request(app)
      .post('/api/v1/auth/password/reset/')
      .send({
        token: 'non-existing',
        password: '123456',
      });

    expect(response.status).toBe(401);
  });
});
