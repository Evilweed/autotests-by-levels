import {PostsController} from './controllers/PostsController';
import {UsersController} from './controllers/UsersController';

export class App {

    public readonly postsController: PostsController;
    public readonly usersController: UsersController;

    constructor() {
        this.postsController = new PostsController();
        this.usersController = new UsersController();
    }

}
