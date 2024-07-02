import { useState } from 'react';
import { AppLayoutProps } from '../AppLayout.d';
import Navbar from '../Public/Navbar';
// import Sidebar from '../Public/Navbar/Sidebar';

function PrivateLayout({ children }: AppLayoutProps): JSX.Element {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Navbar />
      {/* <Sidebar /> */}
      {children}
      {/* <Footer /> */}
    </>
  );
}

export default PrivateLayout;
