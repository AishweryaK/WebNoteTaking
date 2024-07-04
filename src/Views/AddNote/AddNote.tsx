import { useMemo, useRef, useState } from 'react';
import JoditEditor from 'jodit-react';
import {
  saveNoteLabel,
  updateCollectionCount,
} from '../../Shared/firebaseUtils';
import { useReduxSelector } from '../../Store';
import { CONSTANTS, ERR_MSG, ERR_TITLE } from '../../Shared/Constants';
import { showAlert } from '../../Shared/alert';

interface AddNoteProps {
  label: string;
}

function AddNote({ label }: AddNoteProps) {
  const { uid } = useReduxSelector((state) => state.user);
  const editorRef = useRef(null);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  //   console.log(label, "LABELLLL")

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
      theme: 'default',
      //   enter: 'div',
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
      saveNoteLabel(uid, effectiveLabel, title, desc);
      updateCollectionCount(uid, effectiveLabel, CONSTANTS.INCREMENT);

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

// import { useState } from 'react';

// export default function AddNote({label}:AddNoteProps) {
//   const [showModal, setShowModal] = useState(false);

//   return (
//     <div>
//       {/* Modal toggle */}
//       <button
//         onClick={() => setShowModal(true)}
//         className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
//       >
//         Toggle modal
//       </button>

//       {/* Main modal */}
//       {showModal && (
//         <div
//           id="authentication-modal"
//           tabIndex={-1}
//           aria-hidden="true"
//           className="fixed inset-0 z-50 flex justify-center items-center w-full h-full overflow-y-auto overflow-x-hidden bg-black bg-opacity-60"
//         >
//           <div className="relative p-4 w-full max-w-md">
//             {/* Modal content */}
//             <div className="relative bg-white rounded-lg shadow">
//               {/* Modal header */}
//               <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
//                 <h3 className="text-xl font-semibold text-gray-900">
//                   Sign in to our platform
//                 </h3>
//                 <button
//                   type="button"
//                   className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
//                   onClick={() => setShowModal(false)}
//                 >
//                   <svg
//                     className="w-3 h-3"
//                     aria-hidden="true"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 14 14"
//                   >
//                     <path
//                       stroke="currentColor"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13"
//                     />
//                   </svg>
//                   <span className="sr-only">Close modal</span>
//                 </button>
//               </div>
//               {/* Modal body */}
//               <div className="p-4 md:p-5">
//                 <form className="space-y-4">
//                   <div>
//                     <label
//                       htmlFor="email"
//                       className="block mb-2 text-sm font-medium text-gray-900"
//                     >
//                       Your email
//                     </label>
//                     <input
//                       type="email"
//                       name="email"
//                       id="email"
//                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//                       placeholder="name@company.com"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label
//                       htmlFor="password"
//                       className="block mb-2 text-sm font-medium text-gray-900"
//                     >
//                       Your password
//                     </label>
//                     <input
//                       type="password"
//                       name="password"
//                       id="password"
//                       placeholder="••••••••"
//                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//                       required
//                     />
//                   </div>
//                   <div className="flex justify-between">
//                     <div className="flex items-start">
//                       <div className="flex items-center h-5">
//                         <input
//                           id="remember"
//                           type="checkbox"
//                           className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
//                           required
//                         />
//                       </div>
//                       <label
//                         htmlFor="remember"
//                         className="ms-2 text-sm font-medium text-gray-900"
//                       >
//                         Remember me
//                       </label>
//                     </div>
//                     <a href="#" className="text-sm text-blue-700 hover:underline">
//                       Lost Password?
//                     </a>
//                   </div>
//                   <button
//                     type="submit"
//                     className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
//                   >
//                     Login to your account
//                   </button>
//                   <div className="text-sm font-medium text-gray-500">
//                     Not registered?{' '}
//                     <a href="#" className="text-blue-700 hover:underline">
//                       Create account
//                     </a>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
