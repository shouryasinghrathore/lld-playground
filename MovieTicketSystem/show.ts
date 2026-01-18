import { Seat } from "./seat";

export class Show {
  constructor(
    public readonly id: string,
    public readonly movieId: string,
    public seats: Seat[]
  ) {}

  getAvailableSeats(): Seat[] {
    return this.seats.filter(seat => seat.isAvailable());
  }
}
