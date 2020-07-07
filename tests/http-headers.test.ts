import { HttpHeaders } from "../src/http-headers";

describe("HttpHeaders", () =>
{
    it("should allow create a new instance", () => expect(new HttpHeaders()).not.toBeNull());

    it("should add and get keys", () =>
    {
        const headers = new HttpHeaders();
        headers.set('key1', 'value1');
        headers.set('key2', 'value2');

        expect(headers.has('key1')).toBeTruthy();
        expect(headers.has('key2')).toBeTruthy();

        expect(headers.get('key1')).toBe('value1');
        expect(headers.get('key2')).toBe('value2');
    });

    it("shouldn't fail if header is overwritten", () =>
    {
        const headers = new HttpHeaders();
        headers.set('key1', 'value1');
        headers.set('key1', 'value2');

        expect(headers.has('key1')).toBeTruthy();
        expect(headers.get('key1')).toBe('value2');
    });

    it("should indicate if a header is not set", () =>
    {
        const headers = new HttpHeaders();
        expect(headers.has('key1')).toBeFalsy();
    });

    it("shouldn't retrieve a header that is not set", () =>
    {
        const headers = new HttpHeaders();
        expect(headers.get('key1')).toBeUndefined();
    });

    it("should remove key", () =>
    {
        const headers = new HttpHeaders();
        headers.set('key1', 'value1');
        headers.remove('key1');
        expect(headers.has('key1')).toBeFalsy();
    });

    it("shouldn't remove key that is not set", () =>
    {
        const headers = new HttpHeaders();
        expect(() => headers.remove('key1')).toThrowError('They key was not present in the headers dictionary.');
    });

    it("should convert to an array", () =>
    {
        const headers = new HttpHeaders();
        headers.set('key1', 'value1');
        headers.set('key2', 'value2');

        const array = headers.toArray();
        expect(array).not.toBeNull();
        expect(array).toHaveLength(2);
        expect(array[0]).toHaveLength(2);
        expect(array[1]).toHaveLength(2);
        expect(array[0][0]).toBe('key1');
        expect(array[0][1]).toBe('value1');
        expect(array[1][0]).toBe('key2');
        expect(array[1][1]).toBe('value2');
    });
});