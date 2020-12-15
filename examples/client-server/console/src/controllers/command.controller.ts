import * as readline from "readline";
import { ApiClient } from "../services/http.service"

enum  TestMethod{
    get = 1,
    post,
    put,
    delete
};

export class CommandController {

    private apiClient;
    private testUrl = "api/users";
    
    private readonly rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: 'Paradigm.Fetch> '
    });

    constructor() {
        this.apiClient = new ApiClient();
    }

    async makeCall(answer: number) : Promise<any> {
        let response;
        let exit = false;
        switch(+answer) {
            case TestMethod.get: 
                response = await this.apiClient.get(this.testUrl);
                console.log("get", response);
                break;
            case TestMethod.post: 
                let rq1 = {
                    firstName: "Test",
                    lastName: "Name",
                    registrationDate: new Date("2020-11-27"),
                    age: 38,
                    isBlocked: false
                };
                response = await this.apiClient.post(this.testUrl, null, JSON.stringify(rq1));
                console.log("post", response);
                break;
            case TestMethod.put: 
                let rq2 = {
                    id: 2,
                    firstName: "Peter",
                    lastName: "Devons"
                };
                response = await this.apiClient.put(this.testUrl, null, JSON.stringify(rq2));
                console.log("put", response);
                break;
            case TestMethod.delete:
                let rq4 = {
                    id: 5
                };
                response = await this.apiClient.delete(this.testUrl, rq4);
                console.log("delete", response);
                break;
            case 0:
                exit = true;
                break;
            default:
                this.askForCommand();
        }

        if (!exit) {
            this.rl.question("Press any key to continue...", (answer: any) => {
                this.askForCommand();
            });
        } else {
            this.rl.close();
        }
    }
    
    public askForCommand() : void {
    
        this.rl.write(null, { ctrl: true, name: 'l' });
        this.rl.write('\n\n\n');
        this.rl.write('1 - GET \n');
        this.rl.write('2 - POST \n');
        this.rl.write('3 - PUT \n');
        this.rl.write('4 - DELETE \n');
        this.rl.write('0 - Close \n');
        this.rl.write('\n');
    
        this.rl.question('Pick an option: ', (answer: any) => {
            this.makeCall(+answer);
        });
    }
}