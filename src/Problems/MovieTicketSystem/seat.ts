export class Seat {
  private booked = false;

  constructor(
    public readonly id: string,
    public seatNumber: string
  ) {}

  book() {
    if (this.booked) {
      throw new Error("Seat already booked");
    }
    this.booked = true;
  }

  isAvailable(): boolean {
    return !this.booked;
  }
}
