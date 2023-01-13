import request from 'supertest';
import { app } from '@/shared/infra/http/app';

describe('Find Ledger Controller', () => {
  it('should be able to find a ledger', async () => {
    const signIn = await request(app).post('/api/v1/auth/signin').send({
      email: 'testAA@gmail.com',
      password: 'testete.com',
    });

    const response = await request(app)
      .get('/api/v1/ledger/')
      .set('Authorization', `Bearer ${signIn.body.token} `);

    expect(response.status).toBe(200);
  });

  it('should not be able to find a ledger with invalid token', async () => {
    const response = await request(app)
      .get('/api/v1/ledger/')
      .set('Authorization', 'Bearer 1234567890');

    expect(response.status).toBe(401);
  });
});
