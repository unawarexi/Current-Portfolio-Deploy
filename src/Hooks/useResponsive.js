import { useState, useEffect } from 'react';

const useResponsive = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  const updateDevice = () => {
    if (window.matchMedia("(max-width: 767px)").matches) {
      setIsMobile(true);
      setIsTablet(false);
      setIsDesktop(false);
    } else if (window.matchMedia("(max-width: 1024px)").matches) {
      setIsMobile(false);
      setIsTablet(true);
      setIsDesktop(false);
    } else {
      setIsMobile(false);
      setIsTablet(false);
      setIsDesktop(true);
    }
  };

  useEffect(() => {
    updateDevice(); // Check device type on initial load

    // Listen for changes in the viewport width
    window.addEventListener('resize', updateDevice);

    // Clean up the event listener on unmount
    return () => window.removeEventListener('resize', updateDevice);
  }, []);

  return { isMobile, isTablet, isDesktop };
};

export default useResponsive;
