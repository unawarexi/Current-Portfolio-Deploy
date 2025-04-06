import React, { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AiOutlineMail } from "react-icons/ai";
import { FaTwitter } from "react-icons/fa";
import { BsWhatsapp } from "react-icons/bs";
import Images from "../../constants/ImageStrings";
import useIntersectionObserver from "../../Hooks/IntersectObserver";
import useResponsive from "../../Hooks/useResponsive";

const Contact = () => {
  const { isMobile, isTablet, isDesktop } = useResponsive();
  const { targetRef, isIntersecting } = useIntersectionObserver({
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  });

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isIntersecting) {
      setAnimate(true);
    }
  }, [isIntersecting]);

  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAIL_SERVICE_ID, 
        import.meta.env.VITE_EMAIL_TEMPLATE_ID, 
        form.current,
        import.meta.env.VITE_EMAIL_PUBLIC_KEY 
      )
      .then(
        (result) => {
          toast.success("Message sent successfully!");
          console.log(result.text);
        },
        (error) => {
          toast.error("Failed to send message. Please try again.");
          console.log(error.text);
        }
      );

    e.target.reset();
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} />
      <section className="relative w-full overflow-hidden">
        {/* Image container with overlay */}
        <div className="absolute inset-0">
          <img
            src={Images.contactBackground}
            alt="Contact Background"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>

        {/* Contact form container */}
        <div className="relative z-10 w-full px-5 py-16 mx-auto md:px-8 md:max-w-7xl">
          <div className="grid gap-8 md:grid-cols-2 items-start">
            {/* Contact Form */}
            <div className="bg-gray-50 dark:bg-black/70 bg-opacity-90 rounded-lg p-6 shadow-lg">
              <h2 className="text-lg font-bold text-indigo-900 mb-4 dark:text-white md:text-3xl">
                Get in Touch
              </h2>
              <p className="text-sm text-gray-600 mb-8 dark:text-gray-300">
                Feel free to reach out, and get a response as soon as possible.
              </p>

              <form className="space-y-4 h-auto" ref={form} onSubmit={sendEmail}>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  required
                  className="w-full p-3 rounded-lg bg-white border text-xs border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-white md:text-sm"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  required
                  className="w-full p-3 rounded-lg bg-white border text-xs border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-white md:text-sm"
                />
                <textarea
                  name="message"
                  placeholder="Message"
                  rows={4}
                  required
                  className="w-full p-3 rounded-lg bg-white border text-xs border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none resize-none dark:bg-gray-800 dark:border-gray-700 dark:text-white md:text-sm"
                ></textarea>
                <button
                  type="submit"
                  className="w-full text-xs bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors dark:bg-indigo-600 dark:hover:bg-indigo-700 md:text-sm"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information and Hours of Operation */}
            <div className="space-y-8">
              <div className="bg-white dark:bg-black/70 bg-opacity-90 rounded-lg p-6 shadow-lg">
                <h3 className="text-md font-semibold text-indigo-900 mb-6 dark:text-white md:text-xl">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 fill-indigo-900"
                      viewBox="0 0 64 64"
                    >
                      <path d="M32 0A24.032 24.032 0 0 0 8 24c0 17.23 22.36 38.81 23.31 39.72a.99.99 0 0 0 1.38 0C33.64 62.81 56 41.23 56 24A24.032 24.032 0 0 0 32 0zm0 35a11 11 0 1 1 11-11 11.007 11.007 0 0 1-11 11z" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-xs mb-1 dark:text-gray-200 md:text-sm">
                        Our Location
                      </h4>
                      <p className="text-gray-600 text-xs dark:text-gray-400 md:text-sm">Nigeria</p>
                      <p className="text-gray-600 text-xs dark:text-gray-400 md:text-sm">
                        Benin City, Edo. - Lagos
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 fill-indigo-900"
                      viewBox="0 0 513.64 513.64"
                    >
                      <path d="M499.66 376.96l-71.68-71.68c-25.6-25.6-69.12-15.359-79.36 17.92-7.68 23.041-33.28 35.841-56.32 30.72-51.2-12.8-120.32-79.36-133.12-133.12-7.68-23.041 7.68-48.641 30.72-56.32 33.28-10.24 43.52-53.76 17.92-79.36l-71.68-71.68c-20.48-17.92-51.2-17.92-69.12 0L18.38 62.08c-48.64 51.2 5.12 186.88 125.44 307.2s256 176.641 307.2 125.44l48.64-48.64c17.921-20.48 17.921-51.2 0-69.12z" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-xs mb-1 dark:text-gray-200 md:text-sm">
                        Phone Number
                      </h4>
                      <p className="text-gray-600 text-xs dark:text-gray-400 md:text-sm">
                        +234 (902) 837-8837
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 fill-indigo-900"
                      viewBox="0 0 512 512"
                    >
                      <path d="M298.789 313.693c-12.738 8.492-27.534 12.981-42.789 12.981-15.254 0-30.05-4.489-42.788-12.981L3.409 173.82A76.269 76.269 0 0 1 0 171.403V400.6c0 26.278 21.325 47.133 47.133 47.133h417.733c26.278 0 47.133-21.325 47.133-47.133V171.402a75.21 75.21 0 0 1-3.416 2.422z" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-xs mb-1 dark:text-gray-200 md:text-sm">
                        Email Address
                      </h4>
                      <a
                        href="mailto:opensource.chukwuweike.dev@gmail.com"
                        target="_blank"
                        className="text-gray-600 text-xs font-bold dark:text-gray-400 md:text-sm"
                      >
                        opensource.chukwuweike.dev@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-black/70 bg-opacity-90 rounded-lg p-6 shadow-lg">
                <h3 className="text-md font-semibold text-indigo-900 mb-6 dark:text-white md:text-xl">
                  Hours of Operation
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-xs dark:text-gray-400 md:text-sm">
                      Monday - Friday
                    </span>
                    <span className="text-gray-800 text-xs dark:text-gray-200 md:text-sm">
                      9:00 AM - 6:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-xs dark:text-gray-400 md:text-sm">
                      Saturday
                    </span>
                    <span className="text-gray-800 text-xs dark:text-gray-200 md:text-sm">
                      10:00 AM - 4:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-xs dark:text-gray-400 md:text-sm">
                      Sunday
                    </span>
                    <span className="text-gray-800 text-xs dark:text-gray-200 md:text-sm">
                      Closed
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;