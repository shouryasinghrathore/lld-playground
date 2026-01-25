
export class Passenger {
    constructor(private passengerId:string,private name: string, private email: string, private  phoneNumber: string) { }

    getPassengerId(): string {
        return this.passengerId;
    }

    getName(): string {
        return this.name;
    }

    getEmail(): string {
        return this.email;
    }

    getPhoneNumber(): string {
        return this.phoneNumber;
    }
}