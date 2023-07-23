type HeaderDictionary = { [key: string]: string };

export class HttpHeaders {
    private headers: HeaderDictionary;

    constructor() {
        this.headers = {};
    }

    set(key: string, value: string): void {
        this.headers[key] = value;
    }

    has(key: string): boolean {
        return this.headers.hasOwnProperty(key);
    }

    get(key: string): string {
        return this.headers[key];
    }

    remove(key: string): void {
        if (!this.has(key)) throw new Error("They key was not present in the headers dictionary.");

        delete this.headers[key];
    }

    toArray(): [string, string][] {
        const result: [string, string][] = [];
        for (const key in this.headers) {
            result.push([key, this.headers[key]]);
        }
        return result;
    }
}
