import { newServer } from 'mock-xmlhttprequest';
import api from './api';
import { assert } from 'chai';

type Response = { message: string };

describe('Api test suite', () => {
  const server = newServer({
    get: ['/url', { headers: { 'Content-Type': 'application/json' }, body: '{ "message": "Get Success!" }' }],
    post: ['/url', { headers: { 'Content-Type': 'application/json' }, body: '{ "message": "Post Success!" }' }],
    put: ['/url', { headers: { 'Content-Type': 'application/json' }, body: '{ "message": "Put Success!" }' }],
    delete: ['/url', { headers: { 'Content-Type': 'application/json' }, body: '{ "message": "Delete Success!" }' }],
  });

  try {
    server.install();

    it('test get request', async () => {
      api.get<Response>('/url').then((result) => assert.equal(result.message, 'Get Success!'));
    });

    it('test post request', async () => {
      api.post<Response>('/url').then((result) => assert.equal(result.message, 'Post Success!'));
    });

    it('test put request', async () => {
      api.put<Response>('/url').then((result) => assert.equal(result.message, 'Put Success!'));
    });

    it('test delete request', async () => {
      api.delete<Response>('/url').then((result) => assert.equal(result.message, 'Delete Success!'));
    });
  } finally {
    server.remove();
  }
});
