export class Ticket {
  constructor(
    public ticketId: string,
    public floorId: number,
    public spotId: number,
    public vehicleNumber: string,
    public entryTime: Date = new Date()
  ) {}
}
