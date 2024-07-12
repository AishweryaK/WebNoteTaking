import { Outlet } from 'react-router-dom';
import { ICONS } from '../../../../Shared/icons';

function Layout() {
  return (
    <div className="flex min-h-screen items-center md:p-8 justify-center text-center">
      <div className="flex bg-white dark:bg-my-hover-dark shadow-lg rounded-2xl md:w-3/4 md:max-w-4xl overflow-hidden">
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
