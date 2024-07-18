import { MouseEvent } from 'react';
import { NOTES } from '../../Shared/Constants';

interface NotesDropdownProps {
  onEdit: () => void;
  onDelete: () => void;
  closeMenu: () => void;
}

const NotesDropdown: React.FC<NotesDropdownProps> = ({
  onEdit,
  onDelete,
  closeMenu,
}) => {
  const handleOptionClick = (
    e: MouseEvent<HTMLButtonElement>,
    action: () => void
  ) => {
    e.stopPropagation();
    action();
    closeMenu();
  };

  return (
    <div className="absolute z-50 sm:w-36 xl:w-48 rounded-md shadow-lg bg-white dark:bg-my-bg-dark ring-1 ring-black ring-opacity-5 focus:outline-none top-10 right-1">
      <div className="py-1">
        <button
        type='button'
          className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 hover:dark:bg-jodit-dark"
          onClick={(e) => handleOptionClick(e, onEdit)}
        >
          {NOTES.EDIT}
        </button>
        <button
        type='button'
          className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 hover:dark:bg-jodit-dark"
          onClick={(e) => handleOptionClick(e, onDelete)}
        >
          {NOTES.DELETE}
        </button>
      </div>
    </div>
  );
};

export default NotesDropdown;
