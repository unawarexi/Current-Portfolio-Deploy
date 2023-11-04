import React, { useState } from "react";
import "./Header.css";
import Cta from "./Cta";
import ME from "../../assets/me.jpg";
import Headersocials from "./Headersocials";

import { motion } from "framer-motion";

import { Animation } from "../../Animations/Stargerred";
import "animate.css";

const Header = () => {
  const [activeTopNav, setActiveTopNav] = useState("#");

  return (
    <>
      <div className="heading">
        <div className="first_nav bd_grid">
          <div>
            <a href="#" className="nav_logo">
              Andrew<span className="nav_logo-span">-Corp</span>
            </a>
          </div>

          <div className="nav_menu" id="nav_menu">
            <ul className="nav_list">
              <li className="nav_items">
                <a
                  href="#"
                  onClick={() => setActiveTopNav("#")}
                  className={activeTopNav === "#" ? "active" : ""}
                >
                  {" "}
                  Home
                </a>
              </li>

              <li className="nav_items">
                <a
                  href="#About"
                  onClick={() => setActiveTopNav("#About")}
                  className={activeTopNav === "#About" ? "active" : ""}
                >
                  {" "}
                  About
                </a>
              </li>

              <li className="nav_items">
                <a
                  href="#Experience"
                  onClick={() => setActiveTopNav("#Experience")}
                  className={activeTopNav === "#Experience" ? "active" : ""}
                >
                  {" "}
                  Skills
                </a>
              </li>

              <li className="nav_items">
                <a
                  href="#Portfolio"
                  onClick={() => setActiveTopNav("#Portfolio")}
                  className={activeTopNav === "#Portfolio" ? "active" : ""}
                >
                  {" "}
                  Portfolio
                </a>
              </li>

              <li className="nav_items">
                <a
                  href="#Contact"
                  onClick={() => setActiveTopNav("#Contact")}
                  className={activeTopNav === "#Contact" ? "active" : ""}
                >
                  {" "}
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="nav_button" id="nav_toggle">
            <button>
              <a href="https://github.com/unawarexi">More Projects </a>{" "}
            </button>
          </div>
        </div>
      </div>

      {/* {=============================== the body contents ================================} */}

      <header>
        <motion.div {...Animation} className=" container header_container">
          <motion.h5 className="">Hello I'm</motion.h5>

          <h1 className="">Andrew J Chukwuweike</h1>
          <h6 className=" sec_h5 text-light">
            {" "}
            FullStack Developer (Web and Mobile applications)
          </h6>
          <Cta />
          <Headersocials />

          <div className="me">
            <img
              src={ME}
              alt="me"
              className="animate__animated animate__bounceIn"
            />
          </div>

          <a href="#Contact" className="scroll__down">
            {" "}
            Scroll Down
          </a>
        </motion.div>
      </header>
    </>
  );
};

export default Header;
