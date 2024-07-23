const STRING: string = 'Test';
export { STRING };

const ROUTES = {
  LOGIN: '/',
  HOME: '/home',
  NOTES: '/home/:label',
  // LABEL:'/home/Others',
  REGISTER: '/register',
  ABOUT: '/about-us',
  SIGNUP: '/sign-up',
  FORGOT_PASSWORD: '/forgotp',
  ACCOUNT: '/account',
};

const WILDCARD_ROUTES = {
  PUBLIC: ROUTES.LOGIN,
  PRIVATE: ROUTES.HOME,
};

const ROUTES_CONFIG = {
  LOGIN: {
    path: ROUTES.LOGIN,
    title: 'Note Taking',
  },
  SIGNUP: {
    path: ROUTES.SIGNUP,
    title: 'Signup',
  },
  HOME: {
    path: ROUTES.HOME,
    title: 'Note Taking App',
  },
  NOTES: {
    path: ROUTES.NOTES,
    title: 'Note Taking App',
  },
  ACCOUNT: {
    path: ROUTES.ACCOUNT,
    title: 'User Account',
  },
  REGISTER: {
    path: ROUTES.REGISTER,
    title: 'Register',
  },
  ABOUT: {
    path: ROUTES.ABOUT,
    title: 'About us',
  },
  FORGOT_PASSWORD: {
    path: ROUTES.FORGOT_PASSWORD,
    title: 'Forgot Password',
  },
};

const PROVIDER = {
  GOOGLE: 'google',
  EMAIL: 'email',
};

const CONSTANTS = {
  FIRST_NAME: 'firstName',
  LAST_NAME: 'lastName',
  PASSWORD: 'password',
  CONFIRM_PASSWORD: 'confirmPassword',
  CURRENT_PASSWORD: 'currentPassword',
  EMAIL: 'email',
  TEXT: 'text',
  YES: 'Yes',
  NO: 'No',
  INCREMENT: 'increment',
  DECREMENT: 'decrement',
  CANCEL: 'Cancel',
  LOGO: 'Logo',
  VERIFY: 'Verify',
};

const COLLECTION = {
  USERS: 'users',
  PERSONAL: 'Personal',
  ACADEMIC: 'Academic',
  WORK: 'Work',
  OTHERS: 'Others',
};

const DEFAULT_NOTE = {
  DESCRIPTION: 'This is where you write your description...',
};

const SIGN_UP = {
  NAME_REGEX: /^[A-Za-z]+$/gi,
  EMAIL_REGEX: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
  PASSWORD_REGEX:
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])(?!.*\s).{8,25}$/,
  CONFIRM_PWD_REGEX: 'password',
  TRIM: 'trim',
  TRIM_TWO: 'trim',
  BLANK_SPACE: 'First Name cannot consist only of blank spaces',
  BLANK_SPACE_LAST: 'Last Name cannot consist only of blank spaces',
  BLANK_SPACE_EMAIL: 'Email cannot consist only of blank spaces',
  BLANK_SPACE_PWD: 'Password cannot consist only of blank spaces',
  TOO_SHORT: 'Too Short!',
  TOO_LONG: 'Too Long!',
  ENTER_FIRST_NAME: '* Please enter your First Name',
  ENTER_LAST_NAME: '* Please enter your Last Name',
  ONLY_FN_ALPHABETS: 'First Name should only contain alphabets',
  ONLY_LN_ALPHABET: 'Last Name should only contain alphabets',
  INVALID_EMAIL: 'Invalid email',
  ENTER_EMAIL: '* Please enter your Email',
  ENTER_PASSWORD: '* Please enter a Password',
  PWD_TEXT:
    'Password should consist of one or more uppercase, numbers and special characters, but no spaces',
  PWD_DONT_MATCH: 'Password and Confirm Password do not match',
  PWD_REQUIRED: '* Password Confirmation required',
  ENTER_CURR_PWD: '* Please enter your Current Password',
  FIRSTNAME: 'First Name',
  LASTNAME: 'Last Name',
  EMAIL: 'Email',
  SETPASSWORD: 'Password',
  CONFIRMPASSWORD: 'Confirm Password',
  CURRENTPASSWORD: 'Current Password',
  SUBMIT: 'Sign up',
  ENTER_DETAILS: 'Welcome! Please enter your details.',
  ENTER_FIRST: 'Enter your first name',
  ENTER_LAST: 'Enter your last name',
  ENTER_EMAIL_ID: 'Enter your email',
  ENTER_PWD: 'Enter your password',
};

const TITLE = {
  ADDNOTE: 'Add Note',
  NOTES: 'Notes',
  USERACCOUNT: 'User Account',
  BACK: 'BACK',
  LOGIN: 'Log in',
  SIGNIN: 'Sign in',
  SIGNUP: 'Sign up',
  FORGOT: 'Forgot Password',
  SOMETHING: 'Something',
  APP: 'App',
  LOGOUT: 'Logout',
};

const ERR_CODE = {
  INVALID: 'auth/invalid-credential',
  REQUESTS: 'auth/too-many-requests',
  USER_NOT_FOUND: 'auth/user-not-found',
  WRONG_PASSWORD: 'auth/wrong-password',
  REQUEST_FAILED: 'auth/network-request-failed',
  ALREADY_IN_USE: 'auth/email-already-in-use',
  INVALID_EMAIL: 'auth/invalid-email',
};

const ERR_TITLE = {
  LOGIN: 'Error logging in',
  INTERNET: 'No Internet Connection',
  SIGNUP: 'Error signing up',
  ERROR: 'Error',
  ACTION_NOT_ALLOWED: 'Action Not Allowed',
  NO_URL: 'No URL provided',
  EMPTY_NOTE: 'Empty note',
  SUCCESS: 'Success',
  EMAIL_SENT: 'Email sent successfully!',
  SEND_EMAIL: 'Error sending email',
  UPDATING_COLLECTION: 'Error updating collection:',
};

const ERR_MSG = {
  INVALID: 'Incorrect email or password',
  REQUESTS:
    'All requests from this device are blocked due to unusual activity. Please try again later',
  USER_NOT_FOUND: 'No user corresponding this email exists. Please Sign up',
  PASSWORD: 'Incorrect Password. Please try again or reset your password.',
  REQUEST_FAILED: 'Please check your internet connection and try again.',
  ALREADY_IN_USE: 'The email address is already in use',
  GOOGLE_CANCELLED: 'Google Sign-In Cancelled',
  IN_PROGRESS: 'Signin in progress',
  PLAY_SERVICES: 'Play Services not available',
  CANNOT_DELETE: 'You cannot delete default collections.',
  ENTER_URL: 'Please enter a URL',
  NOTE_DISCARDED: 'It will be discarded',
  PASSWORD_INCORRECT: 'Current password is incorrect',
  PASSWORD_SAME: 'The new password cannot be the same as the current password.',
  FILL_ALL_FIELDS: 'Please fill in all the fields.',
  CHANGED_PASSWORD: 'Password changed successfully',
  SET_PASSWORD: 'Please set a new password',
  INCORRECT_EMAIL: 'Incorrect email',
  SAME_USERNAME: 'User Name same as before. Please try again.',
  USERNAME_CHANGED: 'User Name changed successfully',
  INVALID_EMAIL: 'Please check your email address',
};

const CHANGE_PASSWORD = {
  CHANGE: 'Change Password',
  CURRENT: 'Current Password',
  NEW: 'New Password',
  CONFIRM_NEW: 'Confirm New Password',
  CANCEL: 'Cancel',
  DELETE_MODAL:'Delete Label',
  ARE_YOU_SURE:'Are you sure you want to delete this label?',
  DELETE:'Delete',
};

const LABEL_LAYOUT = {
  EDIT: 'Edit',
  EDIT_LABELS: 'Edit Labels',
  EXISTS: 'Label already Exists',
  NEW: 'New Label',
  ENTER_NEW: 'Enter new label',
  EMPTY_ERROR: '* Please enter a label',
  ADD_LABEL: 'Add Label',
};

const DROPDOWN = {
  ACCOUNT: 'Account',
  PASSWORD: 'Change Password',
  ENABLE_THEME: 'Enable Dark Theme',
  DISABLE_THEME: 'Disable Dark Theme',
  LOGOUT: 'Logout',
  CONFIRM: 'Confirm',
  ARE_YOU_SURE: 'Are you sure you want to log out?',
};

const NAVBAR = {
  MENU: 'Menu',
  SEARCH: 'Search within',
  ACCOUNT: 'Account',
};

const ROOT_ROUTER = {
  HTML: 'html',
  DARK: 'dark',
  LIGHT: 'light',
};

const ACCOUNT = {
  WELCOME: 'Welcome to your Profile!',
  USER_NAME: 'User Name',
  EMAIL: 'Email',
  EDIT_USERNAME: 'Edit Username',
  ENTER_FIRST: 'Enter your first name',
  ENTER_LAST: 'Enter your last name',
  CHANGE_NAME: 'Change Name',
};

const ADD_NOTE = {
  START_TYPING: 'Start typing here...',
  TITLE: 'Title',
  CANCEL: 'Cancel',
  SAVE: 'Save',
};

const FORGOT_PWD = {
  FORGOT: 'Forgot your Password?',
  ENTER_EMAIL: 'Enter the email address associated with your account',
};

const LOGIN = {
  NOTE_APP: 'Notes App',
  WELCOME: 'Welcome back! Please enter your details.',
  FORGOT_PWD: 'Forgot password?',
  GOOGLE_SIGNIN: 'Sign in with Google',
  GOOGLE: 'Google',
  NO_ACCOUNT: "Don't have an account? ",
  SIGN_UP: 'Sign Up',
};

const NOTES = {
  ERROR: 'Error fetching notes:',
  ADD_NOTE: 'Add Note...',
  START_COLLECTION: 'Add a note to start your collection!',
  NO_MATCHING: 'No matching notes',
  MENU: 'Menu',
  CLOSE: 'Close',
  EDIT: 'Edit Note',
  DELETE: 'Delete Note',
  ARE_YOU_SURE:'Are you sure you want to delete this Note?',
  DEL:'Delete',

};

export {
  ROUTES,
  WILDCARD_ROUTES,
  ROUTES_CONFIG,
  PROVIDER,
  CONSTANTS,
  COLLECTION,
  DEFAULT_NOTE,
  SIGN_UP,
  TITLE,
  ERR_CODE,
  ERR_TITLE,
  ERR_MSG,
  CHANGE_PASSWORD,
  LABEL_LAYOUT,
  DROPDOWN,
  NAVBAR,
  ROOT_ROUTER,
  ACCOUNT,
  ADD_NOTE,
  FORGOT_PWD,
  LOGIN,
  NOTES,
};
