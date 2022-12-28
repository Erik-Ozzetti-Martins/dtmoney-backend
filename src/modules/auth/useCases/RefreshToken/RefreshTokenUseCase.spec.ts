import { UsersTokensRepositoryInMemory } from '@/modules/auth/repositories/implementations/UsersTokens.Repository.InMemory';
import { DateJs } from '@/utils/Date';
import { RefreshTokenUseCase } from './RefreshToken.UseCase';

let usersTokensRepository: UsersTokensRepositoryInMemory;
let dateProvider: DateJs;

let refreshTokenUseCase: RefreshTokenUseCase;

describe('Refresh Token Use Case', () => {
  beforeEach(() => {
    usersTokensRepository = new UsersTokensRepositoryInMemory();
    dateProvider = new DateJs();

    refreshTokenUseCase = new RefreshTokenUseCase(
      usersTokensRepository,
      dateProvider,
    );
  });

  it('should be able to refresh a token', async () => {
    await usersTokensRepository.create({
      expires_date: dateProvider.addDays(3),
      refresh_token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RBQUBnbWFpbC5jb20iLCJpYXQiOjE2NzE5MTQ4NjMsImV4cCI6MTY3MzIxMDg2Mywic3ViIjoiNzUwNjZmMDYtODkxMS00Y2MwLWE5ZGMtZGI5NjQ2YWFkNjQwIn0.z9qStdm77sFQRh_040e6xlfbXXLH47vMWVCBzupEy34',
      user_id: '75066f06-8911-4cc0-a9dc-db9646aad640',
    });

    const response = await refreshTokenUseCase.execute(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RBQUBnbWFpbC5jb20iLCJpYXQiOjE2NzE5MTQ4NjMsImV4cCI6MTY3MzIxMDg2Mywic3ViIjoiNzUwNjZmMDYtODkxMS00Y2MwLWE5ZGMtZGI5NjQ2YWFkNjQwIn0.z9qStdm77sFQRh_040e6xlfbXXLH47vMWVCBzupEy34',
    );
    expect(response.token).toBeTruthy();
    expect(response.refresh_token).toBeTruthy();
  });
});
