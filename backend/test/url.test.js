import { test, describe } from 'node:test';
import assert from 'node:assert';
import supertest from "supertest"
import app from './app.mock.js';
const request = supertest(app);

describe('URL Shortener Basic Tests', () => {
  test('Should return 400 if URL is missing', async () => {
    const res = await request.post('/new').send({});
    assert.strictEqual(res.statusCode, 400);
    assert.strictEqual(res.body.message, 'URL is required!');
  });

  test('Should return 400 if URL format is invalid', async () => {
    const res = await request.post('/new').send({ url: 'bad-url' });
    assert.strictEqual(res.statusCode, 400);
    assert.strictEqual(res.body.message, 'Invalid URL format');
  });
});
