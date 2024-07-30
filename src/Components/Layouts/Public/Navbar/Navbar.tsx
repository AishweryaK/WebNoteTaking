import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import DropdownMenu from './Dropdown';
import CustomModal from '../../../Modal/CustomModal';
import { useReduxSelector } from '../../../../Store';
import useAuthentication from '../../../../Hooks/userHook';
import { ICONS } from '../../../../Shared/icons';
import { COLLECTION, CONSTANTS, DROPDOWN, NAVBAR } from '../../../../Shared/Constants';
import useDebounce from '../../../../Hooks/debounceHook';

interface NavbarProps {
  toggleSidebar: () => void;
}

export function Navbar({
  toggleSidebar,
}: NavbarProps) {
  const { photoURL } = useReduxSelector((state) => state.user);
  const { signOutCall } = useAuthentication();
  const [searchParams, setSearchParams] = useSearchParams({});
  const [searchData, setSearchData] = useState<string>('');
  const [placeHolder, setPlaceHolder] = useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [logoutModal, setLogoutModal] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { label } = useParams();
  const debouncedData = useDebounce(searchData,500);
  const navigate = useNavigate();
  const finalLabel = label || COLLECTION.OTHERS;

  useEffect(() => {
    setSearchParams({});
    setSearchData('');
  }, [finalLabel]);

  useEffect(() => {
    if(searchData){
      setSearchParams({searchText: debouncedData})
    }
    else{
      setSearchParams({})
    }
  }, [debouncedData])
  

  const handleSearchParams = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchData(e.target.value);
  };

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
    setSearchParams({});
  };

  const handleLogout = async () => {
    await signOutCall();
    setDropdownOpen(false);
    setLogoutModal(false);
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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 640) {
        setPlaceHolder(true);
      } else setPlaceHolder(false);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // const searchText = searchParams.get('searchText') || '';
  
  return (
    <nav className="sticky top-0 bg-white dark:bg-my-bg-dark shadow-lg px-4 py-1 h-16 flex justify-between items-center z-30">
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-0 md:space-x-4">
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
              className="h-14 w-14 min-w-12 object-contain cursor-pointer"
              onClick={() => navigate(0)}
            />
            <span className="hidden md:block font-semibold text-gray-700 dark:text-white">
              {finalLabel}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center bg-my-background dark:bg-my-bg-dark dark:border-my-icon-dark dark:border px-2 py-1 rounded-lg shadow-inner min-w-32 md:min-w-96 ml-4">
        <button
          className="hover:bg-my-hover hover:dark:bg-my-hover-dark p-2 mr-2 rounded-full"
          type="button"
          onClick={() => inputRef.current?.focus()}
        >
          <img src={ICONS.Search} alt="Search" />
        </button>
        <input
          ref={inputRef}
          value={searchData}
          type="text"
          title={finalLabel}
          autoComplete="off"
          placeholder={placeHolder ? `"${finalLabel}"` : `${NAVBAR.SEARCH} "${finalLabel}"` }
          onChange={handleSearchParams}
          className="bg-transparent border-none outline-none w-full text-gray-700 dark:text-white placeholder-gray-500"
        />
        {/* {searchText && ( */}
          <button
            className={`hover:bg-my-hover hover:dark:bg-my-hover-dark p-2 rounded-full ${!searchData && 'hidden'}`}
            type="button"
            onClick={handleClear}
          >
            <img src={ICONS.Close} alt="Close" />
          </button>
        {/* )} */}
      </div>

      <div className="flex items-center space-x-8 relative">
        <img
          className="w-8 h-8 min-w-8 rounded-full shadow-md ml-4 mr-2 cursor-pointer animate-spin-180 object-cover"
          src={photoURL ? photoURL : ICONS.UserImage}
          alt={NAVBAR.ACCOUNT}
          onClick={() => setDropdownOpen((dropdownOpen) => !dropdownOpen)}
        />
      </div>
      {dropdownOpen && (
        <DropdownMenu
          ref={dropdownRef}
          closeMenu={() => setDropdownOpen(false)}
          setLogoutModal={setLogoutModal}
        />
      )}

      {logoutModal && (
        <CustomModal
          showModal={logoutModal}
          closeModal={() => setLogoutModal(false)}
          title={DROPDOWN.LOGOUT}
          text={DROPDOWN.ARE_YOU_SURE}
          button={DROPDOWN.LOGOUT}
          handleModal={handleLogout}
        />
      )}
    </nav>
  );
}

export default Navbar;
