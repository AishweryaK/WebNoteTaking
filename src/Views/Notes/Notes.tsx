import React, {
  MouseEvent as MouseE,
  useEffect,
  useState,
  useRef,
} from 'react';
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
import NotesDropdown from './NotesDropdown';

export interface Note {
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
  const [menuModal, setMenuModal] = useState<boolean>(false);
  const [menuModalID, setMenuModalID] = useState<string | null>(null);
  const [itemID, setItemID] = useState('');
  const [itemTitle, setItemTitle] = useState('');
  const [itemDesc, setItemDesc] = useState<string | null>('');
  const [addNote, setAddNote] = useState<boolean>(false);
  const addNoteRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        addNoteRef.current &&
        !addNoteRef.current.contains(event.target as Node)
      ) {
        setAddNote(false);
      }
    };

    if (addNote) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [addNote]);

  const handleNote = (note: Note) => {
    setShowModal(true);
    setItemID(note.id);
    setItemTitle(note.title);
    setItemDesc(note.desc);
  };

  const handleMenu = (e: MouseE<HTMLButtonElement>, modalID: string) => {
    e.stopPropagation();
    setMenuModal((prev) => !prev);
    setMenuModalID(modalID);
  };

  const handleDelete = async (noteID: string) => {
    const defaultLabel = 'Others';
    const effectiveLabel = label || defaultLabel;
    try {
      await deleteNote(uid, effectiveLabel, noteID);
      updateCollectionCount(uid, effectiveLabel, CONSTANTS.DECREMENT);
    } catch (error) {
      console.error('error', error);
    }
    setMenuModal(false);
  };

  const htmlFrom = (htmlString: string) => {
    return parse(htmlString);
  };

  const closeModal = () => {
    setShowModal(false);
    setItemTitle('');
    setItemDesc('');
  };

  const closeMenu = () => {
    setMenuModal(false);
    setMenuModalID(null);
  };

  return (
    <div className="p-4 w-full">
      <div className="flex justify-center w-full mb-4">
        {addNote ? (
          <div ref={addNoteRef} className='w-full max-w-3xl mx-auto my-4'>
            <AddNote
              label={label}
              itemTitle={itemTitle}
              itemDesc={itemDesc}
              setItemTitle={setItemTitle}
              setItemDesc={setItemDesc}
            />
          </div>
        ) : (
          // <div>
          //   <div className="justify-center align-middle text-center">
              <div
                onClick={() => setAddNote(true)}
                className="w-full max-w-3xl mx-auto my-4 cursor-text bg-white dark:bg-jodit-dark text-gray-500 dark:text-[#AAA7A7] placeholder:font-medium border border-solid border-my-hover dark:border-my-icon-dark p-2 focus-visible:outline-none focus:outline-none"
              >
                Add Note...
              </div>
          //   </div>
          // </div>
        )}
      </div>
      {notes.length === 0 && (
        <p className="text-gray-500 p-8">
          Add a note to start your collection!
        </p>
      )}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-12 xl:mx-36">
        {notes.map((note) => (
          <div
            key={note.id}
            className="p-4 shadow-md rounded-lg relative cursor-pointer 2xl:min-w-56 dark:bg-my-hover-dark"
            onClick={() => handleNote(note)}
          >
            <button
              className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-200 hover:dark:bg-my-bg-dark"
              onClick={(e) => handleMenu(e, note.id)}
            >
              <img className="w-5 h-5" src={ICONS.Dots} alt="Menu" />
            </button>
            <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-2 break-words mr-5">
              {note.title}
            </h2>
            <p className="text-gray-700 dark:text-white line-clamp-5 break-words">
              {htmlFrom(note.desc)}
            </p>
            {menuModal && note.id === menuModalID && (
              <NotesDropdown
                onEdit={() => handleNote(note)}
                onDelete={() => handleDelete(note.id)}
                closeMenu={closeMenu}
              />
            )}
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
            <div className="relative bg-white dark:bg-my-bg-dark rounded-lg shadow w-full h-full max-h-full overflow-auto">
              <div className="flex items-center justify-between p-4 md:p-5 rounded-t">
                <div></div>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:dark:bg-my-hover-dark rounded-full text-sm w-8 h-8 inline-flex justify-center items-center"
                  onClick={closeModal}
                >
                  <img alt="Close" src={ICONS.Close} />
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
                  closeModal={closeModal}
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
