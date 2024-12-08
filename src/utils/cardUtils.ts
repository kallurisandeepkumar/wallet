export const formatCardNumber = (number: string): string => {
  return number.replace(/(\d{4})/g, '$1 ').trim();
};

export const maskCardNumber = (number: string): string => {
  const last4 = number.slice(-4);
  return `•••• •••• •••• ${last4}`;
};

export const getCardType = (number: string): 'visa' | 'mastercard' | 'amex' => {
  if (number.startsWith('4')) return 'visa';
  if (number.startsWith('5')) return 'mastercard';
  return 'amex';
};