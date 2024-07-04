import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { COLLECTION, CONSTANTS, DEFAULT_NOTE } from './Constants';
import { CollectionItem } from './shared';
import { db } from '../utils';

export const userDocRef = (uid: string) => {
  // return firestore().collection(COLLECTION.USERS).doc(uid);
  return doc(db, COLLECTION.USERS, uid);
};

// customHook

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

// Add Note

// export const updateNote = async (
//   uid: string,
//   label: string,
//   itemID: string,
//   title: string,
//   desc: string,
// ) => {
//   try {
//     const noteRef = collection(userDocRef(uid), label);
//     const docRef = doc(noteRef, itemID);
//     await userDocRef(uid).collection(label).doc(itemID).update({
//       title,
//       desc,
//       createdAt: serverTimestamp(),
//     });
//   } catch (error) {
//     console.error('error', error);
//   }
// };

export const saveNoteLabel = async (
  uid: string,
  label: string,
  title: string,
  desc: string
) => {
  try {
    const noteRef = collection(userDocRef(uid), label);
    await addDoc(noteRef, {
      title,
      desc,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('error', error);
  }
};

export const updateCollectionCount = async (
  uid: string,
  itemText: string,
  action: string
) => {
  try {
    const doc = await getDoc(userDocRef(uid));
    const userData = doc.data();
    const updatedCollections = userData?.collections.map(
      (collection: { text: string; number: number }) => {
        if (collection.text === itemText) {
          const updatedNumber =
            action === CONSTANTS.INCREMENT
              ? collection.number + 1
              : collection.number - 1;
          return {
            ...collection,
            number: updatedNumber,
          };
        }
        return collection;
      }
    );
    await setDoc(
      userDocRef(uid),
      { collections: updatedCollections },
      { merge: true }
    );
  } catch (error) {
    throw error;
  }
};
