import React, { MouseEvent, useEffect, useState } from 'react';
import {
  collection,
  query,
  onSnapshot,
  FieldValue,
  orderBy,
} from 'firebase/firestore';
import parse from 'html-react-parser';
import { useReduxSelector } from '../../Store';
import {
  deleteNote,
  updateCollectionCount,
  userDocRef,
} from '../../Shared/firebaseUtils';
import AddNote from '../AddNote/AddNote';
import { ICONS } from '../../Shared/icons';
import { CONSTANTS } from '../../Shared/Constants';

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
  const [showModal, setShowModal] = useState<boolean>(false);
  const [itemID, setItemID] = useState('');
  const [itemTitle, setItemTitle] = useState('');
  const [itemDesc, setItemDesc] = useState<string | null>('');

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
      }
    );

    return () => unsubscribe();
  }, [label, uid]);

  const handleNote = (note: Note) => {
    setShowModal(true);
    setItemID(note.id);
    setItemTitle(note.title);
    setItemDesc(note.desc);
  };

  const handleDelete = async (e: MouseEvent<HTMLButtonElement>, note: Note) => {
    e.stopPropagation();
    const defaultLabel = 'Others';
    const effectiveLabel = label || defaultLabel;
    try {
      await deleteNote(uid, effectiveLabel, note.id);
      updateCollectionCount(uid, effectiveLabel, CONSTANTS.DECREMENT);
    } catch (error) {
      console.error('error', error);
    }
  };

  const htmlFrom = (htmlString: string) => {
    const html = parse(htmlString);
    return html;
  };

  const closeModal = () => {
    setShowModal(false);
    setItemTitle('');
    setItemDesc('');
  };

  return (
    <div className="p-4 w-full">
      <div className="flex justify-center w-full mb-4">
        <AddNote
          label={label}
          itemTitle={itemTitle}
          itemDesc={itemDesc}
          setItemTitle={setItemTitle}
          setItemDesc={setItemDesc}
        />
      </div>
      {notes.length === 0 && (
        <p className="text-gray-500">No notes found for this label.</p>
      )}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-12 xl:mx-36">
        {notes.map((note) => (
          <div
            key={note.id}
            className="p-4 shadow-md rounded-lg relative cursor-pointer overflow-hidden 2xl:min-w-56 dark:bg-my-hover-dark"
            onClick={() => handleNote(note)}
          >
            <button
              className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-200"
              onClick={(e) => handleDelete(e, note)}
            >
              <img className="w-4 h-4" src={ICONS.Dots} alt="Delete" />
            </button>
            <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-2 break-words mr-5">
              {note.title}
            </h2>
            <p className="text-gray-700 dark:text-white line-clamp-5 break-words">
              {htmlFrom(note.desc)}
            </p>
          </div>
        ))}
      </div>

      {showModal && (
        <div
          id="authentication-modal"
          tabIndex={-1}
          aria-hidden="true"
          className="fixed inset-0 z-50 flex justify-center items-center w-full h-full overflow-y-auto overflow-x-hidden bg-black bg-opacity-60"
        >
          <div className="relative p-4 w-full max-w-4xl flex items-center justify-center">
            <div className="relative bg-white rounded-lg shadow w-full h-full max-h-full overflow-auto">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                <h3 className="text-xl font-semibold text-gray-900">
                  Edit Note
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
                  onClick={closeModal}
                >
                  <img alt="" src={ICONS.Close} />
                </button>
              </div>
              <div className="p-4 md:p-5">
                <AddNote
                  label={label}
                  itemID={itemID}
                  itemTitle={itemTitle}
                  itemDesc={itemDesc}
                  setItemTitle={setItemTitle}
                  setItemDesc={setItemDesc}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notes;
