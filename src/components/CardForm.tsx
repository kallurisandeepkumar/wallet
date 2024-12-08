import React, { useState } from 'react';
import { CreditCard } from '../types/card';
import { formatCardNumber } from '../utils/cardUtils';

interface CardFormProps {
  onAddCard: (card: Omit<CreditCard, 'id'>) => void;
}

export function CardForm({ onAddCard }: CardFormProps) {
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
    bank: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddCard({
      ...formData,
      type: formData.cardNumber.startsWith('4') ? 'visa' : 'mastercard',
    });
    setFormData({
      cardNumber: '',
      cardHolder: '',
      expiryDate: '',
      cvv: '',
      bank: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Card Number</label>
          <input
            type="text"
            maxLength={19}
            value={formData.cardNumber}
            onChange={(e) => setFormData({ ...formData, cardNumber: formatCardNumber(e.target.value.replace(/\s/g, '')) })}
            className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-50 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="1234 5678 9012 3456"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Card Holder</label>
          <input
            type="text"
            value={formData.cardHolder}
            onChange={(e) => setFormData({ ...formData, cardHolder: e.target.value })}
            className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-50 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="JOHN DOE"
            required
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">Expiry</label>
            <input
              type="text"
              maxLength={5}
              value={formData.expiryDate}
              onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
              className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-50 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="MM/YY"
              required
            />
          </div>
          
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">CVV</label>
            <input
              type="password"
              maxLength={3}
              value={formData.cvv}
              onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
              className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-50 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="123"
              required
            />
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">Bank</label>
            <input
              type="text"
              value={formData.bank}
              onChange={(e) => setFormData({ ...formData, bank: e.target.value })}
              className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-50 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Bank Name"
              required
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 py-3 px-4 text-white shadow-lg hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Add Card
      </button>
    </form>
  );
}