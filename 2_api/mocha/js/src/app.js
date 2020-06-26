const PostsController = require('./controllers/PostsController');
const UsersController = require('./controllers/UsersController');

class App {

    constructor() {
        this.postsController = new PostsController();
        this.usersController = new UsersController();
    }

}

module.exports = App;
