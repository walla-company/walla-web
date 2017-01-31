export class User {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;

    getFullName(): string {
        return this.firstName + ' ' + this.lastName;
    }

    constructor (data: any = null) {
        if (data) {
            this.id = data.id;
            this.email = data.email;
            this.password = data.password;
            this.firstName = data.firstName;
            this.lastName = data.lastName;
        }
    }
}
