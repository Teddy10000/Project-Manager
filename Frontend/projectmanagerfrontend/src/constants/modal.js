import React from 'react'
import { FaCheck, FaTimes } from 'react-icons/fa';
const Modal = ({ showModal, closeModal, modalMessage,success }) => {
    return (
      <div className={`fixed inset-0 z-[999999] flex items-center justify-center ${showModal ? 'visible' : 'hidden'}`}>
       <div className="card">
        {success ? (
                    <div className="alert alert-info">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M24 4C12.96 4 4 12.96 4 24C4 35.04 12.96 44 24 44C35.04 44 44 35.04 44 24C44 12.96 35.04 4 24 4ZM24 34C22.9 34 22 33.1 22 32V24C22 22.9 22.9 22 24 22C25.1 22 26 22.9 26 24V32C26 33.1 25.1 34 24 34ZM26 18H22V14H26V18Z" fill="#0085FF" />
            </svg>
            <div className="flex flex-col">
              <span>Title</span>
              <span className="text-content2">{modalMessage}</span>
            </div>
          </div>
        ):(
          <div className="alert alert-error">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M24 4C12.96 4 4 12.96 4 24C4 35.04 12.96 44 24 44C35.04 44 44 35.04 44 24C44 12.96 35.04 4 24 4ZM24 26C22.9 26 22 25.1 22 24V16C22 14.9 22.9 14 24 14C25.1 14 26 14.9 26 16V24C26 25.1 25.1 26 24 26ZM26 34H22V30H26V34Z" fill="#E92C2C" />
        </svg>
        <div className="flex flex-col">
          <span>Error</span>
          <span className="text-content2">{modalMessage}</span>
        </div>
      </div>    
        )}
    
          <button className= {`bg-${success ? 'green-500' : 'red-500'} hover:bg-${success ? 'green-700' : 'red-700'} text-white font-bold py-2 px-4 rounded`} onClick={closeModal}>
            Close
          </button>
          </div>
      </div>
    );
  };

export default Modal;