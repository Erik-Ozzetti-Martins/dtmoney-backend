import request from 'supertest';
import { app } from '@/shared/infra/http/app';

describe('Reset Password Controller', () => {
  it('should be able to reset password', async () => {
    const response = await request(app)
      .post('/api/v1/auth/refresh-token')
      .send({
        refreshToken: 'non-existing',
      });
    expect(response.status).toBe(204);
  });

  it('should not be able to reset password with non-existing token', async () => {
    const response = await request(app)
      .post('/api/v1/auth/refresh-token')
      .send({
        refreshToken: 'dsdsdsdsdsad',
      });

    expect(response.status).toBe(401);
  });
});
