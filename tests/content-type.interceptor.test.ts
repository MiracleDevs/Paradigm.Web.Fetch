import { ContentTypeInterceptor } from "../src/interceptors/content-type.interceptor";
import { HttpRequest } from "../src/http-request";

describe("ContentTypeInterceptor", () =>
{
    it("should allow create a new instance", () => expect(new ContentTypeInterceptor('application/json')).not.toBeNull());

    it("should add the headers", () =>
    {
        const request = new HttpRequest('https://google.com');
        const interceptor = new ContentTypeInterceptor('application/json');
        const afterRequest = interceptor.beforeSend(request);

        expect(afterRequest).toBe(request);
        expect(request.url).toBe('https://google.com');
        expect(request.headers).not.toBeNull();
        expect(request.headers.has('Content-Type')).toBeTruthy();
        expect(request.headers.get('Content-Type')).toBe('application/json');
    });

    it("should append the headers", () =>
    {
        const request = new HttpRequest('https://google.com');
        request.headers.set('header1', 'value1');
        const interceptor = new ContentTypeInterceptor('application/json');
        const afterRequest = interceptor.beforeSend(request);

        expect(afterRequest).toBe(request);
        expect(request.url).toBe('https://google.com');
        expect(request.headers).not.toBeNull();
        expect(request.headers.has('header1')).toBeTruthy();
        expect(request.headers.get('header1')).toBe('value1');
        expect(request.headers.has('Content-Type')).toBeTruthy();
        expect(request.headers.get('Content-Type')).toBe('application/json');
    });
});
