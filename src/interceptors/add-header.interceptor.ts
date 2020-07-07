import { IHttpInterceptor } from "./http-interceptor.interface";
import { HttpRequest } from "../http-request";

export class AddHeaderInterceptor implements IHttpInterceptor
{
    constructor(private readonly header: string, private readonly value: string)
    {
    }

    beforeSend(request: HttpRequest): HttpRequest
    {
        request.headers.set(this.header, this.value);
        return request;
    }
}
