import React from 'react';
import { FaLinkedin, FaInstagram, FaGithub, FaTwitter, FaFacebook, FaWhatsapp } from 'react-icons/fa';

const Socials = () => {
  return (
    <div className="flex justify-center items-center space-x-2 md:space-x-4">
      {/* LinkedIn */}
      <a
        href="https://www.linkedin.com/in/andrew-j-chukwuweike-se"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#0077B5] text-white rounded-full p-2 lg:p-3 transition-all transform hover:scale-110"
      >
        <FaLinkedin size={20}  />
      </a>

      {/* Instagram */}
      <a
        href="https://www.instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white rounded-full p-2 lg:p-3 transition-all transform hover:scale-110"
      >
        <FaInstagram size={20}  />
      </a>

      {/* GitHub */}
      <a
        href="https://www.github.com/unawarexi"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#333] text-white rounded-full p-2 lg:p-3 transition-all transform hover:scale-110"
      >
        <FaGithub size={20}  />
      </a>

      {/* X-Twitter */}
      <a
        href="https://www.x.com/LibraryOf_Dre"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#1DA1F2] text-white rounded-full p-2 lg:p-3 transition-all transform hover:scale-110"
      >
        <FaTwitter size={20}  />
      </a>

      {/* Facebook */}
      <a
        href="https://www.facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#1877F2] text-white rounded-full p-2 lg:p-3 transition-all transform hover:scale-110"
      >
        <FaFacebook size={20}  />
      </a>

      {/* WhatsApp */}
      <a
        href="https://api.whatsapp.com/send?phone=+2349028378837"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#25D366] text-white rounded-full p-2 lg:p-3 transition-all transform hover:scale-110"
      >
        <FaWhatsapp size={20}  />
      </a>
    </div>
  );
};

export default Socials;
