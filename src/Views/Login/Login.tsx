import { Form, Formik, FormikProps } from 'formik';
import { Link } from 'react-router-dom';
import FormField from '../../Components/Field/FormField';
import FormError from '../../Components/Field/FormError';
import CustomButton from '../../Components/Button';
import useAuthentication from '../../Hooks/userHook';
import { LoginSchema } from '../../Shared/validationSchema';
import { ICONS } from '../../Shared/icons';
import {
  CONSTANTS,
  LOGIN,
  ROUTES_CONFIG,
  SIGN_UP,
  TITLE,
} from '../../Shared/Constants';
import { FormValues } from './log-in';

export default function Login() {
  const { googleSignInCall, signInCall } = useAuthentication();

  const handleLogin = async (values: FormValues) => {
    await signInCall({ email: values.email, password: values.password });
  };

  const logGoogleUser = () => {
    googleSignInCall();
  };

  return (
    <div className="flex flex-col justify-center">
      <div className="mb-6 flex justify-center">
        <div className="h-16 w-16 rounded-full shadow-sm bg-gradient-to-b from-my-background to-my-background-200 flex items-center justify-center">
          <img src={ICONS.Logo} alt={CONSTANTS.LOGO} className="h-12 w-12" />
        </div>
      </div>
      <h2 className="text-2xl font-bold text-center text-gray-700 dark:text-my-background mb-2">
        {LOGIN.NOTE_APP}
      </h2>
      <p className="text-center text-gray-600 dark:text-my-background mb-2">
        {LOGIN.WELCOME}
      </p>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={LoginSchema}
        onSubmit={(values) => handleLogin(values)}
      >
        {({ errors, touched, isValid }: FormikProps<FormValues>) => (
          <Form>
            <FormField
              label={SIGN_UP.EMAIL}
              name={CONSTANTS.EMAIL}
              placeholder={SIGN_UP.EMAIL}
              inputType={CONSTANTS.EMAIL}
            />
            <FormError error={errors.email} touched={touched.email} />

            <FormField
              label={SIGN_UP.SETPASSWORD}
              name={CONSTANTS.PASSWORD}
              placeholder={SIGN_UP.SETPASSWORD}
              inputType={CONSTANTS.PASSWORD}
            />
            <FormError error={errors.password} touched={touched.password} />

            <div className="mb-6 flex items-center justify-between">
              <div />
              <Link
                to={ROUTES_CONFIG.FORGOT_PASSWORD.path}
                className="mt-4 text-sm text-my-blue-500D hover:text-my-blue-800 hover:dark:text-my-blue-200 font-medium hover:underline cursor-pointer"
              >
                {LOGIN.FORGOT_PWD}
              </Link>
            </div>

            <div className="mb-4">
              <CustomButton text={TITLE.SIGNIN} disabled={!isValid} />
            </div>
            <div className="mb-4">
              <button
                className="w-full bg-my-background dark:bg-my-icon-dark hover:bg-my-background-100 hover:dark:bg-my-bg-dark duration-50 text-gray-700 dark:text-white font-bold py-2 px-2 rounded-md border border-my-blue-0 dark:border-none focus:outline-none focus:shadow-outline"
                type="button"
                onClick={logGoogleUser}
              >
                <img
                  src={ICONS.Google}
                  alt={LOGIN.GOOGLE}
                  className="inline-block mr-2 w-6"
                />
                {LOGIN.GOOGLE_SIGNIN}
              </button>
            </div>
          </Form>
        )}
      </Formik>

      <p className="text-center text-gray-600 dark:text-my-background">
        {LOGIN.NO_ACCOUNT}
        <Link
          to={ROUTES_CONFIG.SIGNUP.path}
          className="text-my-blue-500D hover:text-my-blue-800 hover:dark:text-my-blue-200 font-medium hover:underline"
        >
          {LOGIN.SIGN_UP}
        </Link>
      </p>
    </div>
  );
}
