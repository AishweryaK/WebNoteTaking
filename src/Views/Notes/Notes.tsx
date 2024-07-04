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
import parse from 'html-react-parser';
import { db } from '../../utils';
import { useReduxSelector } from '../../Store';
import { ICONS } from '../../Shared/icons';
import { userDocRef } from '../../Shared/firebaseUtils';
import AddNote from '../AddNote/AddNote';

interface Note {
  id: string;
  title: string;
  desc: string;
  createdAt: FieldValue;
}

interface NotesProps {
  label: string;
}

const Notes: React.FC = () => {
  //   const { uid } = useReduxSelector((state) => state.user);
  //   const [notes, setNotes] = useState<Note[]>([]);
  //   const [showModal, setShowModal]= useState<boolean>(false);

  //   useEffect(() => {
  //     const defaultLabel = 'Others';
  //     const effectiveLabel = label || defaultLabel;
  //     const notesRef = collection(userDocRef(uid), effectiveLabel);
  //     const q = query(notesRef, orderBy('createdAt', 'desc'));

  //     const unsubscribe = onSnapshot(
  //       q,
  //       (snapshot) => {
  //         const notesData: Note[] = [];
  //         snapshot.forEach((doc) => {
  //           notesData.push({
  //             id: doc.id,
  //             ...doc.data(),
  //           } as Note);
  //         });
  //         setNotes(notesData);
  //       },
  //       (error) => {
  //         console.error('Error fetching notes:', error);
  //       }
  //     );

  //     return () => unsubscribe();
  //   }, [label, uid]);

  //   const handleNote = () => {
  //     setShowModal(true);
  //   }

  // const htmlFrom = (htmlString:string) => {
  //         const html = parse(htmlString);
  //         return html;
  // }

  //   return (
  //     <div className="p-4">
  //       <AddNote label={label} />
  //       {notes.length === 0 && (
  //         <p className="text-gray-500">No notes found for this label.</p>
  //       )}
  //       <div className="grid lg:grid-cols-4 gap-4 mt-12">
  //         {notes.map((note) => (
  //           <button key={note.id} className="p-4 box-border hover:shadow-xl bg-white shadow-md rounded-lg" onClick={handleNote}>
  //             <h2 className="text-xl font-semibold text-gray-700">
  //               {note.title}
  //             </h2>
  //             <p className="text-gray-700">{htmlFrom(note.desc)}</p>
  //           </button>
  //         ))}
  //       </div>

  //       {showModal && (
  //         <div
  //           id="authentication-modal"
  //           tabIndex={-1}
  //           aria-hidden="true"
  //           className="fixed inset-0 z-50 flex justify-center items-center w-full h-full overflow-y-auto overflow-x-hidden bg-black bg-opacity-60"
  //         >
  //           <div className="relative p-4 w-full max-w-80 md:max-w-sm m-h-full">
  //             <div className="relative bg-white rounded-lg shadow">
  //               <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
  //                 <AddNote label={'Others'} />
  //               </div>
  //               </div>
  //               </div>
  //               </div>
  //      )}
  //     </div>
  //   );
  return <div className="w-full bg-orange-500">notes</div>;
};

export default Notes;
