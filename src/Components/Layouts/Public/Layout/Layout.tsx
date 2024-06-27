import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div style={{ flex: 1 }} className="background-color">
      <p className="text-3xl font-bold underline text-red-500 layout">Layout</p>
      <Outlet />
    </div>
  );
}

export default Layout;
