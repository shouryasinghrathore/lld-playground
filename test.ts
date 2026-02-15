/* =========================
   Types + Enums
========================= */

export enum VehicleType {
  CAR = "CAR",
  BIKE = "BIKE",
  TRUCK = "TRUCK",
}

export class Vehicle {
  constructor(
    public readonly numberPlate: string,
    public readonly type: VehicleType
  ) {}
}

/* =========================
   Ticket
========================= */

export class Ticket {
  public readonly ticketId: string;
  public readonly entryTime: Date;
  public exitTime: Date | null = null;
  public amount: number | null = null;

  constructor(
    ticketId: string,
    public readonly floorId: string,
    public readonly spotId: string,
    public readonly vehicleNumber: string
  ) {
    this.ticketId = ticketId;
    this.entryTime = new Date();
  }
}

/* =========================
   Parking Spot
========================= */

export class ParkingSpot {
  private parkedVehicle: Vehicle | null = null;

  constructor(
    public readonly spotId: string,
    public readonly type: VehicleType
  ) {}

  public isFree(): boolean {
    return this.parkedVehicle === null;
  }

  public getParkedVehicle(): Vehicle | null {
    return this.parkedVehicle;
  }

  public park(vehicle: Vehicle): boolean {
    if (!this.isFree()) return false;
    if (this.type !== vehicle.type) return false;

    this.parkedVehicle = vehicle;
    return true;
  }

  public unpark(): Vehicle | null {
    const vehicle = this.parkedVehicle;
    this.parkedVehicle = null;
    return vehicle;
  }
}

/* =========================
   Parking Floor
========================= */

export class ParkingFloor {
  constructor(
    public readonly floorId: string,
    private readonly spots: ParkingSpot[]
  ) {}

  public getSpots(): ParkingSpot[] {
    return this.spots;
  }

  public getFreeSpotsByType(type: VehicleType): ParkingSpot[] {
    return this.spots.filter((s) => s.isFree() && s.type === type);
  }

  public getSpotById(spotId: string): ParkingSpot | null {
    return this.spots.find((s) => s.spotId === spotId) || null;
  }
}

/* =========================
   Spot Allocation Strategy
========================= */

export interface ISpotAllocationStrategy {
  findSpot(
    floors: ParkingFloor[],
    vehicle: Vehicle
  ): { floor: ParkingFloor; spot: ParkingSpot } | null;
}

// Simple strategy: first free spot on first floor
export class FirstAvailableSpotStrategy implements ISpotAllocationStrategy {
  findSpot(
    floors: ParkingFloor[],
    vehicle: Vehicle
  ): { floor: ParkingFloor; spot: ParkingSpot } | null {
    for (const floor of floors) {
      const freeSpots = floor.getFreeSpotsByType(vehicle.type);
      if (freeSpots.length > 0) {
        return { floor, spot: freeSpots[0] };
      }
    }
    return null;
  }
}

/* =========================
   Pricing Strategy
========================= */

export interface IPricingStrategy {
  calculate(vehicleType: VehicleType, entryTime: Date, exitTime: Date): number;
}

// Example: hourly pricing
export class HourlyPricingStrategy implements IPricingStrategy {
  private ratesPerHour: Record<VehicleType, number> = {
    [VehicleType.BIKE]: 10,
    [VehicleType.CAR]: 20,
    [VehicleType.TRUCK]: 50,
  };

  calculate(vehicleType: VehicleType, entryTime: Date, exitTime: Date): number {
    const ms = exitTime.getTime() - entryTime.getTime();
    const hours = Math.ceil(ms / (1000 * 60 * 60)); // round up
    return hours * this.ratesPerHour[vehicleType];
  }
}

/* =========================
   Ticket Repository
========================= */

export interface ITicketRepository {
  save(ticket: Ticket): void;
  get(ticketId: string): Ticket | null;
  delete(ticketId: string): void;
}

export class InMemoryTicketRepository implements ITicketRepository {
  private tickets = new Map<string, Ticket>();

  save(ticket: Ticket): void {
    this.tickets.set(ticket.ticketId, ticket);
  }

  get(ticketId: string): Ticket | null {
    return this.tickets.get(ticketId) || null;
  }

  delete(ticketId: string): void {
    this.tickets.delete(ticketId);
  }
}

/* =========================
   Parking Lot (Main Service)
========================= */

export class ParkingLot {
  constructor(
    private readonly floors: ParkingFloor[],
    private readonly allocationStrategy: ISpotAllocationStrategy,
    private readonly pricingStrategy: IPricingStrategy,
    private readonly ticketRepo: ITicketRepository
  ) {}

  private generateTicketId(): string {
    return crypto.randomUUID();
  }

  public parkVehicle(vehicle: Vehicle): Ticket | null {
    const result = this.allocationStrategy.findSpot(this.floors, vehicle);
    if (!result) return null;

    const { floor, spot } = result;

    const parked = spot.park(vehicle);
    if (!parked) return null;

    const ticket = new Ticket(
      this.generateTicketId(),
      floor.floorId,
      spot.spotId,
      vehicle.numberPlate
    );

    this.ticketRepo.save(ticket);
    return ticket;
  }

  public unparkVehicle(ticketId: string): Ticket | null {
    const ticket = this.ticketRepo.get(ticketId);
    if (!ticket) return null;

    const floor = this.floors.find((f) => f.floorId === ticket.floorId);
    if (!floor) return null;

    const spot = floor.getSpotById(ticket.spotId);
    if (!spot) return null;

    const vehicle = spot.getParkedVehicle();
    if (!vehicle) return null;

    // Unpark
    spot.unpark();

    // Billing
    ticket.exitTime = new Date();
    ticket.amount = this.pricingStrategy.calculate(
      vehicle.type,
      ticket.entryTime,
      ticket.exitTime
    );

    // remove ticket (depends on business rules)
    this.ticketRepo.delete(ticket.ticketId);

    return ticket;
  }

  public getAvailableSpotsCount(type: VehicleType): number {
    let count = 0;
    for (const floor of this.floors) {
      count += floor.getFreeSpotsByType(type).length;
    }
    return count;
  }
}
