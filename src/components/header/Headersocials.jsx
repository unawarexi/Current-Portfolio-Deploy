import React from 'react'
import {BsLinkedin} from 'react-icons/bs'
import { FaGithub } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';

const Headersocials = () => {
  return (
    <div className="header__socials">
        <a href="https://linkedin.com" target = "blank"><BsLinkedin /></a>
        <a href="https://github.com" target = "blank"><FaGithub /></a>
        <a href="https://x.com" target = "blank"><FaTwitter /></a>
    </div>
  )
}

export default Headersocials