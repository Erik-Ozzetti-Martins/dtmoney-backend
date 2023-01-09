import request from 'supertest';
import { app } from '@/shared/infra/http/app';

describe('Create Ledger Controller', () => {
  it('should be able to create a new ledger', async () => {
    const signIn = await request(app).post('/api/v1/auth/signin').send({
      email: 'testAA@gmail.com',
      password: 'testete.com',
    });

    const response = await request(app)
      .post('/api/v1/ledger/')
      .set('Authorization', `Bearer ${signIn.body.token}`)
      .send({
        amount: 22.0,
        category: 'teste',
        title: 'teste',
        type: 'gasto',
      });

    expect(response.status).toBe(201);
  });

  it('should not be able to create a new ledger with invalid token', async () => {
    const response = await request(app)
      .post('/api/v1/ledger/')
      .set('Authorization', 'Bearer 1234567890')
      .send({
        amount: 22.0,
        category: 'teste',
        title: 'teste',
        type: 'gasto',
      });

    expect(response.status).toBe(401);
  });
});
