import { PaymentStatus } from "./enums";

export interface IPaymentStrategy {
  pay(amount: number): PaymentStatus;
}

export class CardPayment implements IPaymentStrategy {
  pay(amount: number): PaymentStatus {
    console.log("Processing Card Payment:", amount);
    return PaymentStatus.SUCCESS;
  }
}

export class UpiPayment implements IPaymentStrategy {
  pay(amount: number): PaymentStatus {
    console.log("Processing UPI Payment:", amount);
    return PaymentStatus.SUCCESS;
  }
}
