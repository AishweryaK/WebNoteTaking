import * as Yup from 'yup';
import { SIGN_UP } from './Constants';

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

  export const LoginSchema = Yup.object().shape({
    email: SignupSchema.fields.email,
    password: SignupSchema.fields.password,
  });

  export const ForgotPSchema = Yup.object().shape({
    email: SignupSchema.fields.email,
  })