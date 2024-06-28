import * as Yup from 'yup';
import { Form, Formik, FormikProps } from 'formik';
import { useNavigate } from 'react-router-dom';
import { SignupSchema } from '../Signup/Signup';
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

const LoginSchema = Yup.object().shape({
  email: SignupSchema.fields.email,
  password: SignupSchema.fields.password,
});

export default function Login() {
  const { googleSignInCall, signInCall } = useAuthentication();
  const navigate = useNavigate();

  const handleLogin = async (values: FormValues) => {
    await signInCall({ email: values.email, password: values.password });
  };

  const logGoogleUser = () => {
    googleSignInCall();
  };

  return (
    <div className="text-center justify-center items-center overflow-clip">
      <h1 className="text-3xl font-bold text-center justify-center text-black center-content pt-10">
        Login
      </h1>
      <div className="flex-1 flex flex-col">
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={LoginSchema}
          onSubmit={(values) => handleLogin(values)}
        >
          {({ errors, touched, isValid }: FormikProps<FormValues>) => (
            <div className="flex flex-col">
              <Form
                className="flex-col"
                // style={{
                //   display: 'flex',
                //   flexDirection: 'column',
                // }}
              >
                <FormField
                  label="Email"
                  name={CONSTANTS.EMAIL}
                  placeholder={SIGN_UP.EMAIL}
                />
                {errors.email && touched.email ? (
                  <p className="text-red-700">{errors.email}</p>
                ) : null}
                <FormField
                  label="Password"
                  name={CONSTANTS.PASSWORD}
                  placeholder={SIGN_UP.SETPASSWORD}
                />
                {errors.password && touched.password ? (
                  <p className="text-red-700">{errors.password}</p>
                ) : null}
                <div className="text-right">
                  <button
                    type="button"
                    className="text-red-700 text-right text-base cursor-pointer"
                    onClick={() => navigate(ROUTES_CONFIG.FORGOT_PASSWORD.path)}
                  >
                    Forgot Password?
                  </button>
                </div>
                {/* <button className='bg-my-blue p-2 rounded-md'
              type="submit">
                {TITLE.LOGIN}
              </button> */}
                <CustomButton text={TITLE.LOGIN} disabled={!isValid} />
              </Form>
            </div>
          )}
        </Formik>
        <div>
          <button
            type="button"
            className="text-my-blue"
            onClick={logGoogleUser}
          >
            Sign In With Google
          </button>
        </div>
      </div>
    </div>
  );
}
