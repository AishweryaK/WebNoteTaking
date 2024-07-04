import React, { useState } from 'react';
import AddNote from './AddNote';

function AddNoteModal({}) {
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <>
      {showModal && (
        <div
          id="authentication-modal"
          tabIndex={-1}
          aria-hidden="true"
          className="fixed inset-0 z-50 flex justify-center items-center w-full h-full overflow-y-auto overflow-x-hidden bg-black bg-opacity-60"
        >
          <div className="relative p-4 w-full max-w-80 md:max-w-sm">
            <div className="relative bg-white rounded-lg shadow">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                <AddNote label="Others" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AddNoteModal;
