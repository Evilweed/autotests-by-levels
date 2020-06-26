import {BaseController} from './BaseController';

export class UsersController extends BaseController {

    constructor() {
        super('/users');
    }

    public getById(id: number) {
        return super.getById(id, '/users/user.json');
    }

}
