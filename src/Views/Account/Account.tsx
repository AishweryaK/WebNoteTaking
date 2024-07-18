import { useState } from 'react';
import { useReduxSelector } from '../../Store';
import { useNavigate } from 'react-router-dom';
import NameChange from './NameChange';
import { ICONS } from '../../Shared/icons';
import { ACCOUNT } from '../../Shared/Constants';

function Account() {
  const { displayName, email } = useReduxSelector((state) => state.user);
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();

  const changeName = () => {
    setModalVisible(true);
  };

  return (
    <div className="flex min-h-screen items-center md:p-8 justify-center text-center">
      <div className="flex bg-white dark:bg-my-hover-dark shadow-lg rounded-2xl md:w-3/4 md:max-w-2xl overflow-hidden">
        <div className="hidden md:block md:w-1/3 lg:w-1/2">
          <img
            src={ICONS.CoverPhoto}
            alt="Logo"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="w-full md:w-2/3 lg:w-1/2 p-8">
          <img
            src={ICONS.Back}
            alt="Go back"
            title="Go back"
            className="hover:bg-my-hover hover:dark:bg-my-bg-dark rounded-full h-8 w-8 p-1"
            onClick={() => navigate(-1)}
          />
          <div className="flex flex-col justify-center">
            <div className="mb-6 flex justify-center">
              <div className="h-36 w-36 rounded-full shadow-sm bg-gradient-to-b from-my-background to-my-background-200 flex items-center justify-center">
                <img src={ICONS.Logo} alt="Logo" className="h-32 w-32" />
              </div>
            </div>
            <h5 className="text-2xl font-bold text-center text-gray-700 dark:text-white">
              {ACCOUNT.WELCOME}
            </h5>
            <p className="text-left text-gray-600 dark:text-my-hover mt-8 pl-4">
              {ACCOUNT.USER_NAME}
            </p>
            <div className="flex flex-row justify-between">
              <p className="text-left text-gray-600 dark:text-white mb-2 mt-2.5 font-bold mx-4 focus-visible:outline-none">
                {displayName}
              </p>
              <img
                src={ICONS.Edit}
                alt=""
                className="hover:bg-my-hover hover:dark:bg-my-bg-dark rounded-full h-8 w-8 p-1"
                onClick={changeName}
              />
            </div>

            <p className="text-left text-gray-600 dark:text-my-hover mt-4 pl-4">
              {ACCOUNT.EMAIL}
            </p>
            <p className="text-left text-gray-600 dark:text-white mb-8 mt-2.5 font-bold mx-4 focus-visible:outline-none">
              {email}
            </p>
          </div>
        </div>
      </div>
      {modalVisible && <NameChange onClose={() => setModalVisible(false)} />}
    </div>
  );
}

export default Account;
