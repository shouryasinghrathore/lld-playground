export enum VehicleType {
  CAR,
  BIKE,
  TRUCK,
}


export class Vehicle {
  constructor(public number: string, public type: VehicleType) {}
}