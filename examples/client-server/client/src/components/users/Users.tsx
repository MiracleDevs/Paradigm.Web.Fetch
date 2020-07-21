import React, { ReactElement } from 'react';
import { IAsyncContentProps, withAsyncContent } from '../../effects/async-content';
import { User } from '../../models/User';
import { UserService } from '../../services/UserService';
import { HttpClient } from '../../library/dist/http-client';
import './Users.scss';
import { ServiceInterceptor } from '../../interceptors/ServiceInterceptor';

async function getUsers(): Promise<User[]>
{
    const httpClient = new HttpClient();
    httpClient.registerInterceptor(new ServiceInterceptor());
    const userService = new UserService(httpClient, 'http://localhost:5000');
    return await userService.getAll();
}

function UsersList(props: IAsyncContentProps<User[]>): ReactElement
{
    const users = props?.content || [];

    return <>{users.map(user =>
        <section className="user-section" key={user.id}>
            <div>
                <label>Name</label>
                <span>{user.firstName} {user.lastName}</span>
            </div>
            <div>
                <label>Age</label>
                <span>{user.age} years old</span>
            </div>
            <div>
                <label>Is Blocked</label>
                <span>{user.isBlocked ? 'Yes' : 'No'}</span>
            </div>
        </section>
    )}</>;
}

export const Users = withAsyncContent(UsersList, getUsers);


