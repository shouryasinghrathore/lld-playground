import { Seat } from "../seat/Seat";

export class Flight {

    constructor(private flightNumber: string, private source: string, private destination: string, private arrivalTime: Date, private departureTime: Date, private availableSeats: Seat[]) { }
    getFlightNumber(): string {
        return this.flightNumber;
    }
    getSource(): string {
        return this.source;
    }
    getDestination(): string {
        return this.destination;
    }
    getArrivalTime(): Date {
        return this.arrivalTime;
    }
    getDepartureTime(): Date {
        return this.departureTime;
    }
    getAvailableSeats(): Seat[] {
        return this.availableSeats;
    }
}