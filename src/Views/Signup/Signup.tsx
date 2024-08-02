import { Form, Formik, FormikProps } from 'formik';
import FormField from '../../Components/Field/FormField';
import CustomButton from '../../Components/Button';
import useAuthentication from '../../Hooks/userHook';
import { SignupSchema } from '../../Shared/validationSchema';
import { ICONS } from '../../Shared/icons';
import { FormValues } from './sign-up';
import { CONSTANTS, SIGN_UP, TITLE } from '../../Shared/Constants';
import FormError from '../../Components/Field/FormError';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const { signUpCall } = useAuthentication();
  const navigate = useNavigate();

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
      <h2 className="text-2xl font-bold text-center text-gray-700 dark:text-white mb-2">
        {SIGN_UP.SUBMIT}
      </h2>
      <p className="text-center text-gray-600 dark:text-white mb-2">
        {SIGN_UP.ENTER_DETAILS}
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
              placeholder={SIGN_UP.ENTER_FIRST}
              inputType={CONSTANTS.TEXT}
              autoComplete="username"
            />
            {/* {errors.firstName && touched.firstName ? (
              <p className="text-red-500 font-medium text-xs mb-4 mt-1 text-left">
                {errors.firstName}
              </p>
            ) : null} */}
            <FormError error={errors.firstName} touched={touched.firstName} />

            <FormField
              label={SIGN_UP.LASTNAME}
              name={CONSTANTS.LAST_NAME}
              placeholder={SIGN_UP.ENTER_LAST}
              inputType={CONSTANTS.TEXT}
              autoComplete="username"
            />
            <FormError error={errors.lastName} touched={touched.lastName} />

            <FormField
              label={SIGN_UP.EMAIL}
              name={CONSTANTS.EMAIL}
              placeholder={SIGN_UP.ENTER_EMAIL_ID}
              inputType={CONSTANTS.EMAIL}
              autoComplete="email"
            />
            <FormError error={errors.email} touched={touched.email} />

            <FormField
              label={SIGN_UP.SETPASSWORD}
              name={CONSTANTS.PASSWORD}
              placeholder={SIGN_UP.ENTER_PWD}
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

            <div className="mb-2 mt-8">
              <CustomButton text={TITLE.SIGNUP} disabled={!isValid} />
            </div>
          </Form>
        )}
      </Formik>
      <p className="text-center text-gray-600 dark:text-my-background">
        {SIGN_UP.ACCOUNT}
        <button
        onClick={()=>navigate(-1)}
        type='button'
          className="text-my-blue-500D hover:text-my-blue-800 hover:dark:text-my-blue-200 font-medium hover:underline"
        >
          {SIGN_UP.LOGIN}
        </button>
      </p>
    </div>
  );
}

export default Signup;
