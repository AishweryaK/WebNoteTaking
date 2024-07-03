import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { AppLayoutProps } from '../AppLayout.d';
import Navbar from '../Public/Navbar';
import { ICONS } from '../../../Shared/icons';
import LabelsList from './LabelLayout';
import { auth } from '../../../utils';
import Notes from '../../../Views/Notes/Notes';
// import Sidebar from '../Public/Navbar/Sidebar';

function PrivateLayout({ children }: AppLayoutProps): JSX.Element {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [buttonClick, setButtonClick] = useState('');
  const [label, setlabel] = useState('');

  const handleDataFromChild = (childData: string) => {
    setlabel(childData);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const selectedLabel = () => {};

  const handleClick = () => {
    setIsSidebarOpen(true);
    // setButtonClick("hello");
    console.log('hello');
  };

  return (
    <>
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="flex flex-row">
        {/* <div
          className={`${
            isSidebarOpen ? 'w-72' : 'w-20'
          } h-screen ease-in-out duration-200 mt-2`}
        >
          <button
            onClick={handleClick}
            className="bg-my-blue-500D space-x-4 pl-4 w-full h-14 flex flex-row hover:bg-my-hover rounded-e-full items-center hover:text-white"
          >
            <img className="w-10 p-2" src={ICONS.Lightbulb} alt="" />
            {isSidebarOpen && <div className="text-white">Notes</div>}
          </button>
          <button
            onClick={handleClick}
            className="space-x-4 pl-4 w-full h-14 flex flex-row hover:bg-my-hover rounded-e-full items-center hover:text-white"
          >
            <img className="w-10 p-2" src={ICONS.Reminder} alt="" />
            {isSidebarOpen && <div className="text-gray-900">Reminders</div>}
          </button>
          <LabelsList isSidebarOpen={isSidebarOpen} labelData={handleDataFromChild} />
        </div> */}
        <LabelsList
          isSidebarOpen={isSidebarOpen}
          labelData={handleDataFromChild}
        />

        {/* {children} */}
        <Notes label={label} />
      </div>
    </>
  );
}

export default PrivateLayout;
