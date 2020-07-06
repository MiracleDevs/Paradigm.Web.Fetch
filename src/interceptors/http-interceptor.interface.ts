import { HttpRequest } from "../http-request";
import { HttpResponse } from "../http-response";

export interface IHttpInterceptor
{
    beforeSend?(request: HttpRequest): Promise<HttpRequest> | HttpRequest;

    afterReceive?(response: HttpResponse): Promise<HttpResponse> | HttpResponse;
}
