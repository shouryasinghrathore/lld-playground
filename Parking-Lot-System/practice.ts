import { ParkingFloor } from "./ParkingFloor";
import { ParkingLot } from "./ParkingLot";
import { ParkingSpot } from "./ParkingSpot";
import { Vehicle, VehicleType } from "./Vehicle";
import { Ticket } from "./Ticket";

function logTicket(ticket: Ticket | null, vehicle: Vehicle) {
  if (ticket) {
    console.log(`Parked ${vehicle.number} -> ticket=${ticket.ticketId} (floor ${ticket.floorId}, spot ${ticket.spotId})`);
  } else {
    console.log(`No available spot for ${vehicle.number} (${VehicleType[vehicle.type]})`);
  }
}

function printOccupancy() {
  console.log("--- Parking Occupancy ---");
  for (const floor of parkingLot.floors) {
    const statuses = floor.spots.map((s) => `${s.spotId}:${s.isFree ? 'free' : 'occupied'}`);
    console.log(`Floor ${floor.floorId}:`, statuses.join(', '));
  }
}

const floor1Spots = [
  new ParkingSpot(101, VehicleType.CAR),
  new ParkingSpot(102, VehicleType.CAR),
  new ParkingSpot(103, VehicleType.BIKE),
];

const floor2Spots = [
  new ParkingSpot(201, VehicleType.CAR),
  new ParkingSpot(202, VehicleType.BIKE),
  new ParkingSpot(203, VehicleType.TRUCK),
];

const parkingFloor1 = new ParkingFloor(1, floor1Spots);
const parkingFloor2 = new ParkingFloor(2, floor2Spots);
const parkingLot = new ParkingLot([parkingFloor1, parkingFloor2]);

// Vehicles to test
const v1 = new Vehicle("KA-01-HH-1234", VehicleType.CAR);
const v2 = new Vehicle("KA-01-HH-1235", VehicleType.CAR);
const v3 = new Vehicle("KA-01-HH-1236", VehicleType.BIKE);
const v4 = new Vehicle("KA-01-HH-1237", VehicleType.TRUCK);

const ticket1 = parkingLot.parkVehicle(v1);
logTicket(ticket1, v1);
const ticket2 = parkingLot.parkVehicle(v2);
logTicket(ticket2, v2);
const ticket3 = parkingLot.parkVehicle(v3);
logTicket(ticket3, v3);
const ticket4 = parkingLot.parkVehicle(v4);
logTicket(ticket4, v4);

printOccupancy();

// Unpark v1 then try parking another car to demonstrate reuse of spot
if (ticket1) {
  const success = parkingLot.unparkVehicle(ticket1);
  console.log(success ? `Unparked ${v1.number} (ticket ${ticket1.ticketId})` : `Failed to unpark ${v1.number}`);
} else {
  console.log(`Skipped unpark for ${v1.number} (no ticket)`);
}

printOccupancy();

const v5 = new Vehicle("KA-01-HH-1238", VehicleType.CAR);
const ticket5 = parkingLot.parkVehicle(v5);
logTicket(ticket5, v5);

printOccupancy();