import {BaseController} from './BaseController';

export class PostsController extends BaseController {

    constructor() {
        super('/posts');
    }

    public getAll() {
        return super.getAll('/posts/posts.json');
    }

    public getById(id: number) {
        return super.getById(id, '/posts/post.json');
    }
}
