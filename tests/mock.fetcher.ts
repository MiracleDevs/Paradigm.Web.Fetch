import { IFetcher } from "../src/fetchers/fetcher.interface";
import { HttpRequest } from "../src/http-request";
import { HttpResponse } from "../src/http-response";

export class MockFetcher implements IFetcher
{
    constructor(private parameters: {
        status: number,
        statusText: string,
        headers: string[][],
        trailer: string[][],
        ok: boolean,
        redirected: boolean,
        type: ResponseType
    } = {
            status: 200,
            statusText: 'OK',
            headers: [['header', 'value']],
            trailer: [['header', 'value']],
            ok: true,
            redirected: false,
            type: 'default'
        })
    {
    }

    async fetch(request: HttpRequest): Promise<HttpResponse>
    {
        return new HttpResponse({
            url: request.url,
            status: this.parameters.status,
            statusText: this.parameters.statusText,
            headers: this.parameters.headers,
            trailer: new Promise(r => r(this.parameters.trailer)),
            ok: this.parameters.ok,
            redirected: this.parameters.redirected,
            type: this.parameters.type,
            json: async () => { },
            text: async () => '',
            arrayBuffer: async () => new ArrayBuffer(1),
            formData: async () => null,
            blob: async () => null,
            clone: () => { }
        }, request);
    }
}