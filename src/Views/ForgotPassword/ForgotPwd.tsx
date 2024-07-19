import { sendPasswordResetEmail } from 'firebase/auth';
import { Form, Formik, FormikProps } from 'formik';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../utils';
import { showAlert } from '../../Shared/alert';
import { handleAuthError } from '../../Shared/authError';
import {
  CONSTANTS,
  ERR_MSG,
  ERR_TITLE,
  FORGOT_PWD,
  ROUTES_CONFIG,
  SIGN_UP,
  TITLE,
} from '../../Shared/Constants';
import FormField from '../../Components/Field/FormField';
import { FormValues } from '.';
import CustomButton from '../../Components/Button';
import { ForgotPSchema } from '../../Shared/validationSchema';
import { ICONS } from '../../Shared/icons';
import FormError from '../../Components/Field/FormError';

function ForgotPwd() {
  const navigate = useNavigate();

  const handleEmail = (values: FormValues) => {
    sendPasswordResetEmail(auth, values.email)
      .then(() => {
        showAlert(ERR_TITLE.EMAIL_SENT, ERR_MSG.SET_PASSWORD);
        navigate(ROUTES_CONFIG.LOGIN.path);
      })
      .catch((error) => {
        const context = TITLE.FORGOT;
        handleAuthError(error, context);
      });
  };
  return (
    <div className="flex flex-col justify-center">
      <div className="mb-6 flex justify-center">
        <div className="h-16 w-16 rounded-full shadow-sm bg-gradient-to-b from-my-background to-my-background-200 flex items-center justify-center">
          <img src={ICONS.Logo} alt={CONSTANTS.LOGO} className="h-12 w-12" />
        </div>
      </div>
      <h2 className="text-2xl font-bold text-center text-gray-700 dark:text-my-background mb-2">
        {FORGOT_PWD.FORGOT}
      </h2>
      <p className="text-center text-gray-600 mb-2">
        {FORGOT_PWD.ENTER_EMAIL}
      </p>
      <Formik
        initialValues={{
          email: '',
        }}
        validationSchema={ForgotPSchema}
        onSubmit={(values) => handleEmail(values)}
      >
        {({ errors, touched, isValid }: FormikProps<FormValues>) => (
          <Form>
            <FormField
              label={SIGN_UP.EMAIL}
              name={CONSTANTS.EMAIL}
              placeholder={SIGN_UP.EMAIL}
              inputType={CONSTANTS.EMAIL}
              autoComplete='email'
            />
            <FormError error={errors.email} touched={touched.email} />

            <div className="mb-4 mt-10">
              <CustomButton text={CONSTANTS.VERIFY} disabled={!isValid} />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ForgotPwd;
