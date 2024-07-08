import { Link } from 'react-router-dom';
import { forwardRef, useState } from 'react';
import useAuthentication from '../../../../Hooks/userHook';
import ChangePasswordModal from '../../../../Views/ChangePwd/ChangePwd';
import { useReduxDispatch, useReduxSelector } from '../../../../Store';
import { toggleMode } from '../../../../Store/Theme';

type DropdownMenuProps = {
  closeMenu: () => void;
};

const DropdownMenu = forwardRef<HTMLDivElement, DropdownMenuProps>(
  ({ closeMenu }, dropdownRef) => {
    const { signOutCall } = useAuthentication();
    const dispatch = useReduxDispatch();
    const isDarkMode = useReduxSelector((state) => state.ui.isDarkMode);
    const [modalVisible, setModalVisible] = useState(false);

    const handleLogout = async () => {
      await signOutCall();
      closeMenu();
    };

    const changePassword = () => {
      setModalVisible(true);
    };

    const toggleModeHandler = () => {
      dispatch(toggleMode());
    };

    return (
      <div
        ref={dropdownRef}
        className="absolute top-8 right-1 mt-2 w-40 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5"
      >
        <Link
          to="/account"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Account
        </Link>
        <button
          type="button"
          onClick={changePassword}
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Change Password
        </button>
        <button
          type="button"
          onClick={toggleModeHandler}
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          {isDarkMode ? 'Disable Dark Theme' : 'Enable Dark Theme'}
        </button>
        <button
          type="button"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left border-t border-t-gray-100"
          onClick={handleLogout}
        >
          Logout
        </button>

        {modalVisible && (
          <ChangePasswordModal onClose={() => setModalVisible(false)} />
        )}
      </div>
    );
  }
);

export default DropdownMenu;
