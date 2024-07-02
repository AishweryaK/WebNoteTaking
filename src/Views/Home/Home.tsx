// import { useEffect } from "react";

import { Outlet } from 'react-router-dom';
import { ICONS } from '../../Shared/icons';

export default function Home() {
  // useEffect(()=>{
  //   localStorage.clear();
  // })

  return (
    //   <div className="flex flex-row">
    //  <div
    //   className={`w-72 h-screen ease-in-out duration-200 mt-2`}
    // >
    //       <div className="bg-my-blue-500D space-x-4 pl-4 w-full h-14 flex flex-row hover:bg-my-hover rounded-e-full items-center hover:text-white">
    //         <img className=" w-10 p-2" src={ICONS.Lightbulb} alt="" />
    //         <div className="text-white">Notes</div>
    //       </div>
    //       <div className="space-x-4 pl-4 w-full h-14 flex flex-row hover:bg-my-hover rounded-e-full items-center hover:text-white">
    //         <img className=" w-10 p-2" src={ICONS.Reminder} alt="" />
    //         <div className="text-gray-900 ">Reminders</div>
    //       </div>
    //       <div className="space-x-4 pl-4 w-full h-14 flex flex-row hover:bg-my-hover rounded-e-full items-center hover:text-white">
    //         <img className=" w-10 p-2" src={ICONS.Label} alt="" />
    //         <div className="text-gray-900 ">Label</div>
    //       </div>
    //   <div className="w-full h-14">gtgtggtgt</div>
    // </div>

    <Outlet />
    // </div>
  );
}
