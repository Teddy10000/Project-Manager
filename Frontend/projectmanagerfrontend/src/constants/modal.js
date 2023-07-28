import React from 'react'
import { FaCheck, FaTimes } from 'react-icons/fa';
const Modal = ({ showModal, closeModal, modalMessage,success }) => {
    return (
      <div className={`fixed inset-0 z-[999999] flex items-center justify-center ${showModal ? 'visible' : 'hidden'}`}>
        
        <div className="bg-white  p-6 rounded shadow-lg">
            <div className="">
            {success ? (
              <FaCheck className="text-yellow-500 border w-28 h-28" />
            ) : (
              <FaTimes className="text-red-500 border w-28 h-28" />
            )}
            </div>
          <p className="mb-4">{modalMessage}</p>
          <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded" onClick={closeModal}>
            Close
          </button>
        </div>
      </div>
    );
  };

export default Modal;