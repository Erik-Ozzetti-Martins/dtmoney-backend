import request from 'supertest';
import { app } from '@/shared/infra/http/app';

describe('SignIn Controller', () => {
  it('should be able to authenticate', async () => {
    const response = await request(app).post('/api/v1/auth/signin').send({
      email: 'testAA@gmail.com',
      password: 'testete.com',
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('should not be able to authenticate with non existing user', async () => {
    const response = await request(app).post('/api/v1/auth/signin').send({
      email: 'test2@gmail.com',
      password: 'testete.com',
    });
    expect(response.status).toBe(401);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const response = await request(app).post('/api/v1/auth/signin').send({
      email: 'test@gmail.com',
      password: 'testete.com22',
    });

    expect(response.status).toBe(401);
  });
});
