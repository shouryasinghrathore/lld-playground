import { OrderStatus } from "./enums";
import { MenuItem, Restaurant } from "./resturant";
import { Customer, DeliveryAgent } from "./users";

export class Order {
    public deliveryAgent: DeliveryAgent | null = null;
    public status: OrderStatus = OrderStatus.PLACED;
    constructor(public id: string, public customer: Customer,
        public restaurant: Restaurant, public items: MenuItem[], public totalAmount: number) { }

    updateStatus(status: OrderStatus) {
        this.status = status;
    }

    assignAgent(agent: DeliveryAgent) {
        this.deliveryAgent = agent;
    }
}