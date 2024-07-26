import { Form, Formik, FormikProps } from 'formik';
import { Link } from 'react-router-dom';
import {
  GoogleLogin,
  useGoogleLogin,
} from '@react-oauth/google';
import FormField from '../../Components/Field/FormField';
import FormError from '../../Components/Field/FormError';
import CustomButton from '../../Components/Button';
import { FormValues } from './log-in';
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
import { useEffect, useState } from 'react';
import axios from 'axios';

interface GoogleUser {
  access_token: string;
}

export default function Login() {
  const { googleSignInCall, signInCall } = useAuthentication();
  // const [ user, setUser ] = useState();
  const [user, setUser] = useState();

  const handleLogin = async (values: FormValues) => {
    await signInCall({ email: values.email, password: values.password });
  };

  // const logGoogleUser = () => {
  //   googleSignInCall();
  // };

  // googleSignInCall(tokenResponse.access_token)

  // useEffect(() => {
  //   if (user) {
  //     axios
  //       .get(
  //         `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${user.access_token}`,
  //             Accept: 'application/json',
  //           },
  //         }
  //       )
  //       .then((res: any) => {
  //         console.log(res, 'RESPONSE');
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // }, [user]);

    const logGoogleUser = useGoogleLogin({
      flow:'auth-code',
      onSuccess: async codeResponse  =>  {
        // console.log(codeResponse,"FRFR")
        // setUser(codeResponse);
        // googleSignInCall(codeResponse.code)
        const tokens = await axios.post('http://localhost:3001/auth/google', {
          code : codeResponse.code,
        })
        console.log(tokens,"TOKEN")
      },
    }
  );

  // console.log(user,"USEROBJ")

  // const logGoogleUser = useGoogleLogin({
  //   scope: 'openid profile email',
  //   onSuccess: async (codeResponse) => {
  //     console.log(codeResponse.credential, 'Code');
      // fetching userinfo can be done on the client or the server
      // const userInfo = await axios
      //   .get('https://www.googleapis.com/oauth2/v3/userinfo', {
      //     headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
      //   })
      //   .then(res => res);
  //   },
  // });

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
              autoComplete="email"
            />
            <FormError error={errors.email} touched={touched.email} />

            <FormField
              label={SIGN_UP.SETPASSWORD}
              name={CONSTANTS.PASSWORD}
              placeholder={SIGN_UP.SETPASSWORD}
              inputType={CONSTANTS.PASSWORD}
              autoComplete="current-password"
            />
            <FormError error={errors.password} touched={touched.password} />

            <div className="mb-6 flex items-center justify-between">
              <div />
              <Link
                to={ROUTES_CONFIG.FORGOT_PASSWORD.path}
                className="mt-4 text-sm text-my-blue-500D dark:text-my-blue-100 hover:text-my-blue-800 hover:dark:text-my-blue-0 font-medium hover:underline cursor-pointer"
              >
                {LOGIN.FORGOT_PWD}
              </Link>
            </div>

            <div className="mb-4">
              <CustomButton text={TITLE.SIGNIN} disabled={!isValid} />
            </div>
            <div className="mb-4 items-center bg-transparent">
              <button
                className="w-full bg-my-background dark:bg-my-icon-dark hover:bg-my-background-100 hover:dark:bg-my-bg-dark duration-50 text-gray-700 dark:text-white font-bold py-2 px-2 rounded-md border border-my-blue-0 dark:border-none focus:outline-none focus:shadow-outline"
                type="button"
                onClick={() => logGoogleUser()}
              >
                <img
                  src={ICONS.Google}
                  alt={LOGIN.GOOGLE}
                  className="inline-block mr-2 w-6"
                />
                {LOGIN.GOOGLE_SIGNIN}
              </button>
              {/* <GoogleLogin
                onSuccess={(credentialResponse) =>
                  {googleSignInCall(credentialResponse.credential as string)
                    // console.log(credentialResponse,"CRED")
                  }
                }
                onError={() => {
                  console.log('Login Failed');
                }}
              /> */}
            </div>
          </Form>
        )}
      </Formik>

      <p className="text-center text-gray-600 dark:text-my-background">
        {LOGIN.NO_ACCOUNT}
        <Link
          to={ROUTES_CONFIG.SIGNUP.path}
          className="text-my-blue-500D dark:text-my-blue-100 hover:text-my-blue-800 hover:dark:text-my-blue-0 font-medium hover:underline"
        >
          {LOGIN.SIGN_UP}
        </Link>
      </p>
      {/* {isLoading && <ScreenLoader/>} */}
    </div>
  );
}
