import { forwardRef, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuthentication from '../../../../Hooks/userHook';
import ChangePasswordModal from '../../../../Views/ChangePassword/ChangePwd';
import { useReduxDispatch, useReduxSelector } from '../../../../Store';
import { toggleMode } from '../../../../Store/Theme';
import { CONSTANTS, DROPDOWN } from '../../../../Shared/Constants';

type DropdownMenuProps = {
  closeMenu: () => void;
};

const DropdownMenu = forwardRef<HTMLDivElement, DropdownMenuProps>(
  ({ closeMenu }, dropdownRef) => {
    const { signOutCall } = useAuthentication();
    const dispatch = useReduxDispatch();
    const isDarkMode = useReduxSelector((state) => state.ui.isDarkMode);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const handleLogout = async () => {
      await signOutCall();
      closeMenu();
    };

    const handleLogoutModal = () => {
      setModalOpen(true);
      setModalVisible(false);
    };

    const changePassword = () => {
      setModalVisible(true);
    };

    const toggleModeHandler = () => {
      dispatch(toggleMode());
    };

    const closeModal = () => {
      setModalOpen(false);
    };

    const confirmLogout = () => {
      handleLogout();
      setModalOpen(false);
    };

    return (
      <div
        ref={dropdownRef}
        className="absolute top-8 right-1 mt-2 w-40 bg-white dark:bg-my-hover-dark rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5"
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
          className="block px-4 py-2 text-sm text-gray-700 hover:dark:bg-my-bg-dark dark:text-white hover:bg-gray-100 w-full text-left border-t border-t-gray-100 dark:border-t-my-hover-dark"
          onClick={handleLogoutModal}
        >
          {DROPDOWN.LOGOUT}
        </button>

        {modalVisible && (
          <ChangePasswordModal onClose={() => setModalVisible(false)} />
        )}

        {modalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
            <div className="bg-white dark:bg-my-bg-dark rounded-lg shadow-lg max-w-md w-full p-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-white">
                {DROPDOWN.CONFIRM}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {DROPDOWN.ARE_YOU_SURE}
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-400 dark:hover:bg-gray-500"
                  onClick={closeModal}
                >
                  {CONSTANTS.CANCEL}
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  onClick={confirmLogout}
                >
                  {DROPDOWN.LOGOUT}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
);

export default DropdownMenu;
