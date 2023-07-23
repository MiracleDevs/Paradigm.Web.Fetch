import { IFetcher } from "./fetcher.interface";
import { HttpRequest } from "../http-request";
import { HttpResponse } from "../http-response";

export class WebFetcher implements IFetcher {
    async fetch(request: HttpRequest): Promise<HttpResponse> {
        if (window === null || window === undefined)
            throw new Error(
                "Unable to find the fetch method. If the intension is to use the library on different platform than the web, you can implement a IFetcher."
            );

        return new HttpResponse(
            await fetch(
                new Request(request.url, {
                    body: request.body,
                    headers: request.headers.toArray(),
                    integrity: request.integrity,
                    keepalive: request.keepalive,
                    method: request.method,
                    mode: request.mode,
                    redirect: request.redirect,
                    referrer: request.referrer,
                    referrerPolicy: request.referrerPolicy,
                    signal: request.signal,
                    window: request.window,
                })
            ),
            request
        );
    }
}
