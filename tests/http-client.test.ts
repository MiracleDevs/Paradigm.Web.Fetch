import { HttpClient } from "../src/http-client";
import { ContentTypeInterceptor } from "../src/interceptors/content-type.interceptor";
import { AuthorizationInterceptor } from "../src/interceptors/authorization.interceptor";
import { AddHeaderInterceptor } from "../src/interceptors/add-header.interceptor";
import { MockFetcher } from './mock.fetcher';
import { HttpRequest } from "../src/http-request";
import { IHttpInterceptor } from "../src/interceptors/http-interceptor.interface";
import { HttpResponse } from "../src/http-response";

describe("HttpClient", () =>
{
    it("should allow create a new instance", () => expect(new HttpClient()).not.toBeNull());

    it("should allow to register interceptors", () =>
    {
        const httpClient = new HttpClient();
        const contentType = new ContentTypeInterceptor('application/json');
        const authorization = new AuthorizationInterceptor('token');
        const header = new AddHeaderInterceptor('header', 'value');

        httpClient.registerInterceptor(contentType);
        httpClient.registerInterceptors([authorization, header]);

        expect(httpClient.isRegistered(contentType)).toBeTruthy();
        expect(httpClient.isRegistered(authorization)).toBeTruthy();
        expect(httpClient.isRegistered(header)).toBeTruthy();
    });

    it("should fail if interceptor is null or undefined", () =>
    {
        const httpClient = new HttpClient();
        expect(()=> httpClient.registerInterceptor(null)).toThrowError("The interceptor can not be null or undefined.");
        expect(()=> httpClient.registerInterceptor(undefined)).toThrowError("The interceptor can not be null or undefined.");
    });

    it("should allow to remove interceptors", () =>
    {
        const httpClient = new HttpClient();
        const contentType = new ContentTypeInterceptor('application/json');
        const authorization = new AuthorizationInterceptor('token');
        const header = new AddHeaderInterceptor('header', 'value');

        httpClient.registerInterceptor(contentType);
        httpClient.registerInterceptors([authorization, header]);

        httpClient.removeInterceptor(contentType);
        httpClient.removeInterceptor(authorization);
        httpClient.removeInterceptor(header);

        expect(httpClient.isRegistered(contentType)).toBeFalsy();
        expect(httpClient.isRegistered(authorization)).toBeFalsy();
        expect(httpClient.isRegistered(header)).toBeFalsy();
    });

    it("should fail if try to remove an interceptor that wasn't registered", () =>
    {
        const httpClient = new HttpClient();
        expect(()=> httpClient.removeInterceptor(new ContentTypeInterceptor('application/json'))).toThrowError("The interceptor does not belong to the http client and can not be removed.");
        expect(()=> httpClient.removeInterceptor(undefined)).toThrowError("The interceptor does not belong to the http client and can not be removed.");
        expect(()=> httpClient.removeInterceptor(null)).toThrowError("The interceptor does not belong to the http client and can not be removed.");
    });

    it("should allow to customize the fetcher", () =>
    {
        const httpClient = new HttpClient();
        const fetcher = new MockFetcher();

        expect(() => httpClient.setFetcher(fetcher)).not.toThrowError();
    });

    it("should fail if running on node with the default fetcher for the web", async () =>
    {
        const httpClient = new HttpClient();
        expect(() => httpClient.get('https://google.com')).rejects.toThrowError('window is not defined');
    });

    it("should make request", async () =>
    {
        const httpClient = new HttpClient();
        const fetcher = new MockFetcher();
        const request = new HttpRequest('https://google.com');

        httpClient.setFetcher(fetcher);
        const response = await httpClient.request(request);

        expect(response).not.toBeNull();
        expect(response.url).toBe('https://google.com');
        expect(response.status).toBe(200);
        expect(response.statusText).toBe('OK');
        expect(response.ok).toBe(true);
        expect(response.redirected).toBe(false);
        expect(response.headers).toHaveLength(1);
        expect(response.trailer).resolves.toHaveLength(1);
        expect(response.type).toBe('default');
        expect(response.request).toBe(request);
        expect(response.json()).resolves.not.toBeNull();
        expect(response.text()).resolves.not.toBeNull();
        expect(response.formData()).resolves.toBeNull();
        expect(response.blob()).resolves.toBeNull();
        expect(response.arrayBuffer()).resolves.not.toBeNull();
        expect(response.cloneInternalResponse()).not.toBeNull();
    });

    it("should fail if request is null or undefined", () =>
    {
        const httpClient = new HttpClient();
        expect(()=> httpClient.request(null)).rejects.toThrowError("The request can not be null or undefined.");
        expect(()=> httpClient.request(undefined)).rejects.toThrowError("The request can not be null or undefined.");
    });

    it("should make get request", async () =>
    {
        const httpClient = new HttpClient();
        httpClient.setFetcher(new MockFetcher());
        const response = await httpClient.get('https://google.com');

        expect(response.request.url).toBe('https://google.com');
        expect(response.request.method).toBe('GET');
    });

    it("should make get request", async () =>
    {
        const httpClient = new HttpClient();
        httpClient.setFetcher(new MockFetcher());
        const response = await httpClient.get('https://google.com');

        expect(response.request.url).toBe('https://google.com');
        expect(response.request.method).toBe('GET');
    });

    it("should make post request", async () =>
    {
        const httpClient = new HttpClient();
        httpClient.setFetcher(new MockFetcher());
        const response = await httpClient.post('https://google.com', null, 'body');

        expect(response.request.url).toBe('https://google.com');
        expect(response.request.method).toBe('POST');
        expect(response.request.body).toBe('body');
    });

    it("should make put request", async () =>
    {
        const httpClient = new HttpClient();
        httpClient.setFetcher(new MockFetcher());
        const response = await httpClient.put('https://google.com', null, 'body');

        expect(response.request.url).toBe('https://google.com');
        expect(response.request.method).toBe('PUT');
        expect(response.request.body).toBe('body');
    });

    it("should make patch request", async () =>
    {
        const httpClient = new HttpClient();
        httpClient.setFetcher(new MockFetcher());
        const response = await httpClient.patch('https://google.com', null, 'body');

        expect(response.request.url).toBe('https://google.com');
        expect(response.request.method).toBe('PATCH');
        expect(response.request.body).toBe('body');
    });

    it("should make delete request", async () =>
    {
        const httpClient = new HttpClient();
        httpClient.setFetcher(new MockFetcher());
        const response = await httpClient.delete('https://google.com');

        expect(response.request.url).toBe('https://google.com');
        expect(response.request.method).toBe('DELETE');
    });

    it("should replace query string parameters", async () =>
    {
        const httpClient = new HttpClient();
        httpClient.setFetcher(new MockFetcher());
        const response = await httpClient.get('https://example.com/api/{clientId}/{isEnabled}/{name}?date={date}', { clientId: 1, isEnabled: true, name: 'John', date: new Date('2012-12-12T12:00:00.000Z') });

        expect(response.request.url).toBe('https://example.com/api/1/true/John?date=2012-12-12T12:00:00.000Z');
    });

    it("should fail if the query string parameters are invalid", () =>
    {
        const httpClient = new HttpClient();
        httpClient.setFetcher(new MockFetcher());
        expect(() => httpClient.get('https://example.com/api/{clientId}', { clientId: undefined })).rejects.toThrowError("The query string parameter 'clientId' is undefined or an invalid object type.");
        expect(() => httpClient.get('https://example.com/api/{clientId}', { clientId: null })).rejects.toThrowError("The query string parameter 'clientId' is undefined or an invalid object type.");
        expect(() => httpClient.get('https://example.com/api/{clientId}', { clientId: {} })).rejects.toThrowError("The query string parameter 'clientId' is undefined or an invalid object type.");
    });

    it("should call interceptors", async () =>
    {
        let beforeSend = '';
        let afterReceive = '';

        class InterceptorBefore1 implements IHttpInterceptor
        {
            beforeSend(request: HttpRequest): HttpRequest
            {
                beforeSend += 'InterceptorBefore1';
                return request;
            }
        }

        class InterceptorBefore2 implements IHttpInterceptor
        {
            beforeSend(request: HttpRequest): HttpRequest
            {
                beforeSend += ', InterceptorBefore2';
                return request;
            }
        }

        class Interceptor implements IHttpInterceptor
        {
            beforeSend(request: HttpRequest): HttpRequest
            {
                beforeSend += ', Interceptor';
                return request;
            }

            afterReceive(response: HttpResponse): HttpResponse
            {
                afterReceive += 'Interceptor'
                return response;
            }
        }

        class InterceptorAfter1 implements IHttpInterceptor
        {
            afterReceive(response: HttpResponse): HttpResponse
            {
                afterReceive += ', InterceptorAfter1'
                return response;
            }
        }

        class InterceptorAfter2 implements IHttpInterceptor
        {
            afterReceive(response: HttpResponse): HttpResponse
            {
                afterReceive += ', InterceptorAfter2'
                return response;
            }
        }

        const httpClient = new HttpClient();
        httpClient.setFetcher(new MockFetcher());
        httpClient.registerInterceptors([
            new InterceptorBefore1(),
            new InterceptorBefore2(),
            new InterceptorAfter1(),
            new InterceptorAfter2(),
            new Interceptor()]);

        await httpClient.get('https://google.com');

        expect(beforeSend).toBe("InterceptorBefore1, InterceptorBefore2, Interceptor");
        expect(afterReceive).toBe("Interceptor, InterceptorAfter2, InterceptorAfter1");
    });
});