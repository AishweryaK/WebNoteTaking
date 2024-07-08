import { useState } from 'react';
import { Formik, FormikProps, Form } from 'formik';
import {
  EmailAuthProvider,
  User,
  reauthenticateWithCredential,
  updatePassword,
} from 'firebase/auth';
import { showAlert } from '../../Shared/alert';
import {
  CHANGE_PASSWORD,
  CONSTANTS,
  ERR_MSG,
  ERR_TITLE,
  SIGN_UP,
} from '../../Shared/Constants';
import { ChangePSchema } from '../../Shared/validationSchema';
import FormField from '../../Components/Field/FormField';
import CustomButton from '../../Components/Button';
import { auth } from '../../utils';
import { ICONS } from '../../Shared/icons';

interface FormValues {
  password: string;
  confirmPassword: string;
}

export interface PasswordProps {
  onClose: () => void;
}

function ChangePasswordModal({ onClose }: PasswordProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [icon, setIcon] = useState(ICONS.EyeOff);
  const [type, setType] = useState(CONSTANTS.PASSWORD);
  //   const theme = useSelector(state => state.user.theme);
  //   const colors = getThemeColors(theme as Theme);

  const reauthenticate = async (currentPassword: string) => {
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(
      user?.email as string,
      currentPassword
    );
    try {
      await reauthenticateWithCredential(user as User, credential);
    } catch (error) {
      throw new Error(ERR_MSG.PASSWORD_INCORRECT);
    }
  };

  const handleChangePassword = async (values: FormValues) => {
    if (currentPassword === values.password) {
      showAlert(ERR_TITLE.ERROR, ERR_MSG.PASSWORD_SAME);
      //   resetForm();
      return;
    }
    if (!currentPassword || !values.password || !values.confirmPassword) {
      showAlert(ERR_TITLE.ERROR, ERR_MSG.FILL_ALL_FIELDS);
      return;
    }

    setIsLoading(true);
    try {
      await reauthenticate(currentPassword);
      const user = auth.currentUser;
      await updatePassword(user as User, values.password);
      showAlert(ERR_TITLE.SUCCESS, ERR_MSG.CHANGED_PASSWORD);
      //   resetForm();
      onClose();
    } catch (e: any) {
      showAlert(ERR_TITLE.ERROR, e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    onClose();
    setCurrentPassword('');
    // resetForm();
  };

  const handleToggle = () => {
    if (type === 'password') {
      setIcon(ICONS.EyeOn);
      setType(CONSTANTS.TEXT);
    } else {
      setIcon(ICONS.EyeOff);
      setType(CONSTANTS.PASSWORD);
    }
  };

  return (
    <Formik
      initialValues={{ password: '', confirmPassword: '' }}
      validationSchema={ChangePSchema}
      onSubmit={handleChangePassword}
    >
      {({ errors, touched, isValid }: FormikProps<FormValues>) => (
        <Form>
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-6 w-11/12 md:w-2/5 xl:w-1/5">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {CHANGE_PASSWORD.CHANGE}
              </h2>
              <div className="relative">
                {' '}
                <label
                  className="block text-gray-700 text-sm font-bold mt-4 mb-2 text-left"
                  htmlFor="currentPassword"
                >
                  Current Password
                </label>
                <input
                  name="password"
                  className="shadow appearance-none border rounded-md w-full py-2 pl-3 pr-9 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-my-background"
                  type={type}
                  placeholder={CHANGE_PASSWORD.CURRENT}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <div
                  className="absolute inset-y-0 right-0 flex items-end mb-2 pr-3"
                  onClick={handleToggle}
                >
                  <img src={icon} alt="password" className="w-5" />
                </div>
              </div>

              <FormField
                label="Password"
                name={CONSTANTS.PASSWORD}
                placeholder={SIGN_UP.SETPASSWORD}
                inputType={CONSTANTS.PASSWORD}
              />
              {errors.password && touched.password ? (
                <p className="text-red-700 text-xs mb-4 text-left">
                  {errors.password}
                </p>
              ) : null}

              <FormField
                label={SIGN_UP.CONFIRMPASSWORD}
                name={CONSTANTS.CONFIRM_PASSWORD}
                placeholder={SIGN_UP.CONFIRMPASSWORD}
                inputType={CONSTANTS.PASSWORD}
              />
              {errors.confirmPassword && touched.confirmPassword ? (
                <p className="text-red-700 text-xs mb-4 mt-1 text-left">
                  {errors.confirmPassword}
                </p>
              ) : null}

              <div className="flex justify-between mt-8">
                <button
                  className="bg-red-500 text-white px-4 mb-4 rounded-full font-semibold"
                  onClick={() => handleCancel()}
                >
                  {CHANGE_PASSWORD.CANCEL}
                </button>
                <div className="mb-4">
                  <CustomButton text="Change Password" disabled={!isValid} />
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default ChangePasswordModal;
