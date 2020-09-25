import assert from 'assert';
import { Server } from 'http';

import { AfterAll, Before, BeforeAll, Given, Then } from 'cucumber';
import request from 'supertest';
import app from '../../../../../src/apps/mooc_backend/app';
import container from '../../../../../src/apps/mooc_backend/config/dependency-injection';
import { EnvironmentArranger } from '../../../../Contexts/Shared/infrastructure/arranger/EnvironmentArranger';

let _request: request.Test;
let _response: request.Response;

Given('I send a GET request to {string}', (route: string) => {
  _request = request(app).get(route);
});

Given('I send a PUT request to {string} with body:', (route: string, body: string) => {
  _request = request(app).put(route).send(JSON.parse(body));
});

Then('the response status code should be {int}', async (status: number) => {
  _response = await _request.expect(status);
});

Then('the response should be empty', () => {
  assert.deepEqual(_response.body, {});
});

Then('the response content should be:', response => {
  assert.deepEqual(_response.body, JSON.parse(response));
});

let server: Server;
Before(async () => {
  const environmentArranger: Promise<EnvironmentArranger> = container.get('Mooc.EnvironmentArranger');
  await (await environmentArranger).arrange();
});

BeforeAll(async () => {
  server = await startServer();
});

AfterAll(async () => {
  const environmentArranger: Promise<EnvironmentArranger> = container.get('Mooc.EnvironmentArranger');
  await (await environmentArranger).arrange();
  await (await environmentArranger).close();
  await new Promise(resolve => server.close(resolve));
});

async function startServer(): Promise<Server> {
  return new Promise((resolve, reject) => {
    server = app.listen(3001, async () => {
      console.log(`  Backoffice frontend is running at http://localhost:3001 in ${app.get('env')} mode`);
      console.log('  Press CTRL-C to stop\n');
      resolve(server);
    });
  });
}
