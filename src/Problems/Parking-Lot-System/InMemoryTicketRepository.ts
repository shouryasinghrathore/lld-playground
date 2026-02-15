import { Ticket } from "./Ticket";

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