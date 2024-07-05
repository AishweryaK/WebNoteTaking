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
  itemID? : string;
  itemTitle?:string;
  itemDesc?:string;
}

function AddNote({ label, itemID, itemTitle, itemDesc }: AddNoteProps) {
  const { uid } = useReduxSelector((state) => state.user);
  const editorRef = useRef(null);
  const [title, setTitle] = useState<string>('');
  const [desc, setDesc] = useState<string>('');

  useEffect(() => {
    if (itemTitle || itemDesc) {
      setTitle(itemTitle as string);
      setDesc(itemDesc as string);
    }
  }, [itemTitle, itemDesc]);

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

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: 'Start typing here...',
      //   defaultActionOnPaste: 'insert_as_html',
      defaultLineHeight: 1.5,
      // theme: 'default',
      //   enter: 'div',
      theme:'light',
      maxHeight:600,
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
    }),
    []
  );

  const saveNote = () => {
    if (title === '' && desc === '') {
      showAlert(ERR_TITLE.EMPTY_NOTE, ERR_MSG.NOTE_DISCARDED);
      return;
    }
    try {
      const defaultLabel = 'Others';
      const effectiveLabel = label || defaultLabel;
      if (itemID && label)  {
        updateNote(uid, label, itemID, title, desc);
      }
      else if(label) {
        saveNoteLabel(uid, effectiveLabel, title, desc);
        updateCollectionCount(uid, effectiveLabel, CONSTANTS.INCREMENT);
      }

      setTitle('');
      setDesc('');
    } catch (error) {
      console.log('Error', error);
    }
  };

  return (
    <div className="justify-center align-middle text-center">
      <input
        value={title}
        type="text"
        autoComplete="off"
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
        className="bg-white w-full text-gray-700 placeholder-gray-500 border border-b-0 border-solid border-my-hover p-2"
      />
      <JoditEditor
        ref={editorRef}
        value={desc}
        config={config}
        onChange={(newContent) => setDesc(newContent)}
      />
      <button
        className="bg-my-blue-500D p-2 rounded-lg"
        type="button"
        onClick={saveNote}
      >
        Save
      </button>
    </div>
  );
}

export default AddNote;