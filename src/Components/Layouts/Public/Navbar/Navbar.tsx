import './navbar.scss';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { ICONS } from '../../../../Shared/icons';
import useAuthentication from '../../../../Hooks/userHook';

export function Navbar({ toggleSidebar }: { toggleSidebar: () => void }) {
  const { signOutCall } = useAuthentication();
  const [searchText, setSearchText] = useState<string>('');
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSearchText = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchText(e.target.value);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownOpen(false);
    }
  };

  const handleLogout = async () => {
    await signOutCall();
  };

  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  function DropdownMenu() {
    return (
      <div
        ref={dropdownRef}
        className="absolute top-9 right-9 mt-2 w-32 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5"
      >
        <a
          href="#"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Profile
        </a>
        <a
          href="#"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Settings
        </a>
        <button
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <>
      <nav className="sticky top-0 bg-white shadow-lg px-4 py-1 flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-4">
            <img
              className="cursor-pointer w-10 hover:bg-my-hover p-2 rounded-full"
              src={ICONS.Menu}
              alt="Menu"
              onClick={toggleSidebar}
            />
            <div className="flex items-center space-x-1">
              <img src={ICONS.Logo} alt="Logo" className="h-14 w-14" />
              <span className="font-semibold text-gray-700">Name</span>
            </div>
          </div>
        </div>

        <form className="flex items-center bg-my-background px-2 py-1 rounded-lg shadow-inner min-w-32 md:min-w-96">
          <button
            className="hover:bg-my-hover p-2 mr-2 rounded-full"
            type="button"
          >
            <img src={ICONS.Search} alt="Search" />
          </button>
          <input
            value={searchText}
            type="text"
            autoComplete="off"
            placeholder="Search"
            onChange={handleSearchText}
            className="bg-transparent border-none outline-none w-full text-gray-700 placeholder-gray-500"
          />
          {searchText && (
            <button
              className="hover:bg-my-hover p-2 rounded-full"
              type="button"
              onClick={() => setSearchText('')}
            >
              <img src={ICONS.Close} alt="Close" />
            </button>
          )}
        </form>

        <div className="flex items-center space-x-6 relative">
          <img
            className="cursor-pointer w-10 hover:bg-my-hover p-2 rounded-full"
            src={ICONS.Settings}
            alt="Settings"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          />
          {dropdownOpen && <DropdownMenu />}
          <img
            className="w-8 h-8 rounded-full"
            src={ICONS.Books}
            alt="Account"
          />
        </div>
      </nav>
    </>
  );
}

export default Navbar;
