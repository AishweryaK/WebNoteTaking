import { useState } from 'react';
import Navbar from '../../Components/Layouts/Public/Navbar';
import LabelsList from '../../Components/Layouts/Private/LabelLayout';
import Notes from '../Notes/Notes';

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [label, setlabel] = useState('');

  const handleDataFromChild = (childData: string) => {
    setlabel(childData);
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
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="flex flex-row">
        <LabelsList
          openSidebar={openSidebar}
          isSidebarOpen={isSidebarOpen}
          labelData={handleDataFromChild}
        />

        <Notes label={label} />
      </div>
    </>
  );
}
