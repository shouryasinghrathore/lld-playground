import { ITicketRepository } from "./InMemoryTicketRepository";
import { IParkingStrategy } from "./IParkingStrategy";
import { ParkingFloor } from "./ParkingFloor";
import { Ticket } from "./Ticket";
import { VehicleType, Vehicle } from "./Vehicle";

export class ParkingLotSystem {
  constructor(
    private readonly floors: ParkingFloor[],
    private readonly strategy: IParkingStrategy,
    private readonly ticketRepo: ITicketRepository
  ) {}

  private generateTicketId(): string {
    return crypto.randomUUID();
  }

  // Real-time availability
  public getAvailability() {
    const result: Record<string, Record<VehicleType, number>> = {};

    for (const floor of this.floors) {
      result[floor.floorId] = floor.getAvailability();
    }

    return result;
  }

  public parkVehicle(vehicle: Vehicle, entryGateId: string): Ticket | null {
    const result = this.strategy.findSpot(this.floors, vehicle);
    if (!result) return null;

    const { floor, spot } = result;

    if (!spot.park(vehicle)) return null;

    floor.markOccupied(spot);

    const ticket = new Ticket(
      this.generateTicketId(),
      vehicle.licensePlate,
      floor.floorId,
      spot.spotId,
      entryGateId
    );

    this.ticketRepo.save(ticket);
    return ticket;
  }

  public unparkVehicle(ticketId: string, exitGateId: string): boolean {
    const ticket = this.ticketRepo.get(ticketId);
    if (!ticket) return false;

    const floor = this.floors.find(f => f.floorId === ticket.floorId);
    if (!floor) return false;

    const spot = floor.getSpot(ticket.spotId);
    if (!spot) return false;

    const vehicle = spot.unpark();
    if (!vehicle) return false;

    floor.markFreed(spot);
    this.ticketRepo.delete(ticket.ticketId);

    return true;
  }
}
