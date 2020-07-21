import { HttpClient } from "../library/dist/http-client";
import { HttpServiceBase } from "./HttpServiceBase";
import { User } from "../models/User";

export class UserService extends HttpServiceBase
{
    constructor(httpClient: HttpClient, baseUrl: string)
    {
        super(httpClient, `${baseUrl}/api/users`);
    }

    async getAll(): Promise<User[]>
    {
        return await super.get<User[]>('');
    }

    async getById(id: number): Promise<User>
    {
        return await super.get<User>('{id}', { id });
    }

    async add(user: User): Promise<User>
    {
        return await super.post<User>('', {}, JSON.stringify(user));
    }

    async edit(user: User): Promise<User>
    {
        return await super.put<User>('', {}, JSON.stringify(user));
    }

    async remove(id: number): Promise<void>
    {
        await super.delete<void>('{id}', { id });
    }
}
