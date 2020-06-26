const got = require('got')
const Response = require('./Response');

class Request {

    /**
     * @param url {string}
     * @param options {Options}
     */
    constructor(url, options = {}) {
        this._url = url;
        this._options = options
    }

    /**
     * @param options {OptionsOfTextResponseBody | OptionsOfJSONResponseBody}
     * @return {Request}
     */
    options(options) {
        this._options = options;
        return this;
    }

    /**
     * @param name {Method}
     * @return {Request}
     */
    method(name) {
        this._options.method = name;
        return this;
    }

    /**
     * @param headers {Headers}
     * @return {Request}
     */
    headers(headers) {
        this._options.headers = headers;
        return this;
    }

    /**
     * @param url {string}
     * @param isNew {boolean}
     * @return {Request}
     */
    url(url, isNew = true) {
        this._url = isNew ? url : this._url + url;
        return this;
    }

    /**
     * @param qs {{key: string}}
     * @return {Request}
     */
    qs(qs) {
        this._options.searchParams = qs;
        return this;
    }

    /**
     * @param path {string}
     * @return {Request}
     */
    jsonSchema(path) {
        this._jsonSchema = path;
        return this;
    }

    /**
     * @return {Promise<Response>}
     */
    async send() {
        const result = await got(this._url, this._options);
        return new Response(result, this._jsonSchema);
    }

}

module.exports = Request;
