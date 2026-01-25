import { SeatStatus } from "./SeatStatus";
import { SeatType } from "./SeatType";

export class Seat{
    constructor(private seatNumber: string, private seatType: SeatType, private status: SeatStatus = SeatStatus.AVAILABLE) {}

    getSeatNumber(): string {
        return this.seatNumber;
    }

    getSeatType(): SeatType {
        return this.seatType;
    }

    getStatus(): SeatStatus {
        return this.status;
    }

    reserved(): void {
        this.status = SeatStatus.RESERVED;
    }
    
    release(): void {
        this.status = SeatStatus.AVAILABLE;
    }
}


