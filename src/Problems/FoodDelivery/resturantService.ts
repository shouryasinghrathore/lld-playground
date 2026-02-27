import { Restaurant } from "./resturant";

export class RestaurantService {
  private restaurants = new Map<string, Restaurant>();

  addRestaurant(restaurant: Restaurant) {
    this.restaurants.set(restaurant.id, restaurant);
  }

  getAllRestaurants(): Restaurant[] {
    return Array.from(this.restaurants.values());
  }

  getRestaurant(id: string): Restaurant | null {
    return this.restaurants.get(id) || null;
  }
}
