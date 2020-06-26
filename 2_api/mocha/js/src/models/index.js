const {Validator} = require('jsonschema');
const validator = new Validator();

const postSchema = require('./posts/post.json');
const postsSchema = require('./posts/posts.json');

const userSchema = require('./users/user.json');

validator.addSchema(postSchema, postSchema.id);
validator.addSchema(postsSchema, postsSchema.id);
validator.addSchema(userSchema, userSchema.id);

module.exports = {
    validate: (instance, schema) => validator.validate(instance, schema)
}
