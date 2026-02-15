import { Vehicle, VehicleType } from "./Vehicle";

export class ParkingSpot {
  private parkedVehicle: Vehicle | null = null;

  constructor(
    public readonly spotId: string,
    public readonly type: VehicleType
  ) {}

  public isFree(): boolean {
    return this.parkedVehicle === null;
  }

  public canFit(vehicle: Vehicle): boolean {
    return vehicle.type === this.type;
  }

  public park(vehicle: Vehicle): boolean {
    if (!this.isFree()) return false;
    if (!this.canFit(vehicle)) return false;

    this.parkedVehicle = vehicle;
    return true;
  }

  public unpark(): Vehicle | null {
    const vehicle = this.parkedVehicle;
    this.parkedVehicle = null;
    return vehicle;
  }

  public getVehicle(): Vehicle | null {
    return this.parkedVehicle;
  }
}
