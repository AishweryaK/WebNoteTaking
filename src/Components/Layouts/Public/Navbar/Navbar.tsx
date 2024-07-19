import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DropdownMenu from './Dropdown';
import { ICONS } from '../../../../Shared/icons';
import { COLLECTION, CONSTANTS, NAVBAR } from '../../../../Shared/Constants';
import { useReduxSelector } from '../../../../Store';

interface NavbarProps {
  toggleSidebar: () => void;
  setSearchData: (data: string) => void;
  searchData: string;
}

export function Navbar({
  toggleSidebar,
  setSearchData,
  searchData,
}: NavbarProps) {
  const { photoURL } = useReduxSelector((state) => state.user);
  const [searchText, setSearchText] = useState<string>('');
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { label } = useParams();
  const navigate = useNavigate();
  const finalLabel = label || COLLECTION.OTHERS;

  useEffect(() => {
    const getSearch = setTimeout(() => {
      setSearchData(searchText);
    }, 500);

    return () => clearTimeout(getSearch);
  }, [searchText]);

  useEffect(() => {
    // setSearchText("");
    setSearchData('');
  }, [finalLabel]);

  // console.log(photoURL,"photo")

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownOpen(false);
    }
  };

  const handleClear = () => {
    setSearchData('');
    setSearchText('');
  };

  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside, {
        passive: true,
      });
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <nav className="sticky top-0 bg-white dark:bg-my-bg-dark shadow-lg px-4 py-1 flex justify-between items-center z-50">
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-4">
          <img
            className="cursor-pointer w-10 hover:bg-my-hover hover:dark:bg-my-hover-dark p-2 rounded-full"
            src={ICONS.Menu}
            alt={NAVBAR.MENU}
            onClick={toggleSidebar}
          />
          <div className="flex items-center space-x-1">
            <img
              src={ICONS.Logo}
              alt={CONSTANTS.LOGO}
              className="h-14 w-14 min-w-10 cursor-pointer"
              onClick={() => navigate(0)}
            />
            <span className="hidden md:block font-semibold text-gray-700 dark:text-white">
              {finalLabel}
            </span>
          </div>
        </div>
      </div>

      <form className="flex items-center bg-my-background dark:bg-my-bg-dark dark:border-my-icon-dark dark:border px-2 py-1 rounded-lg shadow-inner min-w-32 md:min-w-96 ml-4">
        <button
          className="hover:bg-my-hover hover:dark:bg-my-hover-dark p-2 mr-2 rounded-full"
          type="button"
        >
          <img src={ICONS.Search} alt="Search" />
        </button>
        <input
          value={searchText}
          type="text"
          autoComplete="off"
          placeholder={`${NAVBAR.SEARCH} "${finalLabel}"`}
          onChange={(e) => setSearchText(e.target.value)}
          className="bg-transparent border-none outline-none w-full text-gray-700 dark:text-white placeholder-gray-500"
        />
        <button
          className={`hover:bg-my-hover hover:dark:bg-my-hover-dark p-2 rounded-full ${!searchData && 'hidden'}`}
          type="button"
          onClick={handleClear}
        >
          <img src={ICONS.Close} alt="Close" />
        </button>
      </form>

      <div className="flex items-center space-x-8 relative">
        <img
          className="w-8 h-8 rounded-full shadow-md ml-4 mr-2 cursor-pointer animate-spin-180"
          src={photoURL ? photoURL : ICONS.UserImage}
          alt={NAVBAR.ACCOUNT}
          onClick={() => setDropdownOpen((dropdownOpen) => !dropdownOpen)}
        />
        {dropdownOpen && (
          <DropdownMenu
            ref={dropdownRef}
            closeMenu={() => setDropdownOpen(false)}
          />
        )}
      </div>
    </nav>
  );
}

export default Navbar;
