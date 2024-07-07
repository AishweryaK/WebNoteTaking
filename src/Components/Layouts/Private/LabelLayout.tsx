import React, { ChangeEvent, useEffect, useState } from 'react';
import { onSnapshot, setDoc } from 'firebase/firestore';
import { handleEdit, userDocRef } from '../../../Shared/firebaseUtils';
import { useReduxSelector } from '../../../Store';
import { ICONS } from '../../../Shared/icons';
import { COLLECTION } from '../../../Shared/Constants';

interface CollectionItem {
  text: string;
  number: number;
}

interface LabelsListProps {
  isSidebarOpen: boolean;
  labelData: (data: string) => void;
}

const LabelsList: React.FC<LabelsListProps> = ({
  isSidebarOpen,
  labelData,
}) => {
  const { uid } = useReduxSelector((state) => state.user);
  const [labels, setLabels] = useState<CollectionItem[]>([]);
  const [selectedLabel, setSelectedLabel] = useState<string>(COLLECTION.OTHERS);
  const [showModal, setShowModal] = useState(false);
  const [newLabel, setNewLabel] = useState<string>('');
  const [emptyLabel, setEmptyLabel] = useState<boolean>(false);
  const [editedLabel, setEditedLabel] = useState<string>('');
  const [editedLabelIndex, setEditedLabelIndex] = useState<number | null>(null);
  const [beforeEdit, setBeforeEdit] = useState('');
  const [existingErr, setExistingErr] = useState<boolean>(false);

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

  const handleClick = (data: string) => {
    setSelectedLabel(data);
    labelData(data);
  };

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

  const closeModal = () => {
    setNewLabel('');
    setShowModal(false);
    setEmptyLabel(false);
    setExistingErr(false);
    setEditedLabel('');
    setEditedLabelIndex(null);
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
      setShowModal(false);
      setNewLabel('');
      return;
    }
    const updatedLabels = [...labels, { text: trimmedNewLabel, number: 0 }];
    await setDoc(
      userDocRef(uid),
      {
        collections: updatedLabels,
      },
      { merge: true }
    );
    setLabels(updatedLabels);

    setNewLabel('');
    setShowModal(false);
  };

  return (
    <div>
      <div
        className={`${isSidebarOpen ? 'min-w-72' : 'min-w-20'} h-screen ease-in-out duration-200 mt-2`}
      >
        <div className="flex flex-col">
          {labels.map((label, index) => (
            <button
              onClick={() => handleClick(label.text)}
              key={index}
              className={`space-x-4 pl-4 min-w-full h-14 flex flex-row rounded-e-full items-center text-gray-900 ${
                selectedLabel === label.text
                  ? 'bg-my-blue-500D text-white font-semibold'
                  : 'hover:bg-my-hover'
              }`}
            >
              <img className="w-10 p-2" src={ICONS.Label} alt="" />
              {isSidebarOpen && <div>{label.text}</div>}
            </button>
          ))}
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="space-x-4 pl-4 w-full h-14 flex flex-row hover:bg-my-hover rounded-e-full items-center hover:text-white"
        >
          <img className="w-10 p-2" src={ICONS.Edit} alt="" />
          {isSidebarOpen && <div className="text-gray-900">Edit</div>}
        </button>
      </div>

      {showModal && (
        <div
          id="authentication-modal"
          tabIndex={-1}
          aria-hidden="true"
          className="fixed inset-0 z-50 flex justify-center items-center w-full h-full overflow-y-auto overflow-x-hidden bg-black bg-opacity-60"
        >
          <div className="relative p-4 w-full max-w-80 md:max-w-sm">
            <div className="relative bg-white rounded-lg shadow">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                <h3 className="text-xl font-semibold text-gray-900">
                  Edit Labels
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
                  onClick={closeModal}
                >
                  <img alt="" src={ICONS.Close} />
                </button>
              </div>
              <div className="p-4 md:px-5">
                <div className="space-y-2">
                  <div>
                    <ul className="space-y-2">
                      {labels.map((label, index) => (
                        <li
                          key={index}
                          className="flex items-center text-gray-900"
                        >
                          <img
                            className="w-6 h-6 mr-4"
                            src={ICONS.LabelFilled}
                            alt=""
                          />
                          <input
                            maxLength={20}
                            defaultValue={label.text}
                            onChange={(e) =>
                              editedWrapper(e, label.text, index)
                            }
                            className="flex-1 bg-white mr-5"
                          />
                          {editedLabelIndex === index &&
                          beforeEdit !== editedLabel ? (
                            <button
                              className="text-gray-500 hover:bg-my-hover h-6 w-6 pl-1 rounded-full"
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
                              className="text-gray-500 hover:bg-my-hover h-6 w-6 pl-1 rounded-full"
                              title="Rename Label"
                            >
                              <img
                                className="w-4 h-4 justify-center"
                                src={ICONS.Edit}
                                alt="Edit"
                              />
                            </button>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <label
                      htmlFor="new-label"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      New Label
                    </label>
                    <input
                      type="text"
                      name="new-label"
                      id="new-label"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      placeholder="Enter new label"
                      value={newLabel}
                      onChange={(e) => setNewLabel(e.target.value)}
                      required
                    />
                    {emptyLabel && newLabel === '' && (
                      <span className="text-red-500 text-xs">
                        * Please enter a label.
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    className="w-full text-white bg-my-blue-500D hover:bg-my-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    onClick={addLabel}
                  >
                    Add Label
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LabelsList;
