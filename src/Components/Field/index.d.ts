export interface FormFieldProps {
  label: string;
  name: string;
  placeholder: string;
  inputType: string;
}

export interface FormErrorProps {
  error?: string;
  touched?: boolean;
}
