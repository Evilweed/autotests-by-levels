import {describe, it} from 'mocha';
import {App} from '../app';

const app = new App();

describe('Users', () => {

    describe('Contract tests', () => {
        it('get by id', async () => {
            const {body} = await app.usersController.getById(2);
            body.assertContract();
        });
    });
});
