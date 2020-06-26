import {BASE_URL} from '../../api.conf';
import {Request} from '../core/got/Request';

export class BaseController {

    protected readonly request: () => Request;

    constructor(postfix: string) {
        this.request = () => new Request(BASE_URL + postfix, {responseType: 'json'});
    }

    public getAll(jsonSchemaPath?: string) {
        return this.request()
            .jsonSchema(jsonSchemaPath)
            .send();
    }

    public getById(id: number, jsonSchemaPath?: string) {
        return this.request()
            .url(`/${id}`, false)
            .jsonSchema(jsonSchemaPath)
            .send();
    }
}
