import { AddHeaderInterceptor } from "./add-header.interceptor";

export class ContentTypeInterceptor extends AddHeaderInterceptor
{
    constructor(mimeType: string)
    {
        super('Content-Type', mimeType);
    }
}
