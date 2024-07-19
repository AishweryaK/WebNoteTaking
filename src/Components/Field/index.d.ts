export interface FormFieldProps {
  label: string;
  name: string;
  placeholder: string;
  inputType: string;
  autoComplete: string;
}

export interface FormErrorProps {
  error?: string;
  touched?: boolean;
}
