import { IHttpInterceptor } from "./interceptors/http-interceptor.interface";
import { HttpRequest } from "./http-request";
import { HttpResponse } from "./http-response";
import { IFetcher } from "./fetchers/fetcher.interface";
import { WebFetcher } from "./fetchers/web.fetcher";

export type QueryString = { [key: string]: unknown };

export class HttpClient {
    private interceptors: IHttpInterceptor[];

    private fetcher: IFetcher;

    constructor() {
        this.interceptors = [];
        this.fetcher = new WebFetcher();
    }

    /**
     * Registers a new interceptor to this http client instance.
     * @param interceptor An interceptor
     */
    registerInterceptor(interceptor: IHttpInterceptor): void {
        if (!interceptor) throw new Error("The interceptor can not be null or undefined.");

        this.interceptors.push(interceptor);
    }

    /**
     * Registers an array of interceptors to this http client instance.
     * @param interceptors An array of interceptors.
     */
    registerInterceptors(interceptors: IHttpInterceptor[]): void {
        interceptors.forEach(x => this.registerInterceptor(x));
    }

    /**
     * Removes an interceptor from the interceptor collection.
     * @param interceptor Interceptor to be removed.
     */
    removeInterceptor(interceptor: IHttpInterceptor): void {
        const index = this.interceptors.indexOf(interceptor);

        if (index < 0) throw new Error("The interceptor does not belong to the http client and can not be removed.");

        this.interceptors.splice(index, 1);
    }

    /**
     * Checks if a given interceptor instance is registered.
     * @param interceptor Interceptor instance.
     */
    isRegistered(interceptor: IHttpInterceptor): boolean {
        return this.interceptors.indexOf(interceptor) >= 0;
    }

    /**
     * Sets the main fetcher.
     * A fetcher is in charge of making the actual request.
     * By default the http client will try to use the web implementation.
     * If running this library in a non-web context, like node, you should
     * implement a different fetcher, with node-fetch.
     * @param fetcher A fetcher instance
     */
    setFetcher(fetcher: IFetcher): void {
        this.fetcher = fetcher;
    }

    /**
     * Sends a http request, and prepares the request and response with the registered interceptors.
     * @param request The http request.
     */
    async request(request: HttpRequest): Promise<HttpResponse> {
        if (!request) throw new Error("The request can not be null or undefined.");

        let pipedRequest = request;

        // iterates over the interceptors and prepares the request.
        for (let i = 0; i < this.interceptors.length; i++) {
            const interceptor = this.interceptors[i];

            if (interceptor.beforeSend) {
                pipedRequest = await interceptor.beforeSend(pipedRequest);
            }
        }

        let pipedResponse = await this.fetcher.fetch(pipedRequest);

        // iterates over the interceptors and prepares the response.
        for (let i = this.interceptors.length - 1; i >= 0; i--) {
            const interceptor = this.interceptors[i];

            if (interceptor.afterReceive) {
                pipedResponse = await interceptor.afterReceive(pipedResponse);
            }
        }

        return pipedResponse;
    }

    async get(url: string, queryString?: QueryString): Promise<HttpResponse> {
        const request = new HttpRequest(this.getUrl(url, queryString));
        request.method = "GET";
        return await this.request(request);
    }

    async post(url: string, queryString?: QueryString, body?: BodyInit): Promise<HttpResponse> {
        const request = new HttpRequest(this.getUrl(url, queryString));
        request.method = "POST";
        request.body = body;
        return await this.request(request);
    }

    async put(url: string, queryString?: QueryString, body?: BodyInit): Promise<HttpResponse> {
        const request = new HttpRequest(this.getUrl(url, queryString));
        request.method = "PUT";
        request.body = body;
        return await this.request(request);
    }

    async patch(url: string, queryString?: QueryString, body?: any): Promise<HttpResponse> {
        const request = new HttpRequest(this.getUrl(url, queryString));
        request.method = "PATCH";
        request.body = body;
        return await this.request(request);
    }

    async delete(url: string, queryString?: QueryString): Promise<HttpResponse> {
        const request = new HttpRequest(this.getUrl(url, queryString));
        request.method = "DELETE";
        return await this.request(request);
    }

    private getUrl(url: string, queryString?: QueryString): string {
        if (!queryString) return url;

        for (const key in queryString) {
            const value = this.getStringValue(queryString[key]);

            if (value === null) throw new Error(`The query string parameter '${key}' is undefined or an invalid object type.`);

            url = url.replace(`{${key}}`, value);
        }

        return url;
    }

    private getStringValue(value: any): string | null {
        if (value === null || value === undefined) {
            return null;
        }

        if (typeof value === "number" || typeof value === "string" || typeof value === "boolean") {
            return value.toString();
        }

        if (value instanceof Date) {
            return value.toJSON();
        }

        return null;
    }
}
