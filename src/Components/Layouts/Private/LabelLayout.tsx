import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { onSnapshot } from 'firebase/firestore';
import { NavLink, useParams } from 'react-router-dom';
import Modal from 'react-modal';
import {
  addNewLabel,
  handleDeleteCollection,
  handleEdit,
  userDocRef,
} from '../../../Shared/firebaseUtils';
import { useReduxSelector } from '../../../Store';
import { ICONS } from '../../../Shared/icons';
import {
  CHANGE_PASSWORD,
  COLLECTION,
  LABEL_LAYOUT,
} from '../../../Shared/Constants';
import CustomModal from '../../Modal/CustomModal';

interface CollectionItem {
  text: string;
  number: number;
}

interface LabelsListProps {
  openSidebar: (value: boolean) => void;
  isSidebarOpen: boolean;
}

const LabelsList: React.FC<LabelsListProps> = React.memo(
  ({ openSidebar, isSidebarOpen }) => {
    const { uid } = useReduxSelector((state) => state.user);
    const [labels, setLabels] = useState<CollectionItem[]>([]);
    const [deleteLabel, setDeleteLabel] = useState<CollectionItem>();
    const [showModal, setShowModal] = useState<boolean>(false);
    const [deleteModal, setDeleteModal] = useState<boolean>(false);
    const [newLabel, setNewLabel] = useState<string>('');
    const [emptyLabel, setEmptyLabel] = useState<boolean>(false);
    const [editedLabel, setEditedLabel] = useState<string>('');
    const [editedLabelIndex, setEditedLabelIndex] = useState<number | null>(
      null
    );
    const [beforeEdit, setBeforeEdit] = useState<string>('');
    const [others, setOthers] = useState<string | null>(null);
    const [existingErr, setExistingErr] = useState<boolean>(false);
    const [existingLabel, setExistingLabel] = useState<boolean>(false);
    const inputRef = useRef<(HTMLInputElement | null)[]>([]);
    const { label } = useParams();

    useEffect(() => {
      const unsubscribe = onSnapshot(userDocRef(uid), (snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.data();
          if (userData && userData.collections) {
            setLabels(userData.collections);
          }
        }
      });

      return () => unsubscribe();
    }, [uid]);

    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth <= 768) {
          openSidebar(false);
        } else openSidebar(true);
      };

      window.addEventListener('resize', handleResize);
      handleResize();

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    useEffect(() => {
      if (label) {
        setOthers(null);
      } else {
        setOthers(COLLECTION.OTHERS);
      }
    }, [label]);

    const editedWrapper = (
      e: ChangeEvent<HTMLInputElement>,
      text: string,
      index: number
    ): void => {
      const newEditedLabel = e.target.value;
      setEditedLabelIndex(index);
      setBeforeEdit(text);
      setEditedLabel(newEditedLabel);
    };

    const editLabel = async () => {
      if (editedLabel.trim() === '') {
        setEmptyLabel(true);
        return;
      }
      await handleEdit(
        editedLabel,
        beforeEdit,
        labels,
        uid,
        setEmptyLabel,
        setExistingErr,
        setLabels,
        closeModal
      );
    };

    const deleteWrapper = (
      uid: string,
      labels: CollectionItem[],
      label: { text: string; number: number },
      setLabels: React.Dispatch<React.SetStateAction<CollectionItem[]>>
    ) => {
      handleDeleteCollection(uid, labels, label.text, setLabels);
      setDeleteModal(false);
    };

    const closeModal = () => {
      setNewLabel('');
      setShowModal(false);
      setEmptyLabel(false);
      setExistingErr(false);
      setExistingLabel(false);
      setEditedLabel('');
      setEditedLabelIndex(null);
    };

    const handleFocus = (index: number) => {
      if (inputRef.current[index]) {
        inputRef.current[index]?.focus();
      }
    };

    const addLabel = async () => {
      if (newLabel.trim() === '') {
        setEmptyLabel(true);
        return;
      }
      setEmptyLabel(false);
      const trimmedNewLabel = newLabel.trim();
      const existingLabels = labels.find(
        (collection) =>
          collection.text.toLowerCase() === trimmedNewLabel.toLowerCase()
      );
      if (existingLabels) {
        // setShowModal(false);
        // setNewLabel('');
        setExistingLabel(true);
        return;
      } else {
        setExistingLabel(false);
      }
      const updatedLabels = [...labels, { text: trimmedNewLabel, number: 0 }];
      addNewLabel(uid, updatedLabels);
      setLabels(updatedLabels);
      setNewLabel('');
    };

    return (
      <div>
        <div
          className={`${
            isSidebarOpen ? 'min-w-72' : 'min-w-20'
          } h-full overflow-hidden ease-in-out duration-200 pt-2`}
        >
          <div className="flex flex-col">
            {labels.map((label, index) => (
              <NavLink
                key={index}
                title={label.text}
                to={`/home/${label.text}`}
                className={({ isActive }) =>
                  `space-x-4 pl-4 min-w-full h-14 flex flex-row rounded-e-full items-center text-gray-900 dark:text-white ${
                    isActive || label.text === others
                      ? 'bg-my-blue-500D text-white font-semibold'
                      : 'hover:bg-my-hover hover:dark:bg-my-hover-dark'
                  }`
                }
              >
                <img className="w-10 p-2" src={ICONS.Label} alt="" />
                {isSidebarOpen && (
                  <div className="overflow-hidden text-ellipsis pr-3">
                    {label.text}
                  </div>
                )}
              </NavLink>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="space-x-4 pl-4 w-full h-14 flex flex-row hover:bg-my-hover hover:dark:bg-my-hover-dark rounded-e-full items-center hover:text-white"
          >
            <img className="w-10 p-2" src={ICONS.Edit} alt="" />
            {isSidebarOpen && (
              <div className="text-gray-900 dark:text-white">
                {LABEL_LAYOUT.EDIT}
              </div>
            )}
          </button>
        </div>

        <Modal
          isOpen={showModal}
          onRequestClose={closeModal}
          contentLabel={LABEL_LAYOUT.EDIT_LABELS}
          className="fixed top-1/2 left-1/2 right-auto bottom-auto mr-[-50%] transform translate-x-[-50%] translate-y-[-50%] bg-gray-900 border-none p-0"
          overlayClassName="fixed inset-0 bg-black bg-opacity-75 z-50"
        >
          <div className="relative bg-white dark:bg-my-bg-dark rounded-lg shadow max-h-[70vh] xl:max-h-[80vh] box-border">
            <div className="flex items-center justify-between p-4 md:p-5 border-b dark:border-my-icon-dark rounded-t">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {LABEL_LAYOUT.EDIT_LABELS}
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:dark:bg-my-hover-dark hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
                onClick={closeModal}
              >
                <img alt="" src={ICONS.Close} />
              </button>
            </div>
            <div className="p-4 md:px-5">
              <div className="space-y-2">
                <div>
                  <ul className="space-y-2 max-h-60 xl:max-h-72 overflow-scroll no-scrollbar">
                    {labels.map((label, index) => (
                      <li
                        key={label?.text}
                        className="flex items-center text-gray-900"
                      >
                        <img
                          className="mr-4 w-6 h-6"
                          src={ICONS.LabelFilled}
                          alt=""
                        />
                        <input
                          ref={(el) => (inputRef.current[index] = el)}
                          disabled={label.text === COLLECTION.OTHERS}
                          maxLength={20}
                          defaultValue={label.text}
                          onChange={(e) => editedWrapper(e, label.text, index)}
                          className="text-ellipsis flex-1 bg-white dark:bg-my-bg-dark dark:text-white mr-5 focus-visible:outline-none focus:border-b dark:border-b-my-hover-dark border-b-my-hover no-underline"
                        />
                        {label.text !== COLLECTION.OTHERS && (
                          <button
                            className="mr-4 p-1 rounded-full hover:bg-my-hover hover:dark:bg-my-hover-dark"
                            type="button"
                            onClick={() => {
                              setDeleteLabel(label);
                              setDeleteModal(true);
                            }}
                          >
                            <img className="w-5 h-5" src={ICONS.Trash} alt="" />
                          </button>
                        )}
                        {label.text !== COLLECTION.OTHERS &&
                          (editedLabelIndex === index &&
                          beforeEdit !== editedLabel ? (
                            <button
                              type="button"
                              className="mr-2 text-gray-500 hover:bg-my-hover hover:dark:bg-my-hover-dark justify-center items-center h-6 w-6 rounded-full"
                              onClick={editLabel}
                            >
                              <img
                                className="w-4 h-4 justify-center"
                                src={ICONS.Tick}
                                alt="Done"
                              />
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="text-gray-500 items-center justify-center hover:bg-my-hover hover:dark:bg-my-hover-dark h-6 w-6 rounded-full mr-2"
                              title="Rename Label"
                              onClick={() => handleFocus(index)}
                            >
                              <img
                                className="h-4 w-4 justify-center items-center"
                                src={ICONS.Edit}
                                alt="Edit"
                              />
                            </button>
                          ))}
                      </li>
                    ))}
                  </ul>
                  {existingErr && (
                    <span className="text-red-500 font-medium text-xs">
                      {LABEL_LAYOUT.EXISTS}
                    </span>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="new-label"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-my-icon-dark"
                  >
                    {LABEL_LAYOUT.NEW}
                  </label>
                  <input
                    type="text"
                    autoFocus={true}
                    name="new-label"
                    id="new-label"
                    maxLength={20}
                    className="bg-my-background dark:bg-my-hover-dark border border-gray-300 dark:border-my-icon-dark text-gray-900 dark:text-white text-sm rounded-lg focus:ring-my-blue-500D focus:border-my-blue-500D block w-full p-2.5 focus-visible:outline-none"
                    placeholder={LABEL_LAYOUT.ENTER_NEW}
                    value={newLabel}
                    onChange={(e) => setNewLabel(e.target.value)}
                    required
                  />
                  {emptyLabel && newLabel === '' && (
                    <span className="text-red-500 font-medium text-xs">
                      {LABEL_LAYOUT.EMPTY_ERROR}
                    </span>
                  )}
                  {existingLabel && (
                    <span className="text-red-500 font-medium text-xs">
                      {LABEL_LAYOUT.EXISTS}
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  className="w-full text-white bg-my-blue-500D hover:bg-my-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  onClick={addLabel}
                >
                  {LABEL_LAYOUT.ADD_LABEL}
                </button>
              </div>
            </div>
          </div>
        </Modal>

        <CustomModal
          showModal={deleteModal}
          closeModal={() => setDeleteModal(false)}
          title={CHANGE_PASSWORD.DELETE_MODAL}
          text={CHANGE_PASSWORD.ARE_YOU_SURE}
          button={CHANGE_PASSWORD.DELETE}
          handleModal={() =>
            deleteWrapper(uid, labels, deleteLabel as CollectionItem, setLabels)
          }
        />
      </div>
    );
  }
);

export default LabelsList;
