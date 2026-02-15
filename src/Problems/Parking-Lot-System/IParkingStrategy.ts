import { ParkingFloor } from "./ParkingFloor";
import { ParkingSpot } from "./ParkingSpot";
import { Vehicle } from "./Vehicle";

export interface IParkingStrategy {
  findSpot(
    floors: ParkingFloor[],
    vehicle: Vehicle
  ): { floor: ParkingFloor; spot: ParkingSpot } | null;
}

export class NearestFirstStrategy implements IParkingStrategy {
  findSpot(floors: ParkingFloor[], vehicle: Vehicle) {
    for (const floor of floors) {
      const spot = floor.findAvailableSpot(vehicle);
      if (spot) return { floor, spot };
    }
    return null;
  }
}
