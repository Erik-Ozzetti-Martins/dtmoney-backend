import AppError from '@/shared/errors/AppError';
import { Request } from 'express';
import { ensureAuthenticated } from './ensureAuthenticated';

describe('EnsureAuthenticated', () => {
  const response = {} as any;
  const next = jest.fn().mockName('next');

  it('shoul be able  user token', async () => {
    const request = {
      headers: {
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzIyNTY5NzksImV4cCI6MTY3MjI3MTM3OSwic3ViIjoiNzUwNjZmMDYtODkxMS00Y2MwLWE5ZGMtZGI5NjQ2YWFkNjQwIn0.x86h1XNLrkedpVCVjvCxVhF2Dnxhs18hiewhFSB9yD8',
      },
    } as Request;

    const ensure = await ensureAuthenticated(request, response, next);
    expect(ensure).toBeUndefined();
  });
  it('should be able token undefinied', async () => {
    const request = {
      headers: {
        authorization: '',
      },
    } as Request;
    const ensure = ensureAuthenticated(request, response, next);

    await expect(ensure).rejects.toEqual(new AppError('Token missing', 401));
  });

  it('shoul be able user token not', async () => {
    const request = {
      headers: {
        authorization: 'assdsjdjasfjsdfj',
      },
    } as Request;

    const ensure = ensureAuthenticated(request, response, next);

    await expect(ensure).rejects.toEqual(new AppError('Token missing', 401));
  });

  it('shoul be able user token invalid', async () => {
    const request = {
      headers: {
        authorization: 'Bearersldsldçlsçdl ',
      },
    } as Request;

    const ensure = ensureAuthenticated(request, response, next);

    await expect(ensure).rejects.toEqual(
      new AppError('invalid JWT Token', 401),
    );
  });
});
