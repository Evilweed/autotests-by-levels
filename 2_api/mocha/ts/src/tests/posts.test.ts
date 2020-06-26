import {describe, it} from 'mocha';
import {App} from '../app';

const app = new App();

describe('Posts', () => {

    describe('Contract tests', () => {

        it('get all', async () => {
            const {body} = await app.postsController.getAll();
            body.assertContract();
        });

        it('get by id', async () => {
            const {body} = await app.postsController.getById(1);
            body.assertContract();
        });
    });

    describe('Component tests', () => {

        it('get all', async () => {
            const {body} = await app.postsController.getAll();
            body.expect.to.have.lengthOf(100);
        });

        it('get by id', async () => {
            const {body} = await app.postsController.getById(1);
            body.expect.to.haveOwnProperty('id').and.to.be.deep.equal(1);
        });
    });
});
