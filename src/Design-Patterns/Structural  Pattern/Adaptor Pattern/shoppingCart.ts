import { fancyPayAdapter } from "./fancyPayAdapter";
import { PaymentGateway } from "./paymentGatewayInterface";
import { fancyPay } from "./payments";
export class shoppingCart {
    constructor(private paymentGateway: PaymentGateway) { }

    checkout(amount: number): void {
        this.paymentGateway.makePayment(amount);
    }
}
const cart = new shoppingCart(new fancyPayAdapter(new fancyPay()));
cart.checkout(100);