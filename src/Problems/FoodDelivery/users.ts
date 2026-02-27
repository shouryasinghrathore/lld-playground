import { OrderStatus } from "./enums";
import { Order } from "./Order";

export abstract class User {
  constructor(
    public readonly id: string,
    public name: string
  ) {}
}

export class Customer extends User {}

export class DeliveryAgent extends User {
  public available: boolean = true;

  acceptOrder(order: Order) {
    order.assignAgent(this);
    order.updateStatus(OrderStatus.OUT_FOR_DELIVERY);
    this.available = false;
  }

  markDelivered(order: Order) {
    order.updateStatus(OrderStatus.DELIVERED);
    this.available = true;
  }
}
