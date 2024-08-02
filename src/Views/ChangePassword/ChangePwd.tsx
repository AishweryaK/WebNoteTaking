import { useState } from 'react';
import { Formik, FormikProps, Form, Field, ErrorMessage } from 'formik';
import {
  EmailAuthProvider,
  User,
  reauthenticateWithCredential,
  updatePassword,
} from 'firebase/auth';
import FormError from '../../Components/Field/FormError';
import FormField from '../../Components/Field/FormField';
import CustomButton from '../../Components/Button';
import { useReduxDispatch } from '../../Store';
import { setLoading } from '../../Store/Loader';
import { auth } from '../../utils';
import { showAlert } from '../../Shared/alert';
import {
  CHANGE_PASSWORD,
  CONSTANTS,
  ERR_MSG,
  ERR_TITLE,
  SIGN_UP,
} from '../../Shared/Constants';
import { ChangePSchema } from '../../Shared/validationSchema';
import { ICONS } from '../../Shared/icons';

interface FormValues {
  currentPassword: string;
  password: string;
  confirmPassword: string;
}

export interface PasswordProps {
  onClose: () => void;
}

function ChangePasswordModal({ onClose }: PasswordProps) {
  const dispatch = useReduxDispatch();
  const [icon, setIcon] = useState<string>(ICONS.EyeOff);
  const [type, setType] = useState<string>(CONSTANTS.PASSWORD);

  const reauthenticate = async (currentPassword: string) => {
    const user = auth.currentUser;
    let credential;
    if(user && user.email)
   { credential = EmailAuthProvider.credential(
      user?.email ,
      currentPassword
    );}
    try {
      if(user && credential)
      await reauthenticateWithCredential(user, credential);
    } catch (error) {
      throw new Error(ERR_MSG.PASSWORD_INCORRECT);
    }
  };

  const handleChangePassword = async (values: FormValues) => {
    if (values.currentPassword === values.password) {
      showAlert(ERR_TITLE.ERROR, ERR_MSG.PASSWORD_SAME);
      return;
    }

    dispatch(setLoading(true));
    try {
      await reauthenticate(values.currentPassword);
      const user = auth.currentUser;
      await updatePassword(user as User, values.password);
      showAlert(ERR_TITLE.SUCCESS, ERR_MSG.CHANGED_PASSWORD);
      onClose();
    } catch (e: any) {
      showAlert(ERR_TITLE.ERROR, e.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const handleToggle = () => {
    if (type === CONSTANTS.PASSWORD) {
      setIcon(ICONS.EyeOn);
      setType(CONSTANTS.TEXT);
    } else {
      setIcon(ICONS.EyeOff);
      setType(CONSTANTS.PASSWORD);
    }
  };

  return (
    <Formik
      initialValues={{ currentPassword: '', password: '', confirmPassword: '' }}
      validationSchema={ChangePSchema}
      onSubmit={handleChangePassword}
    >
      {({ errors, touched, isValid }: FormikProps<FormValues>) => (
        <Form>
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
            <div className="bg-white dark:bg-my-bg-dark rounded-lg p-6 w-11/12 md:w-2/5 2xl:w-1/5">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-my-background mb-4">
                {CHANGE_PASSWORD.CHANGE}
              </h2>
              <div className="relative">
                <label
                  className="block text-gray-700 dark:text-my-icon-dark text-sm font-bold mt-4 mb-2 text-left"
                  htmlFor={CONSTANTS.CURRENT_PASSWORD}
                >
                  {CHANGE_PASSWORD.CURRENT}
                </label>
                <Field
                  name={CONSTANTS.CURRENT_PASSWORD}
                  type={type}
                  placeholder={CHANGE_PASSWORD.CURRENT}
                  autoComplete='current-password'
                  className="bg-my-background dark:bg-my-icon-dark shadow appearance-none border dark:border-my-icon-dark rounded-md w-full py-2 pl-3 pr-9 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
                />
                <div
                  className="absolute inset-y-0 right-0 flex items-end mb-2 pr-3 cursor-pointer"
                  onClick={handleToggle}
                >
                  <img src={icon} alt={CONSTANTS.PASSWORD} className="w-5" />
                </div>
              </div>
              <ErrorMessage name={CONSTANTS.CURRENT_PASSWORD} component="p" className="text-red-500 font-semibold text-xs mb-4 mt-2 text-left" />

              <FormField
                label={SIGN_UP.SETPASSWORD}
                name={CONSTANTS.PASSWORD}
                placeholder={SIGN_UP.SETPASSWORD}
                inputType={CONSTANTS.PASSWORD}
                autoComplete="new-password"
              />
              <FormError error={errors.password} touched={touched.password} />

              <FormField
                label={SIGN_UP.CONFIRMPASSWORD}
                name={CONSTANTS.CONFIRM_PASSWORD}
                placeholder={SIGN_UP.CONFIRMPASSWORD}
                inputType={CONSTANTS.PASSWORD}
                autoComplete="new-password"
              />
              <FormError
                error={errors.confirmPassword}
                touched={touched.confirmPassword}
              />

              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  className="bg-red-500 text-white px-4 mb-4 rounded-md font-semibold"
                  onClick={handleCancel}
                >
                  {CHANGE_PASSWORD.CANCEL}
                </button>
                <div className="mb-4">
                  <CustomButton
                    text={CHANGE_PASSWORD.CHANGE}
                    disabled={!isValid}
                  />
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
