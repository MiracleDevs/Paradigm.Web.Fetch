# Paradigm.Web.Fetch

[![Paradigm Web Fetch](https://github.com/MiracleDevs/Paradigm.Web.Fetch/actions/workflows/build-and-test.yml/badge.svg)](https://github.com/MiracleDevs/Paradigm.Web.Fetch/actions/workflows/build-and-test.yml)

A small wrapper around the fetch api to ease the work with web pages and web applications.

## Installing

```shell
npm i @miracledevs/paradigm-web-fetch
```

## How to use

This library is a small wrapper on top of the fetch api, that abstract some of the concepts and allow to use the same code both in the web and in node.js.
The code also allows the user to configure interceptors to transform or audit both the request and the response.

To start working with the library, the first thing you need to do, is to create an http client:

```typescript
const httpClient = new HttpClient();
```

from there, you can start doing requests:

```typescript
await httpClient.get('https://www.google.com');
...
await httpClient.get('https://example.com/api/v1/users/{userId}?isEnabled={isEnabled}', { userId: 1, isEnabled: true });
...
const user = new User();
await httClient.post('https://example.com/api/v1/users/', null, user);
```

## Interceptors

When working with client requests, is normal to require a set of defined headers on all outgoing requests, or wanting to log all incoming responses. If you're developing an enterprise application, is probable that you'll need some forme of authentication. Most apis now days utilizes some form of token authorization to authenticate requests.

This library allows for custom interceptors to be piped on your http clients, transforming the requests or responses.

Let's say we know our api will always expect json, and we need a security token for the private endpoints to accept the request:

```typescript
const httpClient = new HttpClient();
httpClient.registerInterceptor(new ContentTypeInterceptor("application/json"));
httpClient.registerInterceptor(new AuthorizationInterceptor("[my auth token]"));
```

After registering the interceptors, all the requests originated from `httpClient`, will execute both interceptors before executing the request. In this case, two headers will be added:

```text
Content-Type: application/json
x-auth: [my auth token]
```

Making interceptors is really easy to accomplish. Both `ContentTypeInterceptor` and `AuthorizationInterceptor` inherits from `AddHeaderInterceptor`, which code is:

```typescript
export class AddHeaderInterceptor implements IHttpInterceptor {
    constructor(
        private readonly header: string,
        private readonly value: string
    ) {}

    beforeSend(request: HttpRequest): HttpRequest {
        request.headers.set(this.header, this.value);
        return request;
    }
}
```

Interceptors have two methods you can override: `beforeSend` and `afterReceive`:

```typescript
beforeSend(request: HttpRequest): Promise<HttpRequest> | HttpRequest
{
}

afterReceive(response: HttpResponse): Promise<HttpResponse> | HttpResponse
{
}
```

You don't need to implement both, unless required.
As an exercise, lets create a log interceptor, that logs all incoming responses:

```typescript
export class LogResponsesInterceptor implements IHttpInterceptor {
    afterReceive(response: HttpResponse): HttpResponse {
        console.log(`${response.url} responded with code ${response.statusText} [${response.status}]`);
    }
}
```

## Building and Testing

To build the library:

```shell
npm run build
```

To watch-build the library:

```shell
npm run watch
```

To watch for changes and build after every change:

```shell
npm run watch
```

To test the solution:

```shell
npm run test
```

To watch-test the solution:

```shell
npm run watch-test
```

To see the test coverage:

```shell
npm run coverage
```

To see the test coverage and watch for changes:

```shell
npm run watch-coverage
```
