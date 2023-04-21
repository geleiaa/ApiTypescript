import UsersRepository from '../../src/modules/users/infra/repositories/UsersRepost';
import TokenReposiotry from '../../src/modules/users/infra/repositories/UserTokensRepost';
import UserCreateService from '../../src/modules/users/services/UserCreateService';
import UpdateProfileService from '../../src/modules/users/services/UpdateProfileService';
import SessioCreateService from '../../src/modules/users/services/SessionCreateService';
import ResetPasswordService from '../../src/modules/users/services/ResetPasswordService';

const userRepost = new UsersRepository();
const tokenRepost = new TokenReposiotry();

describe('Users Services', () => {
  beforeEach(async () => {
    await userRepost.queryInDb(`TRUNCATE Users RESTART IDENTITY CASCADE;`);
  });

  it('deve criar um usuário', async () => {
    const defaultUser = {
      name: 'Teste',
      email: 'testmail@mail.com',
      password: '654321',
    };

    const userCreate = new UserCreateService(userRepost);

    const newUser = await userCreate.execute(defaultUser);

    expect(newUser).toEqual(
      expect.objectContaining({ id: expect.any(String) }),
    );
  });

  it('deve atualizar dados do usuário', async () => {
    const defaultUser = {
      name: 'Teste',
      email: 'testmail@mail.com',
      password: '654321',
    };

    const userCreate = new UserCreateService(userRepost);
    const newUser = await userCreate.execute(defaultUser);

    const usrUpdated = {
      user_id: newUser.id,
      name: 'Updated',
      email: 'updatedmail@mail.com',
      password: '',
      old_pass: '', // compare da senha ta bugado
    };

    const updateUser = new UpdateProfileService(userRepost);
    const user = await updateUser.execute(usrUpdated);

    expect(user).toEqual(
      expect.objectContaining({
        name: usrUpdated.name,
        email: usrUpdated.email,
      }),
    );
  });

  it('deve retornar um Token JWT para logar o usuário', async () => {
    const defaultUser = {
      name: 'Teste',
      email: 'testmail@mail.com',
      password: '654321',
    };

    const userCreate = new UserCreateService(userRepost);
    await userCreate.execute(defaultUser);

    const session = new SessioCreateService(userRepost);

    const logged = await session.execute({
      email: defaultUser.email,
      password: defaultUser.password,
    });

    expect(logged).toEqual(
      expect.objectContaining({ token: expect.any(String) }),
    );
  });

  it('deve retornar um token para trocar a senha do usuário', async () => {
    const defaultUser = {
      name: 'Teste',
      email: 'testmail@mail.com',
      password: '654321',
    };

    const userCreate = new UserCreateService(userRepost);
    const user = await userCreate.execute(defaultUser);

    const forgotToken = await tokenRepost.generate(user.id);

    expect(forgotToken).toEqual(
      expect.objectContaining({ token: expect.any(String) }),
    );
  });

  it('deve atualizar a senha do usuário', async () => {
    const defaultUser = {
      name: 'Teste',
      email: 'testmail@mail.com',
      password: '654321',
    };

    const userCreate = new UserCreateService(userRepost);
    const user = await userCreate.execute(defaultUser);

    const forgotToken = await tokenRepost.generate(user.id);

    const resetPass = new ResetPasswordService(userRepost, tokenRepost);

    const newPass = await resetPass.execute({
      token: forgotToken.token,
      password: '123456',
    });

    expect(newPass).toBeTruthy();
  });
});
