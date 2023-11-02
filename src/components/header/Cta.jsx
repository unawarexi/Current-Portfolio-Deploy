import React from 'react';
import CV from "../../assets/justice-andrew-chukwuweike.pdf"

const Cta = () => {
  return (
    <div className="cta">
        <a href={CV} download className='btn'>Downlaod CV</a>
        <a href="#Contact" className='btn btn-primary'>Lets Talk</a>
    </div>
  )
}

export default Cta