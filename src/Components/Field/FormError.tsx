import React from 'react';
import { FormErrorProps } from '.';

const FormError: React.FC<FormErrorProps> = ({ error, touched }) => {
  if (!error || !touched) {
    return null;
  }

  return (
    <p className="text-red-500 font-semibold text-xs mb-4 mt-1 text-left">
      {error}
    </p>
  );
};

export default FormError;
