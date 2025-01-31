import React,  { useState, useEffect }  from 'react';
import { motion } from "framer-motion";
import Images from '../../constants/ImageStrings';
import { FaCheckCircle } from 'react-icons/fa';
import useResponsive from '../../Hooks/useResponsive';

// Metrics data stored in a JSON array
const metricsData = [
  {
    title: 'Code Quality',
    items: [
      '98% code test coverage',
      'Fewer than 2% bugs reported post-release',
      'Code reviews with 100% adherence to standards',
    ],
  },
  {
    title: 'Feature Delivery Speed',
    items: [
      '3-5 new features shipped monthly',
      '2-day average turnaround for hotfixes',
      '100% on-time project delivery',
    ],
  },
  {
    title: 'User Engagement',
    items: [
      '75% of users engage with new features within 2 weeks',
      '80% of feedback implemented in product improvements',
      '90% user retention rate over 6 months',
    ],
  },
  {
    title: 'Full-Stack Proficiency',
    items: [
      'Mastery in React, Node.js, and databases',
      '95% hands-on experience with cloud services (AWS, Azure)',
      'Delivered over 20 full-stack applications',
    ],
  },
  {
    title: 'Frontend Expertise',
    items: [
      'Responsive UI with 95% cross-browser compatibility',
      'Optimized performance, achieving 90+ scores in Lighthouse audits',
      'Built over 30 dynamic, interactive web apps',
    ],
  },
  {
    title: 'Mobile App Development',
    items: [
      'Deployed over 10 apps to the App Store and Google Play',
      'Achieved 98% crash-free sessions',
      '5-star ratings on 90% of app reviews',
    ],
  },
];

const Metrics = () => {
  const { isMobile, isTablet, isDesktop } = useResponsive();
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoSlideInterval = 5000; // 5 seconds interval for auto-slide

  // Auto-slide functionality for mobile only
  useEffect(() => {
    if (isMobile) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === metricsData.length - 1 ? 0 : prevIndex + 1
        );
      }, autoSlideInterval);

      return () => clearInterval(interval); // Cleanup interval on unmount
    }
  }, [isMobile]);

  // Function to handle manual swipe
  const handleSwipe = (direction) => {
    if (direction === "left") {
      setCurrentIndex((prevIndex) =>
        prevIndex === metricsData.length - 1 ? 0 : prevIndex + 1
      );
    } else if (direction === "right") {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? metricsData.length - 1 : prevIndex - 1
      );
    }
  };

  return (
    <section className="relative">
      {/* Background Image */}
      {/* <div className="absolute inset-0 bg-black opacity-60"></div>
      <img
        src={Images.expertiseBG}
        alt="Background"
        className="w-full h-full object-cover absolute inset-0"
      /> */}

<div className="absolute inset-0 z-0">
        <img 
          src={Images.expertiseBG} 
          alt="background" 
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      {/* Glassmorphism Cards */}
      <div className="relative z-10 px-4 py-16 font-[sans-serif] max-w-7xl mx-auto">
        <h1 className="text-indigo-700 md:text-4xl text-2xl sm:text-5xl font-bold md:mb-16 mb-10 text-center">
          Developer Performance & Expertise Metrics
        </h1>

        {/* For Desktop or Tablet */}
        {(isDesktop || isTablet) && (
          <div className="container  mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {metricsData.map((metric, index) => (
              <div
                key={index}
                className="bg-white hover:bg-indigo-500 hover:bg-opacity-10 bg-opacity-10 backdrop-blur-lg hover:border-indigo-500 hover:border-4 border border-white border-opacity-20 rounded-2xl p-8 shadow-lg transform transition-all hover:scale-105"
              >
                <h3 className="text-white text-2xl font-bold mb-4">
                  {metric.title}
                </h3>
                <ul className="space-y-2">
                  {metric.items.map((item, i) => (
                    <li key={i} className="flex items-center text-white text-base">
                      <FaCheckCircle className="text-blue-500 mr-2" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* For Mobile - Add sliding functionality */}
        {isMobile && (
          <>
            <motion.div
              className="grid"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(event, info) => {
                if (info.offset.x < -100) {
                  handleSwipe("left");
                } else if (info.offset.x > 100) {
                  handleSwipe("right");
                }
              }}
            >
              {/* Sliding through metricsData */}
              {metricsData.map((metric, index) => (
                <motion.div
                  key={index}
                  className={`bg-white hover:bg-indigo-500 hover:bg-opacity-10 bg-opacity-10 backdrop-blur-lg hover:border-indigo-500 hover:border-4 border border-white border-opacity-20 rounded-2xl p-8 shadow-lg transform transition-all ${
                    index === currentIndex ? "block" : "hidden"
                  }`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: index === currentIndex ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-white text-2xl font-bold mb-4">
                    {metric.title}
                  </h3>
                  <ul className="space-y-2">
                    {metric.items.map((item, i) => (
                      <li key={i} className="flex items-center text-white text-base">
                        <FaCheckCircle className="text-blue-500 mr-2" /> {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>

            {/* Indicator for mobile */}
            <div className="flex justify-center mt-8">
              {metricsData.map((_, index) => (
                <div
                  key={index}
                  className={`w-5 h-1 mx-1 rounded-full ${
                    index === currentIndex ? "bg-blue-300" : "bg-gray-400"
                  }`}
                ></div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Metrics;