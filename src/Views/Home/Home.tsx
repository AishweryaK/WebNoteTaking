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
    <>
      <Navbar
        toggleSidebar={toggleSidebar}
        setSearchData={handleDataFromChild}
        searchData={searchText}
      />

      <div className="flex flex-row relative">
        {/* <div className='absolute z-50'>  */}
        <LabelsList openSidebar={openSidebar} isSidebarOpen={isSidebarOpen} />
        {/* </div>
        <div className='absolute p-4 left-[100px]'> */}
        <Outlet context={{ searchText } satisfies ContextType} />
        {/* </div> */}

      </div>
    </>
  );
}

