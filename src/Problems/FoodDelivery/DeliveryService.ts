import { Order } from "./Order";
import { DeliveryAgent } from "./users";

export class DeliveryService{
    constructor(private agents: DeliveryAgent[]) {}
    assignAgent(order: Order): DeliveryAgent {
    const agent = this.agents.find(a => a.available);
    if (!agent) throw new Error("No delivery agent available");

    agent.acceptOrder(order);
    return agent;
  }
}