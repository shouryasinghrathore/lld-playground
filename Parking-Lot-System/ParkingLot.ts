import { Vehicle } from "./Vehicle";
import { Ticket } from "./Ticket";
import { ParkingFloor } from "./ParkingFloor";

export class ParkingLot {
  constructor(public floors: ParkingFloor[]) {}

  parkVehicle(vehicle: Vehicle): Ticket | null {
    for (const floor of this.floors) {
      const spot = floor.findAvailableSpot(vehicle.type);
      if (spot) {
        spot.park(vehicle);
        return new Ticket(
          `${Date.now()}-${vehicle.number}`,
          floor.floorId,
          spot.spotId,
          vehicle.number
        );
      }
    }
    return null; // no spot available
  }

  unparkVehicle(ticket: Ticket): boolean {
    const floor = this.floors.find((f) => f.floorId === ticket.floorId);
    if (!floor) return false;

    const spot = floor.spots.find((s) => s.spotId === ticket.spotId);
    if (!spot || spot.isFree) return false;

    spot.unpark();
    return true;
  }
}
