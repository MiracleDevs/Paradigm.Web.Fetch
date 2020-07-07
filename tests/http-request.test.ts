import { HttpRequest } from "../src/http-request";

describe("HttpRequest", () =>
{
    it("should allow create a new instance", () => expect(new HttpRequest('https://google.com')).not.toBeNull());

    it("should let customize the request fields", () =>
    {
        const request = new HttpRequest('https://google.com');
        request.headers.set('Content-Type', 'application/json');
        request.mode = 'no-cors';
        request.method = 'POST';
        request.keepalive = false;

        expect(request.url).toBe('https://google.com');
        expect(request.headers).not.toBeNull();
        expect(request.headers.has('Content-Type')).toBeTruthy();
        expect(request.headers.get('Content-Type')).toBe('application/json');
        expect(request.mode).toBe('no-cors');
        expect(request.method).toBe('POST');
        expect(request.keepalive).toBeFalsy();
    });
});