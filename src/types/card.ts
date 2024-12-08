export interface CreditCard {
  id: string;
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
  bank: string;
  type: 'visa' | 'mastercard' | 'amex';
}