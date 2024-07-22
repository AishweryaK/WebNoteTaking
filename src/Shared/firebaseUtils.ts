import {
  WriteBatch,
  addDoc,
  arrayRemove,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
  updateDoc,
  writeBatch,
} from 'firebase/firestore';
import { db } from '../utils';
import { COLLECTION, CONSTANTS, DEFAULT_NOTE } from './Constants';
import { CollectionItem } from './shared';

export const userDocRef = (uid: string) => {
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

// Notes

export const deleteNote = async (
  uid: string,
  itemText: string,
  itemUid: string
) => {
  try {
    const collRef = collection(userDocRef(uid), itemText);
    const docRef = doc(collRef, itemUid);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('error', error);
    throw error;
  }
};

// Add Note

export const updateNote = async (
  uid: string,
  label: string,
  itemID: string,
  title: string | undefined,
  desc: string | null
) => {
  try {
    const noteRef = collection(userDocRef(uid), label);
    const docRef = doc(noteRef, itemID);
    await updateDoc(docRef, {
      title,
      desc,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('error', error);
  }
};

export const saveNoteLabel = async (
  uid: string,
  label: string,
  title: string | undefined,
  desc: string | null
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

// Label Layout- Edit collection

export const updateCollections = async (
  uid: string,
  updatedCollections: CollectionItem[]
) => {
  try {
    await updateDoc(userDocRef(uid), { collections: updatedCollections });
  } catch (error) {
    throw error;
  }
};

export const commitBatch = async (batch: WriteBatch) => {
  try {
    await batch.commit();
  } catch (error) {
    throw error;
  }
};

export const batchDelete = async (deleteBatch: WriteBatch) => {
  try {
    await deleteBatch.commit();
  } catch (error) {
    throw error;
  }
};

export const handleEdit = async (
  collectionName: string,
  label: string,
  allCollections: CollectionItem[],
  uid: string,
  setEmptyColl: (value: boolean) => void,
  setExistingErr: (value: boolean) => void,
  setAllCollections: React.Dispatch<React.SetStateAction<CollectionItem[]>>,
  handleClose: () => void
) => {
  const trimmedColl = collectionName.trim();
  if (trimmedColl === '') {
    setEmptyColl(true);
    return;
  }
  const existingCollection = allCollections.find(
    (collection) => collection.text.toLowerCase() === trimmedColl.toLowerCase()
  );
  if (existingCollection) {
    setExistingErr(true);
    return;
  }

  try {
    const collectionIndex = allCollections.findIndex(
      (coll) => coll.text === label
    );
    if (collectionIndex !== -1) {
      const updatedCollections = [...allCollections];
      updatedCollections[collectionIndex].text = trimmedColl;

      await updateCollections(uid, updatedCollections);

      const oldCollectionRef = collection(userDocRef(uid), label);

      const newCollectionRef = collection(userDocRef(uid), trimmedColl);

      const snapshot = await getDocs(oldCollectionRef);
      const batch = writeBatch(db);

      snapshot.forEach((docs) => {
        const newDocRef = doc(newCollectionRef, docs.id);
        batch.set(newDocRef, docs.data());
      });

      await commitBatch(batch);

      const deleteBatch = writeBatch(db);
      snapshot.forEach((doc) => {
        deleteBatch.delete(doc.ref);
      });

      await batchDelete(deleteBatch);

      setAllCollections(updatedCollections);
      handleClose();
    } else {
      console.error('Collection not found');
    }
  } catch (error) {
    console.error('Error updating collection:', error);
  }
};

//Label layout - delete collection

export const removeCollectionFromFirestore = async (
  uid: string,
  collections: CollectionItem[],
  collName: string
) => {
  const collectionItem = collections.find(
    (collection) => collection.text === collName
  );
  const number = collectionItem ? collectionItem.number : 1;

  await updateDoc(userDocRef(uid), {
    collections: arrayRemove({
      text: collName,
      number: number,
    }),
  });
};

export const handleDeleteCollection = async (
  uid: string,
  collections: CollectionItem[],
  collName: string,
  setCollections: React.Dispatch<React.SetStateAction<CollectionItem[]>>
) => {
  // if (
  //   collName === COLLECTION.PERSONAL ||
  //   collName === COLLECTION.ACADEMIC ||
  //   collName === COLLECTION.WORK ||
  //   collName === COLLECTION.OTHERS
  // ) {
  //   showAlert(ERR_TITLE.ACTION_NOT_ALLOWED, ERR_MSG.CANNOT_DELETE);
  //   return;
  // }
  try {
    const collectionRef = collection(userDocRef(uid), collName);
    const snapshot = await getDocs(collectionRef);
    const deletePromises = snapshot.docs.map((doc) => deleteDoc(doc.ref));
    await Promise.all(deletePromises);
    removeCollectionFromFirestore(uid, collections, collName);

    setCollections((prevCollections) => {
      return prevCollections.filter(
        (collection) => collection.text !== collName
      );
    });
  } catch (error) {
    console.error('error', error);
  }
};

//Label Layout - addLabel

export const addNewLabel = async (
  uid: string,
  updatedLabels: CollectionItem[],
) => {
  await setDoc(
    userDocRef(uid),
    {
      collections: updatedLabels,
    },
    { merge: true }
  );
};
