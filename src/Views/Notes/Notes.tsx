import React, { MouseEvent as MouseE, useEffect, useState } from 'react';
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
import { COLLECTION, CONSTANTS, NOTES } from '../../Shared/Constants';
import NotesDropdown from './NotesDropdown';
import { useOutletContext, useParams } from 'react-router-dom';
import filter from 'lodash.filter';
import { ContextType } from '../Home/Home';
import CustomModal from '../../Components/Modal/CustomModal';

export interface Note {
  id: string;
  title: string;
  desc: string;
  createdAt: FieldValue;
}

const Notes: React.FC = () => {
  const { uid } = useReduxSelector((state) => state.user);
  const [notes, setNotes] = useState<Note[]>([]);
  const [fullNotes, setFullNotes] = useState<Note[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [menuModal, setMenuModal] = useState<boolean>(false);
  const [menuModalID, setMenuModalID] = useState<string>('');
  const [deleteNoteModal, setDeleteNoteModal] = useState<boolean>(false);
  const [itemID, setItemID] = useState('');
  const [itemTitle, setItemTitle] = useState('');
  const [itemDesc, setItemDesc] = useState<string | null>('');
  const [addNote, setAddNote] = useState<boolean>(false);
  // const addNoteRef = useRef<HTMLDivElement>(null);
  const { label } = useParams();
  const finalLabel = label || COLLECTION.OTHERS;
  const { searchText } = useOutletContext<ContextType>();

  useEffect(() => {
    const notesRef = collection(userDocRef(uid), finalLabel);
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
        setFullNotes(notesData);
      },
      (error) => {
        console.error(NOTES.ERROR, error);
      }
    );

    return () => unsubscribe();
  }, [finalLabel, uid]);

  useEffect(() => {
    setItemDesc('');
    setItemTitle('')
  }, [finalLabel]);

  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (
  //       addNoteRef.current &&
  //       !addNoteRef.current.contains(event.target as Node) &&
  //       !(event.target as HTMLElement).closest('.jodit-toolbar')
  //     ) {
  //       setAddNote(false);
  //     }
  //   };

  //   if (addNote) {
  //     document.addEventListener('mousedown', handleClickOutside);
  //   } else {
  //     saveNote();
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   }

  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, [addNote]);

  useEffect(() => {
    const formattedQuery = searchText?.toLowerCase();
    if (searchText) {
      const filteredNotes = filter(fullNotes, (note) =>
        contains(note, formattedQuery as string)
      );
      setNotes(filteredNotes);
    } else {
      setNotes(fullNotes);
    }
  }, [searchText, fullNotes]);

  const contains = ({ title, desc }: Note, query: string) => {
    return (
      title.toLowerCase().includes(query) || desc.toLowerCase().includes(query)
    );
  };

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
    try {
      await deleteNote(uid, finalLabel, noteID);
      updateCollectionCount(uid, finalLabel, CONSTANTS.DECREMENT);
    } catch (error) {
      console.error('error', error);
    }
    setDeleteNoteModal(false);
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
  };

  return (
    <div className="p-4 w-full max-h-full overflow-auto">
      <div className="flex justify-center w-full mb-4">
        {!showModal && addNote ? (
          <div className="w-full max-w-3xl mx-auto my-4">
            <AddNote
              label={finalLabel}
              itemTitle={itemTitle}
              itemDesc={itemDesc}
              setItemTitle={setItemTitle}
              setItemDesc={setItemDesc}
              setAddNote={setAddNote}
              // show={true}
            />
          </div>
        ) : (
          <div
            onClick={() => setAddNote(true)}
            className="w-full max-w-3xl mx-auto my-4 cursor-text bg-white dark:bg-jodit-dark text-gray-500 dark:text-white font-bold placeholder:font-medium border border-solid border-my-hover dark:border-my-icon-dark p-2 focus-visible:outline-none focus:outline-none"
          >
            {NOTES.ADD_NOTE}
          </div>
        )}
      </div>
      {notes.length === 0 && searchText === '' && (
        <p className="text-gray-500 p-8">{NOTES.START_COLLECTION}</p>
      )}
      {notes.length === 0 && searchText !== '' && (
        <p className="text-gray-500 p-8 text-center">{NOTES.NO_MATCHING}</p>
      )}

      <div className="grid min-[460px]:grid-cols-2 lg:grid-cols-4 gap-4 mt-12 xl:mx-36">
        {notes?.map((note) => (
          <div
            key={note.id}
            className="p-4 shadow-md rounded-lg relative cursor-pointer 2xl:min-w-56 dark:bg-my-hover-dark"
            onClick={() => handleNote(note)}
          >
            <button
              type={'button'}
              className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-200 hover:dark:bg-my-bg-dark"
              onClick={(e) => handleMenu(e, note.id)}
            >
              <img className="w-5 h-5" src={ICONS.Dots} alt={NOTES.MENU} />
            </button>
            <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-2 break-words mr-5">
              {note.title}
            </h2>
            <p
              className={`${!note.title && 'pt-2.5'} text-gray-700 dark:text-white line-clamp-5 break-words`}
            >
              {htmlFrom(note.desc)}
            </p>
            {menuModal && note.id === menuModalID && (
              <NotesDropdown
                onEdit={() => handleNote(note)}
                // onDelete={() => handleDelete(note.id)}
                onDelete={() => setDeleteNoteModal(true)}
                closeMenu={closeMenu}
              />
            )}
          </div>
        ))}
      </div>

      <CustomModal
        showModal={deleteNoteModal}
        closeModal={() => setDeleteNoteModal(false)}
        title={NOTES.DELETE}
        text={NOTES.ARE_YOU_SURE}
        button={NOTES.DEL}
        handleModal={() => handleDelete(menuModalID)}
      />

      {showModal && (
        <div
          id="authentication-modal"
          tabIndex={-1}
          aria-hidden="true"
          className="fixed inset-0 z-50 flex justify-center items-center w-full h-full overflow-y-auto overflow-x-hidden bg-black bg-opacity-60"
        >
          <div className="relative p-4 w-full max-w-4xl flex items-center justify-center">
            <div className="relative bg-white dark:bg-my-bg-dark rounded-lg shadow w-full h-full max-h-[50%] overflow-auto">
              <div className="flex items-center justify-between p-4 md:p-5 rounded-t">
                <div></div>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:dark:bg-my-hover-dark rounded-full text-sm w-8 h-8 inline-flex justify-center items-center"
                  onClick={closeModal}
                >
                  <img alt={NOTES.CLOSE} src={ICONS.Close} />
                </button>
              </div>
              <div className="p-4 md:p-5 box-border">
                <AddNote
                  label={finalLabel}
                  itemID={itemID}
                  itemTitle={itemTitle}
                  itemDesc={itemDesc}
                  setItemTitle={setItemTitle}
                  setItemDesc={setItemDesc}
                  closeModal={closeModal}
                  // show={false}
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
