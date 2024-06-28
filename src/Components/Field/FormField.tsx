import { Field } from 'formik';
import { FormFieldProps } from '.';

function FormField({ label, name, placeholder }: FormFieldProps) {
  return (
    <div>
      <label className="text-stone-800 text-left p-2" htmlFor={name}>
        {label}
      </label>
      <Field
        className="background p-2 rounded-md shadow-md"
        name={name}
        type={name}
        placeholder={placeholder}
      />
    </div>
  );
}

export default FormField;
