import { Form, Formik, FormikProps } from 'formik';
import { Link } from 'react-router-dom';
import { FormValues } from './log-in';
import {
  CONSTANTS,
  ROUTES_CONFIG,
  SIGN_UP,
  TITLE,
} from '../../Shared/Constants';
import useAuthentication from '../../Hooks/userHook';
import FormField from '../../Components/Field/FormField';
import CustomButton from '../../Components/Button';
import { ICONS } from '../../Shared/icons';
import { LoginSchema } from '../../Shared/validationSchema';

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
          <img src={ICONS.Logo} alt="Logo" className="h-12 w-12" />
        </div>
      </div>
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-2">
        Welcome back
      </h2>
      <p className="text-center text-gray-600 mb-2">
        Welcome back! Please enter your details.
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
              label="Email"
              name={CONSTANTS.EMAIL}
              placeholder={SIGN_UP.EMAIL}
              inputType={CONSTANTS.EMAIL}
            />
            {errors.email && touched.email ? (
              <p className="text-red-700 text-xs mb-4 text-left">
                {errors.email}
              </p>
            ) : null}

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

            <div className="mb-6 flex items-center justify-between">
              <div />
              <Link
                to={ROUTES_CONFIG.FORGOT_PASSWORD.path}
                className="mt-4 text-sm text-my-blue-500D hover:text-my-blue-800 hover:underline cursor-pointer"
              >
                Forgot password?
              </Link>
            </div>

            <div className="mb-4">
              <CustomButton text={TITLE.SIGNIN} disabled={!isValid} />
            </div>
            <div className="mb-4">
              <button
                className="w-full bg-my-background hover:bg-my-background-100 text-gray-700 font-bold py-2 px-2 rounded-full border border-my-blue-0 focus:outline-none focus:shadow-outline"
                type="button"
                onClick={logGoogleUser}
              >
                <img
                  src={ICONS.Google}
                  alt="Google"
                  className="inline-block mr-2 w-6"
                />
                Sign in with Google
              </button>
            </div>
          </Form>
        )}
      </Formik>

      <p className="text-center text-gray-600">
        Don't have an account?{' '}
        <Link
          to={ROUTES_CONFIG.SIGNUP.path}
          className="text-my-blue-500D hover:text-my-blue-800 hover:underline"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
