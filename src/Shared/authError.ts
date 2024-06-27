import { showAlert } from './alert';
import { ERR_CODE, ERR_MSG, ERR_TITLE, TITLE } from './Constants';

export const handleAuthError = (err: any, context: string) => {
  const title =
    context === TITLE.LOGIN ? ERR_TITLE.LOGIN : ERR_TITLE.SEND_EMAIL;
  switch (err.code) {
    case ERR_CODE.INVALID:
      showAlert(
        title,
        context === TITLE.LOGIN ? ERR_MSG.INVALID : ERR_MSG.INCORRECT_EMAIL
      );
      break;
    case ERR_CODE.REQUESTS:
      showAlert(title, ERR_MSG.REQUESTS);
      break;
    case ERR_CODE.USER_NOT_FOUND:
      showAlert(title, ERR_MSG.USER_NOT_FOUND);
      break;
    case ERR_CODE.WRONG_PASSWORD:
      showAlert(title, ERR_MSG.PASSWORD);
      break;
    case ERR_CODE.REQUEST_FAILED:
      showAlert(ERR_TITLE.INTERNET, ERR_MSG.REQUEST_FAILED);
      break;
    case ERR_CODE.INVALID_EMAIL:
      showAlert(title, ERR_MSG.INVALID_EMAIL);
      break;
    default:
      showAlert(title, `${err.message}`);
      break;
  }
};

export const handleSignUpError = (err: any) => {
  const title = ERR_TITLE.SIGNUP;
  switch (err.code) {
    case ERR_CODE.ALREADY_IN_USE:
      showAlert(title, ERR_MSG.ALREADY_IN_USE);
      break;
    case ERR_CODE.REQUEST_FAILED:
      showAlert(ERR_TITLE.INTERNET, ERR_MSG.REQUEST_FAILED);
      break;
    default:
      showAlert(title, `${err.message}`);
      break;
  }
};
