import { useEffect, useMemo, useRef, useState } from 'react';
import JoditEditor from 'jodit-react';
import {
  saveNoteLabel,
  updateCollectionCount,
  updateNote,
} from '../../Shared/firebaseUtils';
import { useReduxSelector } from '../../Store';
import { CONSTANTS, ERR_MSG, ERR_TITLE } from '../../Shared/Constants';
import { showAlert } from '../../Shared/alert';

interface AddNoteProps {
  label: string;
  itemID?: string;
  itemTitle?: string;
  itemDesc?: string | null;
  setItemTitle?: React.Dispatch<React.SetStateAction<string>>;
  setItemDesc?: React.Dispatch<React.SetStateAction<string | null>>;
}

function AddNote({
  label,
  itemID,
  itemTitle,
  itemDesc = '',
  setItemTitle = () => {},
  setItemDesc = () => {},
}: AddNoteProps) {
  const { uid } = useReduxSelector((state) => state.user);
  const editorRef = useRef(null);
  // const [title, setItemTitle] = useState<string>('');
  // const [desc, setItemDesc] = useState<string | null>(null);

  // useEffect(() => {
  //   if (itemTitle || itemDesc) {
  //     setItemTitle(itemTitle as string);
  //     setItemDesc(itemDesc as string);
  //   }
  // }, [itemTitle, itemDesc]);

  const options = [
    'bold',
    'italic',
    '|',
    'ul',
    'ol',
    '|',
    'font',
    'fontsize',
    '|',
    'outdent',
    'indent',
    'align',
    '|',
    'hr',
    '|',
    'brush',
    '|',
    'table',
    'image',
    'link',
    '|',
    'undo',
    'redo',
  ];

  const text = (): string | null => {
    if (itemDesc) {
      return '';
    }
    return 'Start typing here...';
  };

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: text(),
      defaultLineHeight: 1.5,
      theme: 'light',
      maxHeight: 600,
      buttons: options,
      buttonsMD: options,
      buttonsSM: options,
      buttonsXS: options,
      statusbar: false,
      uploader: {
        insertImageAsBase64URI: true,
      },
      sizeLG: 900,
      sizeMD: 700,
      sizeSM: 400,
      toolbarAdaptive: false,
      editorClassName: 'initial-text-color',
    }),
    []
  );

  const saveNote = () => {
    if (itemTitle === '' && itemDesc === '') {
      showAlert(ERR_TITLE.EMPTY_NOTE, ERR_MSG.NOTE_DISCARDED);
      return;
    }
    try {
      const defaultLabel = 'Others';
      const effectiveLabel = label || defaultLabel;
      if (itemID && label) {
        updateNote(uid, label, itemID, itemTitle as string, itemDesc as string);
      } else if (effectiveLabel) {
        saveNoteLabel(
          uid,
          effectiveLabel,
          itemTitle as string,
          itemDesc as string
        );
        updateCollectionCount(uid, effectiveLabel, CONSTANTS.INCREMENT);
      }

      setItemTitle('');
      setItemDesc('');
    } catch (error) {
      console.log('Error', error);
    }
  };

  return (
    <div className="justify-center align-middle text-center">
      <input
        value={itemTitle}
        type="text"
        autoComplete="off"
        placeholder="Title"
        maxLength={40}
        onChange={(e) => setItemTitle(e.target.value)}
        className="bg-white w-full text-gray-700 placeholder-gray-500 border border-b-0 border-solid border-my-hover p-2 focus-visible:outline-none"
      />
      <div className="text-left">
        <JoditEditor
          ref={editorRef}
          value={itemDesc || ''}
          config={config}
          onChange={(newContent) => setItemDesc(newContent)}
        />
      </div>
      <button
        className="bg-my-blue-500D p-2 rounded-lg mt-2"
        type="button"
        onClick={saveNote}
      >
        Save
      </button>
    </div>
  );
}

export default AddNote;
