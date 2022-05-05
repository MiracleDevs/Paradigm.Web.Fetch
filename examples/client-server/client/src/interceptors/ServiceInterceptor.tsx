import { IHttpInterceptor } from "../library/dist/interceptors/http-interceptor.interface";
import { HttpRequest } from "../library/dist/http-request";
import { HttpResponse } from "../library/dist/http-response";

export class ServiceInterceptor implements IHttpInterceptor {
    beforeSend(request: HttpRequest): HttpRequest {
        console.log(`Request will be made to ${request.url}`);
        return request;
    }

    afterReceive(response: HttpResponse): HttpResponse {
        console.log(`Request was made to ${response.url}`);
        return response;
    }
}
