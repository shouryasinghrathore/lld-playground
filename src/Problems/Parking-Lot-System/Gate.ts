import { ParkingLotSystem } from "./ParkingLotSystem";
import { Ticket } from "./Ticket";
import { Vehicle } from "./Vehicle";

export abstract class Gate {
  constructor(public readonly gateId: string) {}
}

export class EntryGate extends Gate {
  park(system: ParkingLotSystem, vehicle: Vehicle): Ticket | null {
    return system.parkVehicle(vehicle, this.gateId);
  }
}

export class ExitGate extends Gate {
  unpark(system: ParkingLotSystem, ticketId: string): boolean {
    return system.unparkVehicle(ticketId, this.gateId);
  }
}
