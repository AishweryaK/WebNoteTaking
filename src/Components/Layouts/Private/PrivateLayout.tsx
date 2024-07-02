import { useState } from 'react';
import { AppLayoutProps } from '../AppLayout.d';
import Navbar from '../Public/Navbar';
import { ICONS } from '../../../Shared/icons';
// import Sidebar from '../Public/Navbar/Sidebar';

function PrivateLayout({ children }: AppLayoutProps): JSX.Element {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
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
          <div className="bg-my-blue-500D space-x-4 pl-4 w-full h-14 flex flex-row hover:bg-my-hover rounded-e-full items-center hover:text-white">
            <img className=" w-10 p-2" src={ICONS.Lightbulb} alt="" />
            <div className="text-white">Notes</div>
          </div>
          <div className="space-x-4 pl-4 w-full h-14 flex flex-row hover:bg-my-hover rounded-e-full items-center hover:text-white">
            <img className=" w-10 p-2" src={ICONS.Reminder} alt="" />
            <div className="text-gray-900 ">Reminders</div>
          </div>
          <div className="space-x-4 pl-4 w-full h-14 flex flex-row hover:bg-my-hover rounded-e-full items-center hover:text-white">
            <img className=" w-10 p-2" src={ICONS.Label} alt="" />
            <div className="text-gray-900 ">Label</div>
          </div>
        </div> */}
        <div
          className={`${
            isSidebarOpen ? 'w-72' : 'w-20'
          } h-screen ease-in-out duration-200 mt-2`}
        >
          <div className="bg-my-blue-500D space-x-4 pl-4 w-full h-14 flex flex-row hover:bg-my-hover rounded-e-full items-center hover:text-white">
            <img className="w-10 p-2" src={ICONS.Lightbulb} alt="" />
            {isSidebarOpen && <div className="text-white">Notes</div>}
          </div>
          <div className="space-x-4 pl-4 w-full h-14 flex flex-row hover:bg-my-hover rounded-e-full items-center hover:text-white">
            <img className="w-10 p-2" src={ICONS.Reminder} alt="" />
            {isSidebarOpen && <div className="text-gray-900">Reminders</div>}
          </div>
          <div className="space-x-4 pl-4 w-full h-14 flex flex-row hover:bg-my-hover rounded-e-full items-center hover:text-white">
            <img className="w-10 p-2" src={ICONS.Label} alt="" />
            {isSidebarOpen && <div className="text-gray-900">Label</div>}
          </div>
        </div>

        {children}
      </div>
    </>
  );
}

export default PrivateLayout;
