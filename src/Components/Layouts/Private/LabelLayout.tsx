import React, { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { userDocRef } from '../../../Shared/firebaseUtils';
import { useReduxSelector } from '../../../Store';
import { ICONS } from '../../../Shared/icons';

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
  const [selectedLabel, setSelectedLabel] = useState('');

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

  //   const buttonClicked = () => {
  //     setSelectedLabel(label.)
  //   }

  //   console.log(labels, "LABELS")

  const handleClick = (data: string) => {
    labelData(data);
  };

  return (
    <div
      className={`${
        isSidebarOpen ? 'w-72' : 'w-20'
      } h-screen ease-in-out duration-200 mt-2`}
    >
      {/* <button
            onClick={()=>handleClick("Notes")}
            className="bg-my-blue-500D space-x-4 pl-4 w-full h-14 flex flex-row hover:bg-my-hover rounded-e-full items-center hover:text-white"
          >
            <img className="w-10 p-2" src={ICONS.Lightbulb} alt="" />
            {isSidebarOpen && <div className="text-white">Notes</div>}
          </button>
          <button
            onClick={()=>handleClick("Reminders")}
            className="space-x-4 pl-4 w-full h-14 flex flex-row hover:bg-my-hover rounded-e-full items-center hover:text-white"
          >
            <img className="w-10 p-2" src={ICONS.Reminder} alt="" />
            {isSidebarOpen && <div className="text-gray-900">Reminders</div>}
          </button> */}

      <div className="flex flex-col">
        {labels.map((label, index) => (
          <button
            onClick={() => handleClick(label.text)}
            key={index}
            className="space-x-4 pl-4 w-full h-14 flex flex-row hover:bg-my-hover rounded-e-full items-center hover:text-white"
          >
            <img className="w-10 p-2" src={ICONS.Label} alt="" />
            {isSidebarOpen && <div className="text-gray-900">{label.text}</div>}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LabelsList;
