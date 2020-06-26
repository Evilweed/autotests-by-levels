const BaseController = require('./BaseController')

class UsersController extends BaseController {

    constructor() {
        super('/users');
    }

    getById(id) {
        return super.getById(id, '/users/user.json');
    }

}

module.exports = UsersController;
