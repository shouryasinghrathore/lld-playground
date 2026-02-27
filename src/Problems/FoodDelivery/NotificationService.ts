import { User } from "./users";

export class NotificationService {
  notifyUser(user: User, message: string) {
    console.log(`Notification to ${user.name}: ${message}`);
  }
}