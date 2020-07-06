import { IHttpInterceptor } from "./http-interceptor.interface";
import { HttpRequest } from "../http-request";

export class ContentTypeInterceptor implements IHttpInterceptor
{
    constructor(private contentType: string)
    {
    }

    beforeSend(request: HttpRequest): HttpRequest
    {
        return request;
    }

}