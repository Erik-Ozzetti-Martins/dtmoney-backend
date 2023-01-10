import request from 'supertest';
import { app } from '@/shared/infra/http/app';
import { faker } from '@faker-js/faker';
describe('SignUp Controller', () => {
  it('should be able to create a new user', async () => {
    const response = await request(app).post('/api/v1/auth/signup').send({
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

    expect(response.status).toBe(201);
  });

  it('should not be able to create a new user with exists email', async () => {
    const response = await request(app).post('/api/v1/auth/signup').send({
      name: 'test',
      email: 'test333@gmail.com',
      password: 'test',
    });

    expect(response.status).toBe(401);
  });
});
