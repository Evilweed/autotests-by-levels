const {describe, it} = require('mocha');
const App = require('../app');

const app = new App();

describe('Users', () => {

    describe('Contract tests', () => {
        it('get by id', async () => {
            const {body} = await app.usersController.getById(2);
            body.assertContract();
        });
    });
});
