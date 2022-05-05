import { HttpRequest } from "../http-request";
import { HttpResponse } from "../http-response";

export interface IFetcher {
    fetch(request: HttpRequest): Promise<HttpResponse>;
}
