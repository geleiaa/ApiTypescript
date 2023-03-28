import 'reflect-metadata';
import request from 'supertest';

const CREATE_USER_MOCK = {
  name: 'Test User 1',
  email: 'test1@mail.com',
  password: '123456',
};

const LOGIN_USER_MOCK = {
  email: 'test1@mail.com',
  password: '123456',
};

const USER_FOGOT_PASS_MOCK = {
  email: 'test1@mail.com',
};

describe('Teste User Serivces', () => {
  it('Create User', async () => {
    const resp = await request('http://localhost:1234')
      .post('/users')
      .send(CREATE_USER_MOCK)
      .expect(201)
      .expect(res => {
        res.body.message = 'usuário criado!!';
      });

    console.log('RESP =>', resp.body);
  });

  it('User Login', async () => {
    const resp = await request('http://localhost:1234')
      .post('/session')
      .send(LOGIN_USER_MOCK)
      .expect(200)
      .expect(res => {
        res.body.message = 'você logou!!';
      });

    console.log('RESP =>', resp.body);
  });

  it('Forgot Pass', async () => {
    const resp = await request('http://localhost:1234')
      .post('/forgot')
      .send(USER_FOGOT_PASS_MOCK)
      .expect(res => {
        res.body.message = 'Email Enviado';
      });

    console.log('RESP =>', resp.body);
  });
});
