import { AddHeaderInterceptor } from "../src/interceptors/add-header.interceptor";
import { HttpRequest } from "../src/http-request";

describe("AddHeaderInterceptor", () =>
{
    it("should allow create a new instance", () => expect(new AddHeaderInterceptor('header', 'value')).not.toBeNull());

    it("should add the headers", () =>
    {
        const request = new HttpRequest('https://google.com');
        const interceptor = new AddHeaderInterceptor('header', 'value');
        const afterRequest = interceptor.beforeSend(request);

        expect(afterRequest).toBe(request);
        expect(request.url).toBe('https://google.com');
        expect(request.headers).not.toBeNull();
        expect(request.headers.has('header')).toBeTruthy();
        expect(request.headers.get('header')).toBe('value');
    });

    it("should append the headers", () =>
    {
        const request = new HttpRequest('https://google.com');
        request.headers.set('header1', 'value1');
        const interceptor = new AddHeaderInterceptor('header2', 'value2');
        const afterRequest = interceptor.beforeSend(request);

        expect(afterRequest).toBe(request);
        expect(request.url).toBe('https://google.com');
        expect(request.headers).not.toBeNull();
        expect(request.headers.has('header1')).toBeTruthy();
        expect(request.headers.get('header1')).toBe('value1');
        expect(request.headers.has('header2')).toBeTruthy();
        expect(request.headers.get('header2')).toBe('value2');
    });
});
