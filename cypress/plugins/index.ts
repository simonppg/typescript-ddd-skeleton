import container from '../../src/apps/mooc_backend/config/dependency-injection';
import { EnvironmentArranger } from '../../tests/Contexts/Shared/infrastructure/arranger/EnvironmentArranger';
import { seed } from '../../src/apps/backoffice/frontend/seed';
import cucumber from 'cypress-cucumber-preprocessor';

const environmentArranger: Promise<EnvironmentArranger> = container.get('Mooc.EnvironmentArranger');

export default (on: Cypress.PluginEvents, config: Cypress.PluginConfig) => {
  on('task', {
    async 'reset:db'() {
      await (await environmentArranger).arrange();
      await seed();
      return null;
    }
  });
  on('file:preprocessor', cucumber());
};


// const cucumber = require('cypress-cucumber-preprocessor').default
