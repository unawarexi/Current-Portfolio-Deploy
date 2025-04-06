import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const footerData = [
  {
    title: "Web Development",
    links: ["Frontend", "Full-Stack", "Mern Developer", "Django"],
  },
  {
    title: "Mobile Development",
    links: ["React Native", "Flutter", "Cross Platform", "Deploymemts"],
  },
  {
    title: "Blockchain",
    links: [
      "Smart Contracts",
      "Solidity",
      "Decentralized Apps",
      "Cryptocurrencies",
      "Audits & Security",
    ],
  },
  {
    title: "Achievements",
    links: ["Projects", "Certifications", "Hackathons", "Awards"],
  },
  {
    title: "Resources",
    links: ["Blog", "Documentation", "Tutorials", "GitHub Repository"],
  },
  {
    title: "Contact",
    links: ["Email", "LinkedIn", "GitHub", "Twitter"],
  },
];

const Footer = () => {
  return (
    <footer className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap md:text-left text-center -mb-10 -mx-4">
          {footerData.map((section, index) => (
            <div key={index} className="lg:w-1/6 md:w-1/3 w-1/2 px-4">
              <h2 className="title-font font-medium text-gray-900 tracking-widest md:text-sm  text-[10px] mb-3">
                {section.title}
              </h2>
              <nav className="list-none mb-10">
                {section.links.map((link, idx) => (
                  <li key={idx}>
                    <a className="text-gray-600 hover:text-gray-800 text-[10px] md:text-sm ">
                      {link}
                    </a>
                  </li>
                ))}
              </nav>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-gray-200">
        <div className="container px-5 py-8 flex flex-wrap mx-auto items-center">
          <div className="flex flex-col md:flex-row md:flex-nowrap w-full justify-center md:justify-between items-center">
            <p className="text-gray-500 text-center text-[10px] md:text-sm mb-4 md:mb-0">
              Stay connected with us - Follow us on social media
            </p>
            <span className="inline-flex justify-center md:justify-end w-full md:w-auto">
              <a className="text-gray-500 hover:text-indigo-500">
                <FaFacebookF className="w-5 h-5" />
              </a>
              <a className="ml-3 text-gray-500 hover:text-indigo-500">
                <FaTwitter className="w-5 h-5" />
              </a>
              <a className="ml-3 text-gray-500 hover:text-indigo-500">
                <FaInstagram className="w-5 h-5" />
              </a>
              <a className="ml-3 text-gray-500 hover:text-indigo-500">
                <FaLinkedinIn className="w-5 h-5" />
              </a>
            </span>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 dark:bg-[#1b2a5b53]">
        <div className="container mx-auto md:py-4 md:px-5 py-2 px-2 flex flex-wrap flex-col sm:flex-row">
          <p className="text-gray-500 text-[10px] md:text-sm text-center sm:text-left">
            © 2025 andrewsCorp —
            <a
              href="https://twitter.com/company"
              className="text-gray-600 ml-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              @unaware
            </a>
          </p>
          <span className="sm:ml-auto sm:mt-0 mt-2 sm:w-auto w-full sm:text-left text-center text-gray-500 text-[10px] md:text-sm">
            Empowering innovation
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
