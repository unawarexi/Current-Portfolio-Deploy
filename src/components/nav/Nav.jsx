import React from "react";
import "./nav.css";
import {
  FaHome,
  FaInfoCircle,
  FaBriefcase,
  FaTools,
  FaEnvelope,
} from "react-icons/fa";
import { useState } from "react";
const nav = () => {
  const [activeNav, setActiveNav] = useState("#");
  return (
    <nav>
      <a
        href="#"
        onClick={() => setActiveNav("#")}
        className={activeNav === "#" ? "active" : ""}
      >
        <FaHome />
      </a>

      <a
        href="#About"
        onClick={() => setActiveNav("#About")}
        className={activeNav === "#About" ? "active" : ""}
      >
        <FaInfoCircle />
      </a>

      <a
        href="#Experience"
        onClick={() => setActiveNav("#Experience")}
        className={activeNav === "#Experience" ? "active" : ""}
      >
        <FaBriefcase />
      </a>

      <a
        href="#Services"
        onClick={() => setActiveNav("#Services")}
        className={activeNav === "#Services" ? "active" : ""}
      >
        <FaTools />
      </a>
      
      <a
        href="#Contact"
        onClick={() => setActiveNav("#Contact")}
        className={activeNav === "#Contact" ? "active" : ""}
      >
        <FaEnvelope />
      </a>
    </nav>
  );
};

export default nav;
