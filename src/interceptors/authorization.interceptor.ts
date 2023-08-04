import { AddHeaderInterceptor } from "./add-header.interceptor";

export class AuthorizationInterceptor extends AddHeaderInterceptor {
    constructor(value: string, header = "x-auth") {
        super(header, value);
    }
}
