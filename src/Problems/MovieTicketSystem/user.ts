import { Booking } from "./Booking";

export class User{
     private bookings: Booking[] = [];
    constructor(public id :string, public name : string){
    }

    addBooking(booking: Booking){
        this.bookings.push(booking);
    }
}