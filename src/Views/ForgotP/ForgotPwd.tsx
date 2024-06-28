import { sendPasswordResetEmail } from 'firebase/auth';
import * as Yup from 'yup';
import { Form, Formik, FormikProps } from 'formik';
import { auth } from '../../utils';
import { showAlert } from '../../Shared/alert';
import { handleAuthError } from '../../Shared/authError';
import { SignupSchema } from '../Signup/Signup';
import {
  CONSTANTS,
  ERR_MSG,
  ERR_TITLE,
  SIGN_UP,
  TITLE,
} from '../../Shared/Constants';
import FormField from '../../Components/Field/FormField';
import { FormValues } from '.';
import CustomButton from '../../Components/Button';

function ForgotPwd() {
  const handleEmail = (values: FormValues) => {
    sendPasswordResetEmail(auth, values.email)
      .then(() => {
        showAlert(ERR_TITLE.EMAIL_SENT, ERR_MSG.SET_PASSWORD);
        // navigation.navigate(NAVIGATION.LOGIN);
      })
      .catch((error) => {
        const context = TITLE.FORGOT;
        handleAuthError(error, context);
      });
  };
  return (
    <Formik
      initialValues={{
        email: '',
      }}
      validationSchema={Yup.object().shape({
        email: SignupSchema.fields.email,
      })}
      onSubmit={(values) => handleEmail(values)}
    >
      {({ errors, touched, isValid }: FormikProps<FormValues>) => (
        <Form>
          <FormField
            label="Email"
            name={CONSTANTS.EMAIL}
            placeholder={SIGN_UP.EMAIL}
          />
          {errors.email && touched.email ? (
            <p className="text-red-700">{errors.email}</p>
          ) : null}

          <CustomButton text={CONSTANTS.VERIFY} disabled={!isValid} />
        </Form>
      )}
    </Formik>
  );
}

export default ForgotPwd;
