import { COLLECTION, DEFAULT_NOTE } from "./Constants";
import { CollectionItem } from "./shared";
// import { collection, doc } from 'firebase/firestore';
// import { db } from "../utils";

export const userDocRef = (uid: string) => {
    return firestore().collection(COLLECTION.USERS).doc(uid);
  };

export async function addDocumentsForUser(userUid: string) {
    const collections = [
      COLLECTION.PERSONAL,
      COLLECTION.ACADEMIC,
      COLLECTION.WORK,
      COLLECTION.OTHERS,
    ];
  
    const addDocumentPromises = collections.map(collectionName =>
      addDocumentToCollection(userUid, collectionName),
    );
  
    await Promise.all(addDocumentPromises);
  
    await userDocRef(userUid).set({
      collections: data,
    });
  }
  const data: CollectionItem[] = [
    {text: COLLECTION.PERSONAL, number: 1},
    {text: COLLECTION.ACADEMIC, number: 1},
    {text: COLLECTION.WORK, number: 1},
    {text: COLLECTION.OTHERS, number: 1},
  ];
  
  async function addDocumentToCollection(
    userUid: string,
    collectionName: string,
  ) {
    await userDocRef(userUid)
      .collection(collectionName)
      .add({
        title: `Welcome to your ${collectionName} collection!`,
        desc: DEFAULT_NOTE.DESCRIPTION,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
  }