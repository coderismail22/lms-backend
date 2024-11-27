import { Payment } from "./payment.model";

export const createPayment = async (paymentData: any) => {
  return Payment.create(paymentData);
};

export const getPaymentsForUser = async (userId: string) => {
  return Payment.find({ userId });
};

export const PaymentServices = {
  createPayment,
  getPaymentsForUser,
};
