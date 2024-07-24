import { useMemo, useRef, useEffect, useState } from 'react';
import JoditEditor from 'jodit-react';
import {
  saveNoteLabel,
  updateCollectionCount,
  updateNote,
} from '../../Shared/firebaseUtils';
import { useReduxSelector } from '../../Store';
import {
  ADD_NOTE,
  COLLECTION,
  CONSTANTS,
  ERR_MSG,
  ERR_TITLE,
  ROOT_ROUTER,
} from '../../Shared/Constants';
import { showAlert } from '../../Shared/alert';

interface AddNoteProps {
  label: string | undefined;
  itemID?: string;
  itemTitle?: string;
  itemDesc?: string | null;
  setItemTitle?: React.Dispatch<React.SetStateAction<string>>;
  setItemDesc?: React.Dispatch<React.SetStateAction<string | null>>;
  setAddNote?: React.Dispatch<React.SetStateAction<boolean>>;
  closeModal?: React.Dispatch<React.SetStateAction<string | null>>;
}

function AddNote({
  label,
  itemID,
  itemTitle,
  itemDesc = '',
  setItemTitle = () => {},
  setItemDesc = () => {},
  setAddNote = () => {},
  closeModal = () => {},
}: AddNoteProps) {
  const { uid } = useReduxSelector((state) => state.user);
  const theme = useReduxSelector((state) => state.ui.isDarkMode);
  const editorRef = useRef(null);
  const titleRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState(600);

  useEffect(() => {
    const handleResize = () => {
      const newMaxHeight = window.innerHeight * 0.6;
      setMaxHeight(newMaxHeight);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
    return ADD_NOTE.START_TYPING;
  };

  const handleCancel = () => {
    setAddNote(false);
    setItemDesc('');
    setItemTitle('');
  };

  const config = useMemo(
    () => ({
      zIndex: 0,
      tabIndex: -1,
      readonly: false,
      placeholder: text(),
      defaultLineHeight: 1.5,
      theme: theme ? ROOT_ROUTER.DARK : ROOT_ROUTER.LIGHT,
      maxHeight,
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
      // defaultActionOnPaste:'insert_only_text',
      disablePlugins: ['paste'],
      createAttributes: {
        a: {
          style: 'color: #0096FF; text-decoration: underline;'
        }
      },
      link: {
        noFollowCheckbox: false,
        openInNewTabCheckbox: false,
        formClassName: `${theme ? 'custom-link-form-dark' : 'custom-link-form'}`,
        // defaultAttributes: {
        //   style: 'color: blue; text-decoration: underline;'
        // },
      },
    }),
    [theme, maxHeight]
  );

  const stripHtmlTags = (str: string) => {
    const div = document.createElement('div');
    div.innerHTML = str;
    return div.textContent || div.innerText || '';
  };
  
  const saveNote = () => {
    const strippedDesc = stripHtmlTags(itemDesc || '').trim();
    const trimmedTitle = itemTitle?.trim();

    if (!trimmedTitle && !strippedDesc) {
      showAlert(ERR_TITLE.EMPTY_NOTE, ERR_MSG.NOTE_DISCARDED);
      handleCancel();
      return;
    }

    try {
      const defaultLabel = COLLECTION.OTHERS;
      const effectiveLabel = label || defaultLabel;

      if (itemID && label) {
        updateNote(uid, label, itemID, itemTitle, itemDesc);
      } else if (effectiveLabel) {
        saveNoteLabel(uid, effectiveLabel, itemTitle, itemDesc);
        updateCollectionCount(uid, effectiveLabel, CONSTANTS.INCREMENT);
      }

      setItemTitle('');
      setItemDesc('');
      setAddNote(false);
      closeModal('');
    } catch (error) {
      console.error('Error', error);
    }
  };

  return (
    <div className="justify-center align-middle text-center box-border">
      <input
        ref={titleRef}
        autoFocus={true}
        value={itemTitle}
        type="text"
        autoComplete="off"
        placeholder={ADD_NOTE.TITLE}
        maxLength={40}
        onChange={(e) => setItemTitle(e.target.value)}
        className="bg-white dark:bg-jodit-dark w-full text-gray-700 dark:text-white placeholder-gray-500 dark:placeholder-[#AAA7A7] placeholder:font-medium border border-b-0 border-my-hover dark:border-my-icon-dark p-2 focus-visible:outline-none focus:outline-none"
      />
      <div id="myjoditEditor" className="text-left">
        <JoditEditor
          ref={editorRef}
          value={itemDesc || ''}
          config={config}
          onChange={(newContent) => setItemDesc(newContent)}
          // onBlur={handleEditorBlur}
        />
      </div>
      <button
        className={`bg-red-600 p-2 rounded-lg mt-2 font-semibold mr-4 ${itemID && 'hidden'}`}
        type="button"
        onClick={handleCancel}
      >
        {ADD_NOTE.CANCEL}
      </button>
      <button
        className={`bg-my-blue-500D p-2 rounded-lg mt-2 font-semibold`}
        type="button"
        onClick={saveNote}
      >
        {ADD_NOTE.SAVE}
      </button>
    </div>
  );
}

export default AddNote;
