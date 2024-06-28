import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { COLLECTION, DEFAULT_NOTE } from './Constants';
import { CollectionItem } from './shared';
import { db } from '../utils';

export const userDocRef = (uid: string) => {
  // return firestore().collection(COLLECTION.USERS).doc(uid);
  return doc(db, COLLECTION.USERS, uid);
};

export async function addDocumentsForUser(userUid: string) {
  const collections = [
    COLLECTION.PERSONAL,
    COLLECTION.ACADEMIC,
    COLLECTION.WORK,
    COLLECTION.OTHERS,
  ];

  const data: CollectionItem[] = [
    { text: COLLECTION.PERSONAL, number: 1 },
    { text: COLLECTION.ACADEMIC, number: 1 },
    { text: COLLECTION.WORK, number: 1 },
    { text: COLLECTION.OTHERS, number: 1 },
  ];

  async function addDocumentToCollection(
    userUid: string,
    collectionName: string
  ) {
    const collectionRef = collection(userDocRef(userUid), collectionName);
    await addDoc(collectionRef, {
      title: `Welcome to your ${collectionName} collection!`,
      desc: DEFAULT_NOTE.DESCRIPTION,
      createdAt: serverTimestamp(),
    });
  }

  const addDocumentPromises = collections.map((collectionName) =>
    addDocumentToCollection(userUid, collectionName)
  );

  await Promise.all(addDocumentPromises);

  await setDoc(userDocRef(userUid), {
    collections: data,
  });
}
