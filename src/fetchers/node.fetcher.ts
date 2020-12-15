import { IFetcher } from "./fetcher.interface";
import { HttpRequest } from "../http-request";
import { HttpResponse } from "../http-response";
import fetch, { BodyInit as Body, Request }  from "node-fetch";

export class NodeFetcher implements IFetcher
{
    async fetch(request: HttpRequest): Promise<HttpResponse>
    {
        return new HttpResponse(await fetch(new Request(request.url, {
            body: request.body as Body,
            headers: request.headers.toArray(),
            method: request.method,
            redirect: request.redirect,
            signal: request.signal
        })), request);
    }
}