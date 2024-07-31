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
import useAuthentication from '../../Hooks/userHook';
import { ICONS } from '../../Shared/icons';
import { Jodit } from 'jodit';
import Masonry from 'react-masonry-css';
import CustomModal from '../../Components/Modal/CustomModal';

interface AddNoteProps {
  label: string ;
  itemID?: string;
  itemTitle?: string;
  itemDesc?: string | null;
  imageArray?: string[];
  setItemTitle?: React.Dispatch<React.SetStateAction<string>>;
  setItemDesc?: React.Dispatch<React.SetStateAction<string | null>>;
  setImageArray?: React.Dispatch<React.SetStateAction<string[]>>;
  setAddNote?: React.Dispatch<React.SetStateAction<boolean>>;
  closeModal?: React.Dispatch<React.SetStateAction<string | null>>;
}

function AddNote({
  label,
  itemID,
  itemTitle,
  itemDesc = '',
  imageArray,
  setItemTitle = () => {},
  setItemDesc = () => {},
  setImageArray = () => {},
  setAddNote = () => {},
  closeModal = () => {},
}: AddNoteProps) {
  const { uid } = useReduxSelector((state) => state.user);
  const theme = useReduxSelector((state) => state.ui.isDarkMode);
  const { uploadImageToFirebase, deleteImageFromFirebase, deleteImageFromFirestore } =
    useAuthentication();
  const editorRef = useRef(null);
  const titleRef = useRef(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [maxHeight, setMaxHeight] = useState(600);
  const [deleteImageModal, setDeleteImageModal] = useState<boolean>(false);
  const [imageContent, setImageContent] = useState<{index:number, url:string}>({index:-1,url:''});
  // const [imageUrls, setImageUrls] = useState<string[]>([]);

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

  // Jodit.modules.Icon.set('someIcon', `${ICONS.Image}`);
  useEffect(() => {
    // Set the custom icon
    Jodit.modules.Icon.set('someIcon', `${ICONS.Image}`);
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
    {
      // name: 'insertImage',
      // icon:Jodit.modules.Icon.get('cancel'),
      // icon:`${ICONS.Image}`,
      // iconURL: 'https://t4.ftcdn.net/jpg/00/53/45/31/360_F_53453175_hVgYVz0WmvOXPd9CNzaUcwcibiGao3CL.jpg',
      icon:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" class="jodit-icon_image jodit-icon"> <path d="M576 576q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm1024 384v448h-1408v-192l320-320 160 160 512-512zm96-704h-1600q-13 0-22.5 9.5t-9.5 22.5v1216q0 13 9.5 22.5t22.5 9.5h1600q13 0 22.5-9.5t9.5-22.5v-1216q0-13-9.5-22.5t-22.5-9.5zm160 32v1216q0 66-47 113t-113 47h-1600q-66 0-113-47t-47-113v-1216q0-66 47-113t113-47h1600q66 0 113 47t47 113z"></path> </svg>',
      tooltip: 'Insert Image',
      exec: () => {
        if (fileInputRef.current) {
          fileInputRef.current.click();
        }
      },
    },
    'link',
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

  const breakpointColumnsObj = {
    default: 5,
    1100: 4,
    700: 2,
    500: 1,
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const downloadURL = await uploadImageToFirebase({
          imageUri: file,
          userId: uid,
        });
        setImageArray((prevUrls) => [...prevUrls, downloadURL]);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const deleteImage = async (index: number, url: string) => {
    try {
      
      await deleteImageFromFirebase(url);

     if(itemID){
      await deleteImageFromFirestore(uid, label, url, itemID);
     }

      setImageArray((prevUrls) => prevUrls.filter((_, i) => i !== index));
      setDeleteImageModal(false);
    } catch (error) {
      console.error('Error deleting image:', error);
    }
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
      // toolbarButtons:options,
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
      disablePlugins: ['paste'],
      createAttributes: {
        a: {
          style: 'color: #0096FF; text-decoration: underline;',
        },
      },
      link: {
        noFollowCheckbox: false,
        openInNewTabCheckbox: false,
        formClassName: `${theme ? 'custom-link-form-dark' : 'custom-link-form'}`,
      },
      controls: {
        ul: {
          list: undefined,
        },
        ol: {
          list: undefined,
        },
      },
    }),
    [theme, maxHeight, imageArray]
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
        updateNote(uid, label, itemID, itemTitle, itemDesc, imageArray);
      } else if (effectiveLabel) {
        saveNoteLabel(uid, effectiveLabel, itemTitle, itemDesc, imageArray);
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
        className="bg-white dark:bg-jodit-dark w-full text-gray-700 dark:text-white placeholder-[#AAA7A7] placeholder:font-medium border border-b-0 border-my-hover dark:border-my-icon-dark p-2 focus-visible:outline-none focus:outline-none"
      />
        <div className="bg-white dark:bg-jodit-dark w-full max-h-52 overflow-auto border border-my-hover dark:border-my-icon-dark">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {imageArray?.map((url, index) => (
            <div key={index} className="relative h-auto p-2">
              <img src={url} alt="image" className="mb-2" />
              <button
                className="absolute top-3 right-3 rounded-full bg-gray-300 p-1 h-6 w-6"
                type="button"
                // onClick={() =>deleteImage(index, url)}
                onClick={() =>{
                  setImageContent({index,url})
                  setDeleteImageModal(true)}}
              >
                <img src={ICONS.Menu} alt="Menu" />
              </button>
            </div>
          ))}
        </Masonry>
      </div>
      <div id="myjoditEditor" className="text-left">
        <JoditEditor
          ref={editorRef}
          value={itemDesc || ''}
          config={config}
          onChange={(newContent) => setItemDesc(newContent)}
        />
      </div>
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleImageUpload}
      />
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
      <CustomModal
          showModal={deleteImageModal}
          closeModal={() => setDeleteImageModal(false)}
          title={ADD_NOTE.DELETE_MODAL}
          text={ADD_NOTE.ARE_YOU_SURE}
          button={ADD_NOTE.DELETE}
          handleModal={() =>
            deleteImage(imageContent?.index , imageContent?.url)
          }
        />
    </div>
  );
}

export default AddNote;
