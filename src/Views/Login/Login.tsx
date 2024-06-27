import * as Yup from 'yup';
import { Field, Form, Formik, FormikProps } from 'formik';
import { SignupSchema } from '../Signup/Signup';
import { FormValues } from './log-in';
import { CONSTANTS, SIGN_UP } from '../../Shared/Constants';
import { signInWithGooglePopup } from '../../utils';

const LoginSchema = Yup.object().shape({
  email: SignupSchema.fields.email,
  password: SignupSchema.fields.password,
});

export default function Login() {
  const handleLogin = async (values: FormValues) => {
    // await signInCall({email: values.email, password: values.password});
    console.log(values, 'FJFJERJ');
  };

  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    console.log(response);
  };

  return (
    <div className="text-center justify-center items-center center-content">
      <h1 className="text-3xl font-bold text-center text-black center-content pt-10">
        Login
      </h1>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={LoginSchema}
        onSubmit={(values) => handleLogin(values)}
      >
        {({ errors, touched }: FormikProps<FormValues>) => (
          <div>
            <Form
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
              }}
            >
              <label htmlFor={CONSTANTS.EMAIL}>Email</label>
              <Field
                name={CONSTANTS.EMAIL}
                type={CONSTANTS.EMAIL}
                placeholder={SIGN_UP.EMAIL}
              />
              {errors.email && touched.email ? (
                <p className="text-red-700">{errors.email}</p>
              ) : null}

              <label htmlFor={CONSTANTS.PASSWORD}>Password</label>
              <Field
                name={CONSTANTS.PASSWORD}
                type={CONSTANTS.PASSWORD}
                placeholder={SIGN_UP.SETPASSWORD}
              />
              {errors.password && touched.password ? (
                <p className="text-red-700">{errors.password}</p>
              ) : null}
              <div>
                <div className="text-red-700 items-end"> Forgot Password? </div>
              </div>
              <button style={{ backgroundColor: 'blue' }} type="submit">
                {SIGN_UP.SUMBIT}
              </button>
            </Form>
          </div>
        )}
      </Formik>

      <div>
        <button style={{ backgroundColor: 'blue' }} onClick={logGoogleUser}>
          Sign In With Google
        </button>
      </div>
    </div>
  );
}
