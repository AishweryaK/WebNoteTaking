import { Formik, FormikProps, Form } from 'formik';
import { ACCOUNT, CHANGE_PASSWORD, CONSTANTS, SIGN_UP } from '../../Shared/Constants';
import { AccountSchema } from '../../Shared/validationSchema';
import FormField from '../../Components/Field/FormField';
import CustomButton from '../../Components/Button';
import useAuthentication from '../../Hooks/userHook';
import FormError from '../../Components/Field/FormError';

export interface FormValues {
  firstName: string;
  lastName: string;
}

export interface PasswordProps {
  onClose: () => void;
}

function NameChange({ onClose }: PasswordProps) {
  const { handleNameChange } = useAuthentication();

  const handleCancel = () => {
    onClose();
  };

  return (
    <Formik
      initialValues={{ firstName: '', lastName: '' }}
      validationSchema={AccountSchema}
      onSubmit={(values) => handleNameChange(values, onClose)}
    >
      {({ errors, touched, isValid }: FormikProps<FormValues>) => (
        <Form>
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
            <div className="bg-white dark:bg-my-hover-dark rounded-lg p-6 w-11/12 md:w-2/5 2xl:w-1/5">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                {ACCOUNT.EDIT_USERNAME}
              </h2>

              <FormField
                label={SIGN_UP.FIRSTNAME}
                name={CONSTANTS.FIRST_NAME}
                placeholder={ACCOUNT.ENTER_FIRST}
                inputType={CONSTANTS.TEXT}
              />
              <FormError error={errors.firstName} touched={touched.firstName} />

              <FormField
                label={SIGN_UP.LASTNAME}
                name={CONSTANTS.LAST_NAME}
                placeholder={ACCOUNT.ENTER_LAST}
                inputType={CONSTANTS.TEXT}
              />
              <FormError error={errors.lastName} touched={touched.lastName} />

              <div className="flex justify-between mt-8">
                <button
                  className="bg-red-500 text-white px-4 mb-4 rounded-md font-semibold"
                  onClick={() => handleCancel()}
                >
                  {CHANGE_PASSWORD.CANCEL}
                </button>
                <div className="mb-4">
                  <CustomButton text={ACCOUNT.CHANGE_NAME} disabled={!isValid} />
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default NameChange;
