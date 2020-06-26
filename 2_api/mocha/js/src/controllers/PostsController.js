const BaseController = require('./BaseController')

class PostsController extends BaseController {

    constructor() {
        super('/posts');
    }

    getAll() {
        return super.getAll('/posts/posts.json');
    }

    getById(id) {
        return super.getById(id, '/posts/post.json');
    }
}

module.exports = PostsController;
