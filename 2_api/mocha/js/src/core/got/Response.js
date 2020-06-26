const ResponseAsserts = require('../../asserts/ResponseAsserts');

class Response {
    constructor(response, jsonSchema = '') {
        this.response = response;
        this.jsonSchema = jsonSchema;
        this.asserts = new ResponseAsserts(this);
    }

    /**
     * @return {{
     *  get: (function(): any),
     *  assertContract: (function(): void)
     *  expect: Chai.Assertion,
     *  }}
     */
    get body() {
        return {
            get: () => this.response.body,
            assertContract: () => this.asserts.contract(this.jsonSchema),
            ...this.asserts.call(this.response.body) // --> expect: this.asserts.expect(this.response.body)
        };
    }

    /**
     * @return {string}
     */
    get httpVersion() {
        return this.response.httpVersion;
    }

    /**
     * @return {{
     *  get: (function(): Headers),
     *  expect: Chai.Assertion
     *  }}
     */
    get headers() {
        return {
            get: () => this.response.headers,
            ...this.asserts.call(this.response.headers)
        };
    }

    /**
     * @return {string}
     */
    get url() {
        return this.response.url;
    }

    /**
     * @return {Method}
     */
    get method() {
        return this.response.method;
    }

    /**
     * @return {{
     *  statusMessage: string,
     *  statusCode: number[]
     *  }}
     */
    get status() {
        return {
            statusCode: this.response.statusCode,
            statusMessage: this.response.statusMessage,
        };
    }

    /**
     * @return {string}
     */
    get requestUrl() {
        return this.response.requestUrl;
    }

    /**
     * @return {string}
     */
    get ip() {
        return this.response.ip;
    }
}

module.exports = Response;
