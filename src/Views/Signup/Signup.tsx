import * as Yup from 'yup';
import { Field, Form, Formik, FormikProps } from 'formik';
import { CONSTANTS, SIGN_UP } from '../../Shared/Constants';
import { FormValues } from './sign-up';
import useAuthentication from '../../Hooks/userHook';

export const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .transform((value: string) => value.trim())
    .test(
      SIGN_UP.TRIM_TWO,
      SIGN_UP.BLANK_SPACE,
      (value) => (value || '').length > 0
    )
    .min(3, SIGN_UP.TOO_SHORT)
    .max(25, SIGN_UP.TOO_LONG)
    .required(SIGN_UP.ENTER_FIRST_NAME)
    .matches(SIGN_UP.NAME_REGEX, SIGN_UP.ONLY_FN_ALPHABETS),
  lastName: Yup.string()
    .transform((value: string) => value.trim())
    .test(
      SIGN_UP.TRIM_TWO,
      SIGN_UP.BLANK_SPACE_LAST,
      (value) => (value || '').length > 0
    )
    .min(2, SIGN_UP.TOO_SHORT)
    .max(25, SIGN_UP.TOO_LONG)
    .required(SIGN_UP.ENTER_LAST_NAME)
    .matches(SIGN_UP.NAME_REGEX, SIGN_UP.ONLY_LN_ALPHABET),
  email: Yup.string()
    .transform((value: string) => value.trim())
    .test(
      SIGN_UP.TRIM_TWO,
      SIGN_UP.BLANK_SPACE_EMAIL,
      (value) => (value || '').length > 0
    )
    .email(SIGN_UP.INVALID_EMAIL)
    .required(SIGN_UP.ENTER_EMAIL)
    .matches(SIGN_UP.EMAIL_REGEX, SIGN_UP.INVALID_EMAIL),
  password: Yup.string()
    .transform((value: string) => value.trim())
    .test(
      SIGN_UP.TRIM_TWO,
      SIGN_UP.BLANK_SPACE_PWD,
      (value) => (value || '').length > 0
    )
    .min(8)
    .max(25)
    .required(SIGN_UP.ENTER_PASSWORD)
    .matches(SIGN_UP.PASSWORD_REGEX, SIGN_UP.PWD_TEXT),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref(SIGN_UP.CONFIRM_PWD_REGEX)], SIGN_UP.PWD_DONT_MATCH)
    .required(SIGN_UP.PWD_REQUIRED),
});

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
    <div className="text-center justify-center items-center center-content">
      <h1 className="text-3xl font-bold underline text-center text-red-500">
        {/* <Link to={ROUTES.LOGIN}>Signup </Link> */}
        SignUp
      </h1>
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
        {({ errors, touched }: FormikProps<FormValues>) => (
          <Form
            style={{ display: 'flex', flexDirection: 'column', width: '100%' }}
          >
            <label htmlFor={CONSTANTS.FIRST_NAME}>First Name</label>
            <Field
              id={CONSTANTS.FIRST_NAME}
              name={CONSTANTS.FIRST_NAME}
              placeholder={SIGN_UP.FIRSTNAME}
            />
            {errors.firstName && touched.firstName ? (
              <div>{errors.firstName}</div>
            ) : null}

            <label htmlFor={CONSTANTS.LAST_NAME}>Last Name</label>
            <Field
              id={CONSTANTS.LAST_NAME}
              name={CONSTANTS.LAST_NAME}
              placeholder={SIGN_UP.LASTNAME}
            />
            {errors.lastName && touched.lastName ? (
              <div>{errors.lastName}</div>
            ) : null}

            <label htmlFor={CONSTANTS.EMAIL}>Email</label>
            <Field
              name={CONSTANTS.EMAIL}
              type={CONSTANTS.EMAIL}
              placeholder={SIGN_UP.EMAIL}
            />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}

            <label htmlFor={CONSTANTS.PASSWORD}>Set Password</label>
            <Field
              name={CONSTANTS.PASSWORD}
              type={CONSTANTS.PASSWORD}
              placeholder={SIGN_UP.SETPASSWORD}
            />
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}

            <label htmlFor={CONSTANTS.CONFIRM_PASSWORD}>Confirm Password</label>
            <Field
              name={CONSTANTS.CONFIRM_PASSWORD}
              type={CONSTANTS.CONFIRM_PASSWORD}
              placeholder={SIGN_UP.CONFIRMPASSWORD}
            />
            {errors.confirmPassword && touched.confirmPassword ? (
              <div>{errors.confirmPassword}</div>
            ) : null}

            <button style={{ backgroundColor: 'blue' }} type="submit">
              {SIGN_UP.SUMBIT}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
