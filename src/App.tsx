import React, { useState, useEffect } from 'react';
import { Card } from './components/Card';
import { CardForm } from './components/CardForm';
import { CreditCard } from './types/card';
import { Wallet, Lock } from 'lucide-react';
import { saveCard, getAllCards, deleteCard } from './utils/storage';

function App() {
  const [cards, setCards] = useState<CreditCard[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const loadCards = async () => {
      try {
        const savedCards = await getAllCards();
        setCards(savedCards);
      } catch (error) {
        console.error('Error loading cards:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCards();

    const handleOnlineStatus = () => setIsOnline(navigator.onLine);
    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);

    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, []);

  const handleAddCard = async (card: Omit<CreditCard, 'id'>) => {
    const newCard = { ...card, id: crypto.randomUUID() };
    try {
      await saveCard(newCard);
      setCards([...cards, newCard]);
      setShowForm(false);
    } catch (error) {
      console.error('Error saving card:', error);
    }
  };

  const handleDeleteCard = async (id: string) => {
    try {
      await deleteCard(id);
      setCards(cards.filter(card => card.id !== id));
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
          <div className="flex items-center space-x-3">
            <Wallet className="w-8 h-8 text-indigo-500" />
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Digital Wallet</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Lock className={`w-5 h-5 ${isOnline ? 'text-green-500' : 'text-yellow-500'}`} />
              <span className="text-sm text-gray-300">
                {isOnline ? 'Secured' : 'Offline Mode'}
              </span>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-4 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {showForm ? 'Cancel' : 'Add New Card'}
            </button>
          </div>
        </div>

        {showForm && (
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6 mb-8">
            <CardForm onAddCard={handleAddCard} />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {cards.map(card => (
            <div key={card.id} className="flex justify-center">
              <Card card={card} onDelete={handleDeleteCard} />
            </div>
          ))}
          {cards.length === 0 && !showForm && (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-400 text-lg">No cards added yet. Click "Add New Card" to get started.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;