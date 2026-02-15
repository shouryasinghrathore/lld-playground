import { PaymentGateway } from "./paymentGatewayInterface";
import { fancyPay } from "./payments";

export class fancyPayAdapter implements PaymentGateway {
    constructor(private fancyPay: fancyPay) { }

    makePayment(amount: number): void {
        this.fancyPay.pay(amount);
    }
}