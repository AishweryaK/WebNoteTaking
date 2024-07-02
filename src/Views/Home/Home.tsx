// import { useEffect } from "react";

import { Outlet } from "react-router-dom";



export default function Home() {
  // useEffect(()=>{
  //   localStorage.clear();
  // })

  return (
    <div className="flex flex-row">
    <div
    className={`w-72 h-screen bg-gray-500 ease-in-out duration-200`}
  >
        <div className="bg-orange-600 w-full h-14 flex flex-row hover:bg-my-blue-500D rounded-e-full">
          <div className="bg-slate-950">ffrfrf</div>
          <div>qwer</div>
        </div>
    <div className="bg-stone-700 w-full h-14">gtgtggtgt</div>
  </div>
  <Outlet />
  </div>
    );
}
