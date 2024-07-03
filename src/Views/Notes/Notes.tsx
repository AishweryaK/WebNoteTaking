// interface NotesProps {
//   label:string;
// }

// function Notes({label}:NotesProps) {
//   return
// }

// export default Notes;

import React, { useEffect, useState } from 'react';
import {
  collection,
  query,
  where,
  onSnapshot,
  FieldValue,
  orderBy,
} from 'firebase/firestore';
import { db } from '../../utils';
import { useReduxSelector } from '../../Store';
import { ICONS } from '../../Shared/icons';
import { userDocRef } from '../../Shared/firebaseUtils';

interface Note {
  id: string;
  title: string;
  desc: string;
  createdAt: FieldValue;
}

interface NotesProps {
  label: string;
}

const Notes: React.FC<NotesProps> = ({ label }) => {
  const { uid } = useReduxSelector((state) => state.user);
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const defaultLabel = 'Others';
    const effectiveLabel = label || defaultLabel;
    const notesRef = collection(userDocRef(uid), effectiveLabel);
    const q = query(notesRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const notesData: Note[] = [];
        snapshot.forEach((doc) => {
          notesData.push({
            id: doc.id,
            ...doc.data(),
          } as Note);
        });
        setNotes(notesData);
      },
      (error) => {
        console.error('Error fetching notes:', error);
        // Handle error state if needed
      }
    );

    return () => unsubscribe();
  }, [label, uid]);

  return (
    <div className="p-4">
      {notes.length === 0 && (
        <p className="text-gray-500">No notes found for this label.</p>
      )}
      <div className="grid grid-cols-1 gap-4">
        {notes.map((note) => (
          <div key={note.id} className="p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-semibold text-gray-700">
              {note.title}
            </h2>
            <p className="text-gray-700">{note.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;
