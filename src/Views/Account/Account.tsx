import { useReduxSelector } from '../../Store';
import { ICONS } from '../../Shared/icons';

function Account() {
  const { displayName, email } = useReduxSelector((state) => state.user);
  return (
    <div className="flex min-h-screen items-center md:p-8 justify-center text-center">
      <div className="flex bg-white shadow-lg rounded-2xl md:w-3/4 md:max-w-4xl overflow-hidden">
        <div className="hidden md:block md:w-1/3 lg:w-1/2">
          <img
            src={ICONS.CoverPhoto}
            alt="Logo"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="w-full md:w-2/3 lg:w-1/2 p-8">
          <div className="flex flex-col justify-center">
            <div className="mb-6 flex justify-center">
              <div className="h-28 w-28 rounded-full shadow-sm bg-gradient-to-b from-my-background to-my-background-200 flex items-center justify-center">
                <img src={ICONS.Logo} alt="Logo" className="h-24 w-24" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center text-gray-700 mb-2">
              Welcome to your Profile!
            </h2>
            <p className="text-left text-gray-600 mt-12 pl-4">User Name</p>
            <p className="text-left text-gray-600 mt-4 mb-2 font-bold pl-5">
              {displayName}
            </p>

            <p className="text-left text-gray-600 mt-4 pl-4">Email</p>
            <p className="text-left text-gray-600 mt-4 mb-2 font-bold pl-5">
              {email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
