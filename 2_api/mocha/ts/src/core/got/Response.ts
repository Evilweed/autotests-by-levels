import {ResponseAsserts} from '../../asserts/ResponseAsserts';
import {Method} from 'got/dist/source/core';

export class Response {

    private readonly asserts: ResponseAsserts;

    constructor(private readonly response: any, private readonly jsonSchema?: string) {
        this.asserts = new ResponseAsserts(this);
    }

    get body(): {get: () => any, assertContract: () => void, expect: Chai.Assertion} {
        return {
            get: () => this.response.body,
            assertContract: () => this.asserts.contract(this.jsonSchema!),
            ...this.asserts.call(this.response.body) // --> expect: this.asserts.expect(this.response.body)
        };
    }

    get httpVersion(): string {
        return this.response.httpVersion;
    }

    get headers(): {get: () => Headers, expect: Chai.Assertion} {
        return {
            get: () => this.response.headers,
            ...this.asserts.call(this.response.headers)
        };
    }

    get url(): string {
        return this.response.url;
    }

    get method(): Method {
        return this.response.method;
    }

    get status(): { statusCode: number[], statusMessage: string } {
        return {
            statusCode: this.response.statusCode,
            statusMessage: this.response.statusMessage,
        };
    }

    get requestUrl(): string {
        return this.response.requestUrl;
    }

    get ip(): string {
        return this.response.ip;
    }
}
