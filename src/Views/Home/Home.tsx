import { useState } from 'react';
import Navbar from '../../Components/Layouts/Public/Navbar';
import LabelsList from '../../Components/Layouts/Private/LabelLayout';
import { Outlet } from 'react-router-dom';

export type ContextType = { searchText: string | null };

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchText, setSearchText] = useState('');

  const handleDataFromChild = (childData: string) => {
    setSearchText(childData);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const openSidebar = (value: boolean) => {
    setIsSidebarOpen(value);
  };

  // useEffect(()=>{
  //   localStorage.clear();
  // })

  return (
    // <div className="flex flex-col min-h-screen">
    <>
      <Navbar
        toggleSidebar={toggleSidebar}
        setSearchData={handleDataFromChild}
        searchData={searchText}
      />

      {/* <div className="flex flex-row flex-grow bg-red-950 pt-2"> */}
      <div className="flex flex-row">
        <LabelsList
          openSidebar={openSidebar}
          isSidebarOpen={isSidebarOpen}
          // labelData={handleDataFromChild}
        />

        <Outlet context={{ searchText } satisfies ContextType} />
      </div>
      </>
    // </div>
  );
}
