import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    // bg-[url('../../../../assets/Images/books.png')]
    <div className="background-color">
      {/* <p className="w-2/5 lg:text-3xl font-bold underline text-red-500 w-2/4">Layout</p> */}
      <p className="w-1/5 lg:text-3xl font-bold underline text-red-500 layout">Layout</p>
      {/* <div className='layout'></div> */}
      <Outlet />
    </div>
  );
}

export default Layout;
