import { DeliveryService } from "./DeliveryService";
import { OrderStatus, PaymentStatus } from "./enums";
import { NotificationService } from "./NotificationService";
import { Order } from "./Order";
import { IPaymentStrategy } from "./Payment";
import { MenuItem, Restaurant } from "./resturant";
import { Customer } from "./users";

export class OrderService {
    private orders = new Map<string, Order>();

    constructor(private paymentStrategy: IPaymentStrategy, private notificationService: NotificationService, private deliveryService: DeliveryService) { }

    placeOrder(customer: Customer,
        restaurant: Restaurant,
        itemIds: string[]): Order{
        const items: MenuItem[] = [];
        let total = 0;

        for (const id of itemIds) {
            const item = restaurant.getItem(id);
            if (!item || !item.available) {
                throw new Error("Item unavailable");
            }
            items.push(item);
            total += item.price;
        }
        const paymentStatus = this.paymentStrategy.pay(total);
        if (paymentStatus !== PaymentStatus.SUCCESS) {
            throw new Error("Payment Failed");
        }

        const order = new Order(crypto.randomUUID(), customer, restaurant, items, total);

        this.orders.set(order.id, order);

        order.updateStatus(OrderStatus.ACCEPTED);


        // Assign delivery agent
        const agent = this.deliveryService.assignAgent(order);

        // Send notifications
        this.notificationService.notifyUser(customer, "Order placed successfully");
        this.notificationService.notifyUser(agent, "New order assigned");
         return order;
    }
    getOrder(orderId: string): Order | null {
        return this.orders.get(orderId) || null;
    }
}