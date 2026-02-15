export class Ticket {
  public readonly entryTime: Date = new Date();

  constructor(
    public readonly ticketId: string,
    public readonly vehicleNumber: string,
    public readonly floorId: string,
    public readonly spotId: string,
    public readonly entryGateId: string
  ) {}
}


















