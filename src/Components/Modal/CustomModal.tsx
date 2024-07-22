import Modal from 'react-modal';
import { CONSTANTS, DROPDOWN } from '../../Shared/Constants';

interface ModalProps {
  showModal: boolean;
  closeModal: () => void;
  title:string
  text:string;
  button:string;
  handleModal:()=>void;
}

function CustomModal({ showModal, closeModal, title, text, button, handleModal }: ModalProps) {

  return (
    <Modal
      isOpen={showModal}
      onRequestClose={closeModal}
      className="bg-white dark:bg-my-bg-dark rounded-lg shadow-lg max-w-md w-full p-6"
      overlayClassName="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50"
      ariaHideApp={false}
    >
      <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-white">
        {title}
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        {text}
      </p>
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-400 dark:hover:bg-gray-500"
          onClick={closeModal}
        >
          {CONSTANTS.CANCEL}
        </button>
        <button
          type="button"
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          onClick={handleModal}
        >
          {button}
        </button>
      </div>
    </Modal>
  );
}

export default CustomModal;