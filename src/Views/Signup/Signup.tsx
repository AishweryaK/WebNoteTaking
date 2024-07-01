import { Form, Formik, FormikProps } from 'formik';
import { CONSTANTS, SIGN_UP, TITLE } from '../../Shared/Constants';
import { FormValues } from './sign-up';
import useAuthentication from '../../Hooks/userHook';
import { SignupSchema } from '../../Shared/validationSchema';
import { ICONS } from '../../Shared/icons';
import FormField from '../../Components/Field/FormField';
import CustomButton from '../../Components/Button';

export default function Signup() {
  const { signUpCall } = useAuthentication();

  const handleSignUp = async (values: FormValues) => {
    await signUpCall({
      email: values.email.trim(),
      password: values.password.trim(),
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      // imageUri: imageUri,
    });
  };

  return (
    <div className="flex flex-col justify-center">
      <div className="mb-4 flex justify-center">
        <div className="h-16 w-16 rounded-full shadow-sm bg-gradient-to-b from-my-background to-my-background-200 flex items-center justify-center">
          <img src={ICONS.Logo} alt="Logo" className="h-12 w-12" />
        </div>
      </div>
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-2">
        Sign up
      </h2>
      <p className="text-center text-gray-600 mb-2">
        Welcome! Please enter your details.
      </p>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => handleSignUp(values)}
      >
        {({ errors, touched, isValid }: FormikProps<FormValues>) => (
          <Form>
            <FormField
              label={SIGN_UP.FIRSTNAME}
              name={CONSTANTS.FIRST_NAME}
              placeholder="Enter you first name"
              inputType={CONSTANTS.TEXT}
            />
            {errors.firstName && touched.firstName ? (
              <p className="text-red-700 text-xs mb-4 mt-1 text-left">
                {errors.firstName}
              </p>
            ) : null}

            <FormField
              label={SIGN_UP.LASTNAME}
              name={CONSTANTS.LAST_NAME}
              placeholder="Enter your last name"
              inputType={CONSTANTS.TEXT}
            />
            {errors.lastName && touched.lastName ? (
              <p className="text-red-700 text-xs mb-4 mt-1 text-left">
                {errors.lastName}
              </p>
            ) : null}

            <FormField
              label="Email"
              name={CONSTANTS.EMAIL}
              placeholder="Enter your email"
              inputType={CONSTANTS.EMAIL}
            />
            {errors.email && touched.email ? (
              <p className="text-red-700 text-xs mb-4 mt-1 text-left">
                {errors.email}
              </p>
            ) : null}

            <FormField
              label={SIGN_UP.SETPASSWORD}
              name={CONSTANTS.PASSWORD}
              placeholder="Enter a password"
              inputType={CONSTANTS.PASSWORD}
            />
            {errors.password && touched.password ? (
              <p className="text-red-700 text-xs mb-4 mt-1 text-left">
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

            <div className="mb-4 mt-8">
              <CustomButton text={TITLE.SIGNUP} disabled={!isValid} />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
