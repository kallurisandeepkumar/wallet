import React, { useState } from 'react';
import { CreditCard as CardType } from '../types/card';
import { maskCardNumber } from '../utils/cardUtils';
import { copyToClipboard } from '../utils/clipboardUtils';
import { CreditCard, Copy, Check, Trash2 } from 'lucide-react';

interface CardProps {
  card: CardType;
  onDelete: (id: string) => void;
}

export function Card({ card, onDelete }: CardProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleCopy = async (text: string, field: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    }
  };

  const CopyButton = ({ text, field }: { text: string; field: string }) => (
    <button
      onClick={() => handleCopy(text, field)}
      className="ml-2 p-1 rounded-full hover:bg-gray-700 transition-colors"
      title={`Copy ${field}`}
    >
      {copiedField === field ? (
        <Check className="w-4 h-4 text-green-400" />
      ) : (
        <Copy className="w-4 h-4 text-gray-400" />
      )}
    </button>
  );

  return (
    <div className="relative group touch-manipulation">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
      <div className="relative w-full max-w-[320px] sm:w-[320px] rounded-xl p-6 bg-gradient-to-br from-gray-900 to-gray-800 shadow-xl">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <div className="text-gray-400 text-sm">{card.bank}</div>
            <CopyButton text={card.bank} field="bank" />
          </div>
          <CreditCard className="w-8 h-8 text-gray-400" />
        </div>
        
        <div className="mt-8 flex items-center">
          <p className="font-mono text-lg sm:text-xl text-gray-200 tracking-wider break-all">
            {maskCardNumber(card.cardNumber)}
          </p>
          <CopyButton text={card.cardNumber} field="cardNumber" />
        </div>
        
        <div className="mt-8 flex justify-between">
          <div className="flex items-center">
            <div>
              <p className="text-xs text-gray-400">Card Holder</p>
              <p className="text-sm text-gray-300">{card.cardHolder}</p>
            </div>
            <CopyButton text={card.cardHolder} field="cardHolder" />
          </div>
          <div className="flex items-center">
            <div>
              <p className="text-xs text-gray-400">Expires</p>
              <p className="text-sm text-gray-300">{card.expiryDate}</p>
            </div>
            <CopyButton text={card.expiryDate} field="expiryDate" />
          </div>
        </div>

        {showDeleteConfirm ? (
          <div className="absolute top-2 right-2 flex space-x-2">
            <button
              onClick={() => setShowDeleteConfirm(false)}
              className="p-1 rounded-full bg-gray-600 text-white hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              onClick={() => onDelete(card.id)}
              className="p-1 rounded-full bg-red-500 text-white hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="absolute top-2 right-2 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 hover:bg-red-600 text-white"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}