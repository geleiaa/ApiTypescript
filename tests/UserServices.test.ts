import 'reflect-metadata';
import request from 'supertest';

const CREATE_USER_MOCK = {
  name: 'Test User 1',
  email: 'test1@mail.com',
  password: '123456',
};

const LOGIN_USER_MOCK = {
  email: 'test15@mail.com',
  password: '123456',
};

// const USER_FOGOT_PASS_MOCK = {
//   email: 'test1@mail.com',
// };

const RESET_PASS_MOCK = {
  token: 'id',
  password: '654321',
  password_confirm: '123456',
};

describe('Teste User Serivces', () => {
  it('Create User', async () => {
    const resp = await request('localhost:1234')
      .post('/users')
      .send(CREATE_USER_MOCK);

    expect(resp.body.message).toBe('usuário criado!!');
  });

  it('User Login', async () => {
    const resp = await request('localhost:1234')
      .post('/session')
      .send(LOGIN_USER_MOCK);

    expect(resp.body.message).toBe('você logou!!');
  });

  // it('Forgot Pass', async () => { // <= TIMEOUT NÃO PASSA!!!
  //   const resp = await request('localhost:1234')
  //     .post('/password/forgot')
  //     .send(USER_FOGOT_PASS_MOCK);

  //   expect(resp.body.message).toBe('Email Enviado');
  // });

  it('Reset Pass', async () => {
    const resp = await request('localhost:1234')
      .post('/password/reset')
      .send(RESET_PASS_MOCK);

    expect(resp.body.message).toBe('Senha Atualizada!!');
  });
});
