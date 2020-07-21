import { Controller, ApiController, Action } from "@miracledevs/paradigm-express-webapi";
import { User } from "../models/user";

@Controller({ route: '/api/users' })
export class UserController extends ApiController
{
    private users: User[];

    constructor()
    {
        super();
        this.users = [
            {
                id: 1,
                firstName: "John",
                lastName: "Mathis",
                registrationDate: new Date("2012-01-01"),
                age: 70,
                isBlocked: false
            },
            {
                id: 2,
                firstName: "Peter",
                lastName: "Devons",
                registrationDate: new Date("2013-01-01"),
                age: 43,
                isBlocked: false
            },
            {
                id: 3,
                firstName: "Martin",
                lastName: "Shore",
                registrationDate: new Date("2011-04-12"),
                age: 34,
                isBlocked: true
            },
            {
                id: 4,
                firstName: "Martha",
                lastName: "Crowford",
                registrationDate: new Date("2012-01-01"),
                age: 55,
                isBlocked: false
            },
            {
                id: 5,
                firstName: "Mary",
                lastName: "Hopkins",
                registrationDate: new Date("2010-07-09"),
                age: 28,
                isBlocked: true
            },
        ];
    }

    @Action()
    get(): User[]
    {
        return this.users;
    }

    @Action({ route: ":id" })
    getById(id: number): User
    {
        const user = this.users.find(x => x.id === id);

        if (!user)
            throw new Error("The user does not exist.");

        return user;
    }

    @Action({ fromBody: true })
    post(user: User): User
    {
        if (!user)
            throw new Error("The user can not be null");

        if (!user.firstName)
            throw new Error("The first name of an user is mandatory.");

        if (!user.lastName)
            throw new Error("The last name of an user is mandatory.");

        user.registrationDate = new Date();
        user.isBlocked = false;
        user.id = this.users.length > 0 ? this.users[this.users.length - 1].id + 1 : 1;

        this.users.push(user);
        return user;
    }

    @Action({ fromBody: true })
    put(user: User): User
    {
        if (!user)
            throw new Error("The user can not be null");

        const existingUser = this.users.find(x => x.id === user.id);

        if (!existingUser)
            throw new Error("The user does not exist.");

        if (!user.firstName)
            throw new Error("The first name of an user is mandatory.");

        if (!user.lastName)
            throw new Error("The last name of an user is mandatory.");

        existingUser.firstName = user.firstName;
        existingUser.lastName = user.lastName;

        return existingUser;
    }

    @Action({ route: ":id" })
    delete(id: number): void
    {
        const user = this.getById(id);
        const index = this.users.indexOf(user);
        this.users.splice(index, 1);
    }
}