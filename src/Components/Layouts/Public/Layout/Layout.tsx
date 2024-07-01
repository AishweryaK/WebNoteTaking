import { Outlet } from 'react-router-dom';
import { ICONS } from '../../../../Shared/icons';

function Layout() {
  return (
    <div className="flex p-8 items-center justify-center text-center">
      <div className="flex bg-white shadow-lg rounded-2xl w-3/4 max-w-4xl overflow-hidden">
        <div className="hidden md:block md:w-1/3 lg:w-1/2">
          <img
            src={ICONS.CoverPhoto}
            alt="Logo"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="w-full md:w-2/3 lg:w-1/2 p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
