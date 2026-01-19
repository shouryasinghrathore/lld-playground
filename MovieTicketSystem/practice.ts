import { Seat } from "./seat";
import { Show } from "./show";
import { Movie } from "./Movie";
import { BookingService } from "./BookingService";
import { User } from "./user";

function createSeats(count: number, row = "A"): Seat[] {
	const seats: Seat[] = [];
	for (let i = 1; i <= count; i++) {
		seats.push(new Seat(`s${i}`, `${row}${i}`));
	}
	return seats;
}

function main() {
	const seats = createSeats(10);
	const show = new Show("show-1", "movie-1", seats);
	const movie = new Movie("movie-1", "The Matrix", [show]);

	const user = new User("user-1", "Alice");
	const bookingService = new BookingService();

	console.log("Movie:", movie.title);
	console.log("Available seats before booking:", show.getAvailableSeats().map(s => s.seatNumber));

	try {
		const seatsToBook = [seats[0], seats[1]];
		const booking = bookingService.createBooking(user, show, seatsToBook);
		console.log("Booking successful:", {
			id: booking.id,
			status: booking.status,
			seats: booking.seats.map(s => s.seatNumber),
		});
	} catch (e) {
		console.error("Booking failed:", e instanceof Error ? e.message : e);
	}

	console.log("Available seats after booking:", show.getAvailableSeats().map(s => s.seatNumber));

}

main();

