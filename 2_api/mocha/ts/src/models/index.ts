import {Schema, Validator} from 'jsonschema';
import * as postSchema from './posts/post.json';
import * as postsSchema from './posts/posts.json';
import * as userSchema from './users/user.json';

const validator = new Validator();

validator.addSchema(postSchema, postSchema.id);
validator.addSchema(postsSchema, postsSchema.id);
validator.addSchema(userSchema, userSchema.id);

export const validate = (instance: any, schema: Schema) => validator.validate(instance, schema);
