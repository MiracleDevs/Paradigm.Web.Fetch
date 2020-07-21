import { HttpClient } from "../library/dist/http-client";
import { QueryString } from "../library/dist/http-client";

export class HttpServiceBase
{
    constructor(private readonly httpClient: HttpClient, private readonly baseUrl: string)
    {
    }

    protected async get<T>(url?: string, queryString?: QueryString): Promise<T>
    {
        const response = await this.httpClient.get(`${this.baseUrl}/${url}`, queryString);
        return await response.json() as T;
    }

    protected async post<T>(url?: string, queryString?: QueryString, body?: BodyInit): Promise<T>
    {
        const response = await this.httpClient.post(`${this.baseUrl}/${url}`, queryString, body);
        return await response.json() as T;
    }

    protected async put<T>(url?: string, queryString?: QueryString, body?: BodyInit): Promise<T>
    {
        const response = await this.httpClient.put(`${this.baseUrl}/${url}`, queryString, body);
        return await response.json() as T;
    }

    protected async patch<T>(url?: string, queryString?: QueryString, body?: BodyInit): Promise<T>
    {
        const response = await this.httpClient.patch(`${this.baseUrl}/${url}`, queryString, body);
        return await response.json() as T;
    }

    protected async delete<T>(url?: string, queryString?: QueryString): Promise<T>
    {
        const response = await this.httpClient.delete(`${this.baseUrl}/${url}`, queryString);
        return await response.json() as T;
    }
}
