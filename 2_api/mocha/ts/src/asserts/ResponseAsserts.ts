import {BaseAsserts} from './BaseAsserts';
import {validate} from '../models';
import {join, resolve} from 'path';

export class ResponseAsserts extends BaseAsserts {

    contract(pathToJsonSchema: string): void {
        const schema = require(resolve(join('src', 'models', pathToJsonSchema)));
        const {valid, errors} = validate(this.data.body.get(), schema);

        if (!valid) {
            throw new Error(JSON.stringify(errors[0]).replace(/,/g, ',\n\t'));
        }
    }

}
