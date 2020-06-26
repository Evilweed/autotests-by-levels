import {Response} from '../core/got/Response';
import * as Chai from 'chai';

export class BaseAsserts {

    public readonly expect: Chai.ExpectStatic;

    constructor(protected readonly data: Response) {
        this.expect = Chai.expect;
    }

    call(data: any): {expect: Chai.Assertion} {
        return {
            expect: this.expect(data),
        };
    }
}
