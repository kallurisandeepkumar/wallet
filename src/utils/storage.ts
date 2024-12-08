import { openDB } from 'idb';
import { CreditCard } from '../types/card';
import { encrypt, decrypt } from './encryption';

const DB_NAME = 'wallet_db';
const STORE_NAME = 'cards';

const initDB = async () => {
  const db = await openDB(DB_NAME, 1, {
    upgrade(db) {
      db.createObjectStore(STORE_NAME, { keyPath: 'id' });
    },
  });
  return db;
};

export const saveCard = async (card: CreditCard): Promise<void> => {
  const db = await initDB();
  const encryptedCard = {
    ...card,
    cardNumber: encrypt(card.cardNumber),
    cardHolder: encrypt(card.cardHolder),
    cvv: encrypt(card.cvv),
  };
  await db.put(STORE_NAME, encryptedCard);
};

export const getAllCards = async (): Promise<CreditCard[]> => {
  const db = await initDB();
  const cards = await db.getAll(STORE_NAME);
  return cards.map(card => ({
    ...card,
    cardNumber: decrypt(card.cardNumber),
    cardHolder: decrypt(card.cardHolder),
    cvv: decrypt(card.cvv),
  }));
};

export const deleteCard = async (id: string): Promise<void> => {
  const db = await initDB();
  await db.delete(STORE_NAME, id);
};