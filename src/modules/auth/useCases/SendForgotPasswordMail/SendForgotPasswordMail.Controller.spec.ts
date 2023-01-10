import request from 'supertest';
import { app } from '@/shared/infra/http/app';

describe('Send Forgot Password Mail Controller', () => {
  it('should be able to send a forgot password mail to user', async () => {
    const response = await request(app).post('/api/v1/auth/forgot').send({
      email: 'test@gmail.com',
    });

    expect(response.status).toBe(204);
  });

  it('should not be able to send an email if user does not exists', async () => {
    const response = await request(app).post('/api/v1/auth/forgot').send({
      email: 'asa@gmail.com',
    });
    expect(response.status).toBe(401);
  });
});
