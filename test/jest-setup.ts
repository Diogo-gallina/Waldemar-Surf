import { SetupServer } from '@src/server';
import supertest from 'supertest';

let server: SetupServer;

beforeAll(async () => {
  jest.setTimeout(10000);
  server = new SetupServer();
  await server.init();
  global.testRequest = supertest(server.getApp());
});

afterAll(async () => {
  await server.close();
});
