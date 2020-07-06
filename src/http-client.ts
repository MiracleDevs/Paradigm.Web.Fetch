import { IHttpInterceptor } from "./interceptors/http-interceptor.interface";

export type QueryString = { [key: string]: any };

export class HttpClient
{
    interceptors: IHttpInterceptor[];

    constructor()
    {
        this.interceptors = [];
    }

    /**
     * Registers a new interceptor to this http client instance.
     * @param interceptor An interceptor
     */
    registerInterceptor(interceptor: IHttpInterceptor): void
    {
        if (!interceptor)
            throw new Error("The interceptor can not be null or undefined");

        this.interceptors.push(interceptor);
    }

    /**
     * Registers an array of interceptors to this http client instance.
     * @param interceptors An array of interceptors.
     */
    registerInterceptors(interceptors: IHttpInterceptor[]): void
    {
        interceptors.forEach(x => this.registerInterceptor(x));
    }

    /**
     * Sends a http request, and prepares the request and response with the registered interceptors.
     * @param request The http request.
     */
    async request(request: Request): Promise<Response>
    {
        if (!request)
            throw new Error("The request can not be null or undefined.");

        let pipedRequest = request;

        // iterates over the interceptors and prepares the request.
        for (const interceptor of this.interceptors)
        {
            if (interceptor.beforeSend)
            {
                pipedRequest = await interceptor.beforeSend(pipedRequest);
            }
        }

        let pipedResponse = await fetch(request);

        // iterates over the interceptors and prepares the response.
        for (const interceptor of this.interceptors)
        {
            if (interceptor.afterReceive)
            {
                pipedResponse = await interceptor.afterReceive(pipedResponse);
            }
        }

        return pipedResponse;
    }

    async get(url: string, queryString?: QueryString): Promise<Response>
    {
        return await this.request(new Request(this.getUrl(url, queryString), { method: 'GET' }));
    }

    async post(url: string, queryString?: QueryString, body?: BodyInit): Promise<Response>
    {
        return await this.request(new Request(this.getUrl(url, queryString), { method: 'POST', body: body }));
    }

    async put<T>(url: string, queryString?: QueryString, body?: BodyInit): Promise<Response>
    {
        return await this.request(new Request(this.getUrl(url, queryString), { method: 'PUT', body: body }));
    }

    async patch<T>(url: string, queryString?: QueryString, body?: any): Promise<Response>
    {
        return await this.request(new Request(this.getUrl(url, queryString), { method: 'PATCH', body: body }));
    }

    async delete<T>(url: string, queryString?: QueryString): Promise<Response>
    {
        return await this.request(new Request(this.getUrl(url, queryString), { method: 'DELETE' }));
    }

    private getUrl(url: string, queryString?: QueryString): string
    {
        if (!queryString)
            return url;

        for (const key in queryString.getOwnProperties())
        {
            url = url.replace(`{${key}}`, this.getStringValue(queryString[key]));
        }

        return url;
    }

    private getStringValue(value: any): string
    {
        if (value === null || value === undefined)
        {
            return '';
        }

        if (this.getTypeName(value) === 'Number' ||
            this.getTypeName(value) === 'String' ||
            this.getTypeName(value) === 'Boolean')
        {
            return value.toString();
        }

        if (value instanceof Date)
        {
            return value.toJSON();
        }

        return '';
    }

    private getTypeName(objectInstance: any): string
    {
        if (objectInstance === null || objectInstance === undefined)
        {
            throw new Error('Object can not be null.');
        }

        const funcNameRegex = /function (.{1,})\(/;
        const results = (funcNameRegex).exec((objectInstance).constructor.toString());

        return (results && results.length > 1) ? results[1] : '';
    }
}