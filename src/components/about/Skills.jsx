import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import useResponsive from "../../Hooks/useResponsive";
import skillSets from "../../data/TechStacks";

const Skills = () => {
  const [currentCategory, setCurrentCategory] = useState(0);
  const { isMobile, isTablet, isDesktop } = useResponsive();

  // Auto-slide logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCategory(
        (prevCategory) => (prevCategory + 1) % skillSets.length // Auto-slide through categories
      );
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrentCategory(
      currentCategory === 0 ? skillSets.length - 1 : currentCategory - 1
    );
  };

  const handleNext = () => {
    setCurrentCategory(
      currentCategory === skillSets.length - 1 ? 0 : currentCategory + 1
    );
  };

  return (
    <section className="text-gray-600 body-font items-center justify-center">
      <div className="lg:container px-5 py-16 mx-auto lg:h-[800px] h-[900px] md:h-[1000px] lg:mt-20">
        <div className="h-1 bg-gray-200 rounded overflow-hidden">
          <div className="w-24 h-full bg-indigo-500"></div>
        </div>
        <div className="flex flex-wrap sm:flex-row flex-col py-6 md:mb-12 mb-8">
          <h1 className="sm:w-2/5 text-gray-900 font-medium title-font text-2xl mb-2 sm:mb-0">
            Skills & Expertise
          </h1>
          <p className="sm:w-3/5 leading-relaxed text-[10px] md:text-base sm:pl-10 pl-0">
            A comprehensive overview of my technical proficiencies, spanning
            modern programming languages, frameworks, and tools. These skills
            empower me to build scalable, efficient, and user-centric solutions
            across diverse platforms and industries.
          </p>
        </div>
        {/* Category Tabs */}
        {isDesktop && (
          <div className="flex flex-row justify-center mb-8">
            {skillSets.map((category, index) => (
              <div
                key={index}
                onClick={() => setCurrentCategory(index)}
                className={`cursor-pointer mx-4 px-4 py-2 font-medium text-sm  ${
                  currentCategory === index
                    ? "border-b-2 border-indigo-500 text-indigo-600"
                    : "text-gray-500 hover:text-indigo-600"
                }`}
              >
                {category.category}
              </div>
            ))}
          </div>
        )}
        {/* ------------- FOR MOBILE DEVICES AND TABS */}
        {(isMobile || isTablet) && (
          <div className="grid text-left mb-8">
            {skillSets.map((category, index) => (
              <div
                key={index}
                onClick={() => setCurrentCategory(index)}
                className={`cursor-pointer mx-4 px-4 py-2 font-medium md:text-sm text-[12px] ${
                  currentCategory === index
                    ? "border-b-2 border-indigo-500 text-indigo-600 w-[70%]"
                    : "text-gray-500 hover:text-blue-300"
                }`}
              >
                {category.category}
              </div>
            ))}
          </div>
        )}

        {/* Slider Controls */}
        <div className="relative">
          {isDesktop && (
            <>
              {" "}
              <button
                onClick={handlePrev}
                className="absolute top-1/2 transform -translate-y-1/2 z-10 left-0 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300 ease-in-out"
              >
                <FaChevronLeft size={20} />
              </button>
              <button
                onClick={handleNext}
                className="absolute top-1/2 transform -translate-y-1/2 z-10 right-0 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300 ease-in-out"
              >
                <FaChevronRight size={20} />
              </button>
            </>
          )}

          {/* Carousel Slider */}
          {isDesktop && (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentCategory}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className={`flex space-x-4 overflow-x-auto my-16 px-2 items-center justify-center`}
              >
                {skillSets[currentCategory].skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    className="bg-[#1b2a5b53] shadow-lg p-3 rounded-lg flex items-center space-x-3"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img
                      src={skill.icon}
                      alt={`${skill.name} icon`}
                      className="w-8 h-8"
                    />
                    <span className="text-sm font-medium text-gray-500">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}

          {(isTablet || isMobile) && (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentCategory}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className={`grid grid-cols-3 gap-4 my-10 px-2 items-center justify-center mx-auto`}
              >
                {skillSets[currentCategory].skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    className="bg-[#1b2a5b53] shadow-lg p-3 rounded-lg flex flex-col items-center justify-center space-y-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img
                      src={skill.icon}
                      alt={`${skill.name} icon`}
                      className="w-6 h-6"
                    />
                    <span className="md:text-sm text-[10px] text-center font-medium text-gray-500">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}

          {/* Category Indicator */}
          <div className="flex justify-center lg:mt-32 mt-10">
            {skillSets.map((category, index) => (
              <span
                key={index}
                onClick={() => setCurrentCategory(index)}
                className={`h-1 md:h-2 w-5 md:w-10 mx-1 rounded-full cursor-pointer ${
                  index === currentCategory ? "bg-indigo-600" : "bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
