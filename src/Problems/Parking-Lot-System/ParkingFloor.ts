import { ParkingSpot } from "./ParkingSpot";
import { VehicleType } from "./Vehicle";

export class ParkingFloor {
  constructor(public floorId: number, public spots: ParkingSpot[]) {}

  findAvailableSpot(vehicleType: VehicleType): ParkingSpot | null {
    return this.spots.find((spot) => spot.isFree && spot.type === vehicleType) || null;
  }
}
