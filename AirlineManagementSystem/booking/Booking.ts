import { Flight } from "../Flight/Flight";
import { Seat } from "../seat/Seat";
import { bookingStatus } from "./BookingStatus";
import { Passenger } from "../passenger/Passenger";
export class Booking{
    private status : bookingStatus;
    constructor(private BookingNumber :string,private flightr :Flight,
        private passenger: Passenger ,private seat:Seat, private price:number){
            this.status = bookingStatus.CONFIRMED;
        }
        public cancel(): void{
            this.status = bookingStatus.CANCELLED;
        }
}