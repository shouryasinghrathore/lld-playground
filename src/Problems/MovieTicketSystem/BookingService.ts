import { Seat } from "./seat";
import { Booking } from "./Booking";
import { Show } from "./show";
import { User } from "./user";

export class BookingService {
  createBooking(user: User, show: Show, seats: Seat[]): Booking {
    for (const seat of seats) {
      if (!seat.isAvailable()) {
        throw new Error("One or more seats not available");
      }
    }

    seats.forEach(seat => seat.book());

    const booking = new Booking(
      crypto.randomUUID(),
      user.id,
      show.id,
      seats
    );

    booking.confirm();
    user.addBooking(booking);

    return booking;
  }
}
