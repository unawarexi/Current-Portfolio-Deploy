import React from "react";
import { Bars, Rings } from "react-loader-spinner";
import { AnimatePresence, motion } from "framer-motion";
import { smoothPopIn } from "../Animations/FramerAnimations";

export const ConfirmSpinner = () => {
  return (
    <AnimatePresence>
      <motion.div
        {...smoothPopIn}
        className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 bg-opacity-90 backdrop-blur-md"
      >
        <div className="container mx-auto flex flex-col items-center justify-center">
          <Bars
            visible={true}
            height={150}
            width={150}
            color="#4F46E5"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass="animate-pulse"
          />
          <div className="mt-6 w-full text-center lg:w-2/3">
            <p className="title-font text-lg mb-2 flex justify-center font-semibold text-gray-300 lg:text-3xl">
              Verifying your ID...
            </p>
            <p className="text-sm text-gray-400 lg:text-base">
              Please wait while we process your information.
            </p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export const SubmitSpinner = () => {
  return (
    <AnimatePresence>
      <motion.div
        {...smoothPopIn}
        className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 bg-opacity-90 backdrop-blur-md"
      >
        <div className="container mx-auto flex flex-col items-center justify-center">
          <Rings
            visible={true}
            height={150}
            width={150}
            color="#4F46E5"
            ariaLabel="rings-loading"
            wrapperStyle={{}}
            wrapperClass="animate-spin"
          />
          <div className="mt-6 w-full text-center lg:w-2/3">
            <p className="title-font text-lg mb-2 flex justify-center font-semibold text-gray-300 lg:text-3xl">
              Submitting your info...
            </p>
            <p className="text-sm text-gray-400 lg:text-base">
              This may take a few moments. Thank you for your patience.
            </p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};