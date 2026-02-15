import { PaymentGateway } from "./paymentGatewayInterface";


export class fancyPay {
    pay(amount: number): void {
        console.log(`Paid amount using FancyPay: ${amount}`);
    }
}

export class UpiPayment implements PaymentGateway {
    makePayment(amount: number): void {
        console.log(`Paid amount using UPI: ${amount}`);
    }
}
export class CashPayment implements PaymentGateway {
    makePayment(amount: number): void {
        console.log(`Paid amount using Cash: ${amount}`);
    }
}



