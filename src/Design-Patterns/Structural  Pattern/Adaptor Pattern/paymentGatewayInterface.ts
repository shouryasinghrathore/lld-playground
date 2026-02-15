export interface PaymentGateway {
    makePayment(amount: number): void;
}