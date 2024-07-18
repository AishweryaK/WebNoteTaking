import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export const showAlert = (title: string, message: string | undefined) => {
  // alert(`${title} - ${message}`);
  toast.info(`${title} - ${message}`, {
    position: "top-right",
    theme:'dark',
  });
};
