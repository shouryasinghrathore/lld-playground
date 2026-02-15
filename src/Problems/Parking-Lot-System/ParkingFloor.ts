import { ParkingSpot } from "./ParkingSpot";
import { VehicleType, Vehicle } from "./Vehicle";

export class ParkingFloor {
  private spots = new Map<string, ParkingSpot>();

  private freeCountByType: Record<VehicleType, number> = {
    [VehicleType.MOTORCYCLE]: 0,
    [VehicleType.CAR]: 0,
    [VehicleType.TRUCK]: 0,
  };

  constructor(public readonly floorId: string, spotList: ParkingSpot[]) {
    for (const spot of spotList) {
      this.spots.set(spot.spotId, spot);
      this.freeCountByType[spot.type]++;
    }
  }

  public findAvailableSpot(vehicle: Vehicle): ParkingSpot | null {
    for (const spot of this.spots.values()) {
      if (spot.isFree() && spot.canFit(vehicle)) {
        return spot;
      }
    }
    return null;
  }

  public getSpot(spotId: string): ParkingSpot | null {
    return this.spots.get(spotId) || null;
  }

  public markOccupied(spot: ParkingSpot): void {
    this.freeCountByType[spot.type]--;
  }

  public markFreed(spot: ParkingSpot): void {
    this.freeCountByType[spot.type]++;
  }

  public getAvailability(): Record<VehicleType, number> {
    return { ...this.freeCountByType };
  }
}
