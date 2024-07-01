import { Field } from 'formik';
import { useState } from 'react';
import { FormFieldProps } from '.';
import { CONSTANTS } from '../../Shared/Constants';
import { ICONS } from '../../Shared/icons';

function FormField({ label, name, placeholder, inputType }: FormFieldProps) {
  const [icon, setIcon] = useState(ICONS.EyeOff);
  const [type, setType] = useState(CONSTANTS.PASSWORD);

  const handleToggle = () => {
    if (type === 'password') {
      setIcon(ICONS.EyeOn);
      setType(CONSTANTS.TEXT);
    } else {
      setIcon(ICONS.EyeOff);
      setType(CONSTANTS.PASSWORD);
    }
  };
  return (
    <div className="relative">
      <label
        className="block text-gray-700 text-sm font-bold mt-4 mb-2 text-left"
        htmlFor={name}
      >
        {label}
      </label>
      <Field
        name={name} // used as the key for form state in Formik
        type={
          name === CONSTANTS.PASSWORD || name === CONSTANTS.CONFIRM_PASSWORD
            ? type
            : inputType
        } // type of the input field ("text", "password", "email", "radio")
        id={name} // link the input with a <label>
        className="shadow appearance-none border rounded-md w-full py-2 pl-3 pr-9 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-my-background"
        placeholder={placeholder}
      />
      {(name === CONSTANTS.PASSWORD || name === CONSTANTS.CONFIRM_PASSWORD) && (
        <div
          className="absolute inset-y-0 right-0 flex items-end mb-2 pr-3"
          onClick={handleToggle}
        >
          <img src={icon} alt="password" className="w-5" />
        </div>
      )}
    </div>
  );
}

export default FormField;
