import admin from 'firebase-admin';

export const FIREBASE_DB = 'FIREBASE_DB';

export const firebaseDbFactory = async () => {
  await admin.initializeApp();
  return admin.firestore();
};
