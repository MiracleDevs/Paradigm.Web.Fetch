import { AuthorizationInterceptor } from "../src/interceptors/authorization.interceptor";
import { HttpRequest } from "../src/http-request";

describe("AuthorizationInterceptor", () =>
{
    it("should allow create a new instance", () => expect(new AuthorizationInterceptor('token value')).not.toBeNull());

    it("should add the headers", () =>
    {
        const request = new HttpRequest('https://google.com');
        const interceptor = new AuthorizationInterceptor('token value');
        const afterRequest = interceptor.beforeSend(request);

        expect(afterRequest).toBe(request);
        expect(request.url).toBe('https://google.com');
        expect(request.headers).not.toBeNull();
        expect(request.headers.has('x-auth')).toBeTruthy();
        expect(request.headers.get('x-auth')).toBe('token value');
    });

    it("should append the headers", () =>
    {
        const request = new HttpRequest('https://google.com');
        request.headers.set('header1', 'value1');
        const interceptor = new AuthorizationInterceptor('token value');
        const afterRequest = interceptor.beforeSend(request);

        expect(afterRequest).toBe(request);
        expect(request.url).toBe('https://google.com');
        expect(request.headers).not.toBeNull();
        expect(request.headers.has('header1')).toBeTruthy();
        expect(request.headers.get('header1')).toBe('value1');
        expect(request.headers.has('x-auth')).toBeTruthy();
        expect(request.headers.get('x-auth')).toBe('token value');
    });

    it("should override header name", () =>
    {
        const request = new HttpRequest('https://google.com');
        request.headers.set('header1', 'value1');
        const interceptor = new AuthorizationInterceptor('token value', 'authorization');
        const afterRequest = interceptor.beforeSend(request);

        expect(afterRequest).toBe(request);
        expect(request.url).toBe('https://google.com');
        expect(request.headers).not.toBeNull();
        expect(request.headers.has('header1')).toBeTruthy();
        expect(request.headers.get('header1')).toBe('value1');
        expect(request.headers.has('authorization')).toBeTruthy();
        expect(request.headers.get('authorization')).toBe('token value');
    });
});