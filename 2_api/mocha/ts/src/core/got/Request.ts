import got, {Options} from 'got';
import {OptionsOfJSONResponseBody, OptionsOfTextResponseBody} from 'got/dist/source/types';
import {Response} from './Response';
import {Headers, Method} from 'got/dist/source/core';
import {URLSearchParams} from 'url';

export class Request {

    private _jsonSchema?: string;

    constructor(private _url: string, private _options?: Options) {
    }

    public options(options: OptionsOfTextResponseBody | OptionsOfJSONResponseBody) {
        this._options = options;
        return this;
    }

    public method(name: Method) {
        this._options!.method = name;
        return this;
    }

    public headers(headers: Headers) {
        this._options!.headers = headers;
        return this;
    }

    public url(url: string, isNew = true) {
        this._url = isNew ? url : this._url + url;
        return this;
    }

    public qs(qs: string | { [key: string]: string | number | boolean | null; } | URLSearchParams) {
        this._options!.searchParams = qs;
        return this;
    }

    public jsonSchema(path?: string) {
        this._jsonSchema = path;
        return this;
    }

    public async send(): Promise<Response> {
        const result = await got(this._url, this._options);
        return new Response(result, this._jsonSchema);
    }
}
