import { DeliveryService } from "./DeliveryService";
import { NotificationService } from "./NotificationService";
import { OrderService } from "./OrderService";
import { UpiPayment } from "./Payment";
import { Restaurant, MenuItem } from "./resturant";
import { RestaurantService } from "./resturantService";
import { Customer, DeliveryAgent } from "./users";

const restaurantService = new RestaurantService();
const restaurant = new Restaurant("R1", "Pizza Hut");
restaurant.addMenuItem(new MenuItem("M1", "Pizza", 200));
restaurant.addMenuItem(new MenuItem("M2", "Burger", 150));

restaurantService.addRestaurant(restaurant);

const customer = new Customer("C1", "Shourya");

const agents = [
  new DeliveryAgent("D1", "Agent A"),
  new DeliveryAgent("D2", "Agent B")
];

const deliveryService = new DeliveryService(agents);
const notificationService = new NotificationService();


const orderService = new OrderService(
  new UpiPayment(),
  notificationService,
  deliveryService
);

const order = orderService.placeOrder(
  customer,
  restaurant,
  ["M1", "M2"]
);

console.log("Order Status:", order.status);
