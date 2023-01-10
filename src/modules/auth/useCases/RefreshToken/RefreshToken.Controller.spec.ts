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
        refreshToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RBQUBnbWFpbC5jb20iLCJpYXQiOjE2NzE5MTQ4NjMsImV4cCI6MTY3MzIxMDg2Mywic3ViIjoiNzUwNjZmMDYtODkxMS00Y2MwLWE5ZGMtZGI5NjQ2YWFkNjQwIn0.z9qStdm77sFQRh_040e6xlfbXXLH47vMWVCBzupEy34',
      });

    expect(response.status).toBe(400);
  });
});
