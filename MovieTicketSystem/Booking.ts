import { Seat } from "./seat";
import { BookingStatus } from "./bookingStatus";

export class Booking {
  public status: BookingStatus = BookingStatus.CREATED;

  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly showId: string,
    public readonly seats: Seat[]
  ) {}

  confirm() {
    this.status = BookingStatus.CONFIRMED;
  }

  cancel() {
    this.status = BookingStatus.CANCELLED;
  }
}


