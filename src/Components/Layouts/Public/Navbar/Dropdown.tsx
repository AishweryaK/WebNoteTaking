import { forwardRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ChangePasswordModal from '../../../../Views/ChangePassword/ChangePwd';
import { useReduxDispatch, useReduxSelector } from '../../../../Store';
import { toggleMode } from '../../../../Store/Theme';
import { DROPDOWN } from '../../../../Shared/Constants';

type DropdownMenuProps = {
  closeMenu: () => void;
  setLogoutModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const DropdownMenu = forwardRef<HTMLDivElement, DropdownMenuProps>(
  ({ closeMenu, setLogoutModal }, dropdownRef) => {
    const dispatch = useReduxDispatch();
    const isDarkMode = useReduxSelector((state) => state.ui.isDarkMode);
    const [pwdModal, setPwdModal] = useState(false);

    const handleLogoutModal = () => {
      setLogoutModal(true);
      closeMenu();
    };

    const changePassword = () => {
      setPwdModal(true);
    };

    const toggleModeHandler = () => {
      dispatch(toggleMode());
    };

    return (
      <div
        ref={dropdownRef}
        className="absolute top-12 right-2 mt-2 w-40 bg-white dark:bg-my-hover-dark rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5"
      >
        <Link
          to="/account"
          className="block px-4 py-2 text-sm hover:dark:bg-my-bg-dark text-gray-700 dark:text-white hover:bg-gray-100"
        >
          {DROPDOWN.ACCOUNT}
        </Link>
        <button
          type="button"
          onClick={changePassword}
          className="block px-4 py-2 text-sm w-full text-left hover:dark:bg-my-bg-dark text-gray-700 dark:text-white hover:bg-gray-100"
        >
          {DROPDOWN.PASSWORD}
        </button>
        <button
          type="button"
          onClick={toggleModeHandler}
          className="block px-4 py-2 text-sm w-full text-left hover:dark:bg-my-bg-dark text-gray-700 dark:text-white hover:bg-gray-100"
        >
          {isDarkMode ? DROPDOWN.DISABLE_THEME : DROPDOWN.ENABLE_THEME}
        </button>
        <button
          type="button"
          className="font-bold block px-4 py-2 text-sm text-gray-700 hover:dark:bg-my-bg-dark dark:text-white hover:bg-gray-100 w-full text-left border-t border-t-gray-100 dark:border-t-my-hover-dark"
          onClick={handleLogoutModal}
        >
          {DROPDOWN.LOGOUT}
        </button>

        {pwdModal && <ChangePasswordModal onClose={() => setPwdModal(false)} />}
      </div>
    );
  }
);

export default DropdownMenu;
