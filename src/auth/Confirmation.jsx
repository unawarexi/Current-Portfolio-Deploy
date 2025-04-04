import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ConfirmSpinner } from '../constants/Spinners';
import Images from '../constants/ImageStrings';
import { MdWarning } from 'react-icons/md';

const Confirmation = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const authID = import.meta.env.VITE_APP_PASSWORD; 
  const navigate = useNavigate();

  const ConfirmID = () => {
    if (input === authID) {
      setLoading(true);
      const expirationTime = Date.now() + 60 * 60 * 1000; 
      localStorage.setItem('authValid', JSON.stringify({ valid: true, expiresAt: expirationTime }));
      setTimeout(() => {
        setLoading(false);
        navigate('/auth/new'); 
      }, 2000);
    } else {
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false); // Close the modal
  };

  return (
    <div className="w-full lg:h-[900px] h-[600px] bg-contain relative flex flex-col items-center justify-center">
      {/* Background Image */}
      <div className="flex items-center justify-center relative w-full">
        <img 
          src={Images.ConfirmImg2} 
          alt="background image" 
          className="w-[80%] sm:w-[60%] lg:w-[50%] h-auto object-contain transform -translate-x-1/3" 
        />
        <img 
          src={Images.ConfirmImg} 
          alt="background image" 
          className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[90%] sm:w-[70%] lg:w-[50%] rounded-lg h-auto object-contain" 
        />
      </div>

      {/* Blur Overlay */}
      <div 
        className="absolute top-0 right-0 h-full bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center transition-all duration-500"
        style={{
          width: '100%',
          maxWidth: '100%',
          transition: 'width 0.5s ease-in-out'
        }}
      >
        <div className="p-6 sm:p-8 rounded-xl shadow-lg bg-white bg-opacity-20 backdrop-blur-md border border-gray-200 max-w-sm sm:max-w-md w-[90%] sm:w-full">
          <h2 className="text-lg sm:text-xl mb-4 text-center">Enter ID to continue</h2>
          
          <div className="relative mb-4">
            <input
              type={passwordVisible ? "text" : "password"} // Toggle password visibility
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter Password"
              className="w-full p-3 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-black text-sm sm:text-base"
            />
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)} // Toggle visibility
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm sm:text-base"
            >
              {passwordVisible ? "Hide" : "Show"}
            </button>
          </div>

          <button
            onClick={ConfirmID}
            className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-indigo-500 transition duration-200 text-sm sm:text-base"
            disabled={loading}
          >
            {loading ? <ConfirmSpinner /> : 'Confirm'}
          </button>
        </div>
      </div>

      {/* Modal for failed ID verification */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 w-[90%] sm:w-[400px] flex items-center flex-col">
            {/* Red fail icon */}
            <div className="text-red-600 text-3xl sm:text-4xl mb-4">
              <MdWarning /> {/* React Icons warning sign */}
            </div>
            <h3 className="text-lg sm:text-xl text-center text-gray-800 mb-4">ID verification failed</h3>
            <button
              onClick={closeModal}
              className="bg-blue-500 text-white rounded-md px-3 sm:px-4 py-2 hover:bg-blue-400 transition duration-200 text-sm sm:text-base"
            >
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Confirmation;
