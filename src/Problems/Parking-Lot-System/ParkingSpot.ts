import { Vehicle, VehicleType } from "./Vehicle";

export class ParkingSpot {
  parkedVehicle: Vehicle | null = null;

  constructor(
    public spotId: number,
    public type: VehicleType,
    public isFree: boolean = true
  ) {}

  park(vehicle: Vehicle): boolean {
    if (!this.isFree || this.type !== vehicle.type) return false;
    this.parkedVehicle = vehicle;
    this.isFree = false;
    return true;
  }

  unpark(): void {
    this.parkedVehicle = null;
    this.isFree = true;
  }
}
