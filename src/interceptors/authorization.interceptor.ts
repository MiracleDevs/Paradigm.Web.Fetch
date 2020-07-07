import { AddHeaderInterceptor } from "./add-header.interceptor";

export class AuthorizationInterceptor extends AddHeaderInterceptor
{
    constructor(value: string, header: string = 'x-auth')
    {
        super(header, value);
    }
}