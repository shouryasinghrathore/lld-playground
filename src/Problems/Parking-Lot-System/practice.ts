import { EntryGate, ExitGate } from "./Gate";
import { InMemoryTicketRepository } from "./InMemoryTicketRepository";
import { NearestFirstStrategy } from "./IParkingStrategy";
import { ParkingFloor } from "./ParkingFloor";
import { ParkingLotSystem } from "./ParkingLotSystem";
import { ParkingSpot } from "./ParkingSpot";
import { VehicleType, Vehicle } from "./Vehicle";

const floor1 = new ParkingFloor("F1", [
  new ParkingSpot("S1", VehicleType.CAR),
  new ParkingSpot("S2", VehicleType.CAR),
  new ParkingSpot("S3", VehicleType.MOTORCYCLE),
]);

const floor2 = new ParkingFloor("F2", [
  new ParkingSpot("S1", VehicleType.TRUCK),
  new ParkingSpot("S2", VehicleType.CAR),
]);

const system = new ParkingLotSystem(
  [floor1, floor2],
  new NearestFirstStrategy(),
  new InMemoryTicketRepository()
);

const entryGate1 = new EntryGate("ENTRY_1");
const exitGate1 = new ExitGate("EXIT_1");

console.log("Initial Availability:", system.getAvailability());

const vehicle = new Vehicle("MH12AB1111", VehicleType.CAR);

const ticket = entryGate1.park(system, vehicle);
console.log("Ticket:", ticket);

console.log("After Parking:", system.getAvailability());

if (ticket) {
  exitGate1.unpark(system, ticket.ticketId);
  console.log("After Exit:", system.getAvailability());
}
