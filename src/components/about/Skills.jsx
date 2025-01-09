import React, { useState, useEffect } from "react";
import Images from "../../constants/ImageStrings";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import useResponsive from "../../Hooks/useResponsive";

const skillSets = [
  {
    category: "Languages",
    skills: [
      { name: "Python", icon: Images.pythonImg },
      { name: "JavaScript", icon: Images.jsImg },
      { name: "TypeScript", icon: Images.TsImg },
      { name: "Dart", icon: Images.dartImg },
      { name: "Solidity", icon: Images.solidityImg },
    ],
  },
  {
    category: "Libraries and Frameworks",
    skills: [
      { name: "React", icon: Images.reactImg },
      { name: "Node.js", icon: Images.nodeImg },
      { name: "Django", icon: Images.djangoImg },
      { name: "Express.js", icon: Images.expressImg },
      { name: "React Native", icon: Images.reactNativeImg },
      { name: "Flutter", icon: Images.flutterImg },
      { name: "Ether.js", icon: Images.etherImg },
      { name: "Web3.js", icon: Images.web3Img },
      { name: "Vyper", icon: <></> },
    ],
  },
  {
    category: "UI and Styling",
    skills: [
      { name: "Tailwind", icon: Images.tailwindImg },
      { name: "Css", icon: Images.cssImg },
      { name: "SCSS", icon: Images.sassImg },
      { name: "Bootstrap", icon: Images.bootstrapImg },
      { name: "Material UI", icon: Images.muiImg },
    ],
  },
  {
    category: "Databases",
    skills: [
      { name: "MongoDB", icon: Images.mongoImg },
      { name: "PostgreSQL", icon: Images.postgresImg },
      { name: "MySQL", icon: Images.mySQL },
      { name: "SQLite", icon: <></> },
    ],
  },
  {
    category: "SaaS Tools and Cloud",
    skills: [
      { name: "Firebase", icon: Images.firebaseImg },
      { name: "Clerk", icon: <></> },
      { name: "Supabase", icon: Images.supabaseImg },
      { name: "AWS", icon: Images.awsImG },
      { name: "Cloudinary", icon: <></> },
    ],
  },
  {
    category: "Development Tools",
    skills: [
      { name: "Docker", icon: Images.dockerImg },
      { name: "ChainLink", icon: Images.chainlinkImg },
      { name: "Hardhat", icon: Images.hardhatImg },
      { name: "Expo", icon: Images.expoImg },
      { name: "Git", icon: Images.gitImg },
      { name: "Github", icon: Images.githubImg },
      { name: "Postman", icon: Images.postmanImg },
      { name: "Redux", icon: Images.reduxImg },
    ],
  },
  {
    category: "Others",
    skills: [
      { name: "Linux OS", icon: Images.linuxImg },
      { name: "Mac OS", icon: Images.macOs },
      { name: "Windows", icon: Images.windows },
      { name: "IT Technician", icon: <></> },
    ],
  },
  {
    category: "Soft Qualities",
    skills: [
      { name: "Active Communication", icon: <></> },
      { name: "Attention to Detail", icon: <></> },
      { name: "Brainstorming Ideas", icon: <></> },
      { name: "Team Adaptability", icon: <></> },
      { name: "Project Documentation", icon: <></> },
    ],
  },
];

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
    <section className="text-gray-600 body-font">
      <div className="lg:container px-5 py-16 mx-auto">
        <div className="h-1 bg-gray-200 rounded overflow-hidden">
          <div className="w-24 h-full bg-indigo-500"></div>
        </div>
        <div className="flex flex-wrap sm:flex-row flex-col py-6 md:mb-12 mb-8">
          <h1 className="sm:w-2/5 text-gray-900 font-medium title-font text-2xl mb-2 sm:mb-0">
            Skills & Expertise
          </h1>
          <p className="sm:w-3/5 leading-relaxed text-sm md:text-base sm:pl-10 pl-0">
            A comprehensive overview of my technical proficiencies, spanning
            modern programming languages, frameworks, and tools. These skills
            empower me to build scalable, efficient, and user-centric solutions
            across diverse platforms and industries.
          </p>
        </div>
        {/* Category Tabs */}
        {isDesktop && (
          <div className="flex justify-center mb-8">
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
                className={`cursor-pointer mx-4 px-4 py-2 font-medium text-sm ${
                  currentCategory === index
                    ? "border-b-2 border-indigo-500 text-indigo-600 w-[70%]"
                    : "text-gray-500 hover:text-indigo-600"
                }`}
              >
                {category.category}
              </div>
            ))}
          </div>
        )}

        {/* Slider Controls */}
        <div className="relative">
          <button
            onClick={handlePrev}
            className="absolute top-1/2 transform -translate-y-1/2 z-10 left-0 p-2 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600"
          >
            <FaChevronLeft size={24} />
          </button>
          <button
            onClick={handleNext}
            className="absolute top-1/2 transform -translate-y-1/2 z-10 right-0 p-2 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600"
          >
            <FaChevronRight size={24} />
          </button>

          {/* Carousel Slider */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCategory}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap sm:mx-auto sm:mb-2 -mx-2 "
            >
              {skillSets[currentCategory].skills.map((skill, index) => (
                <div key={index} className="container  lg:w-1/4 md:w-1/2 p-2 items-center justify-center">
                  <motion.div
                    className=" bg-[#1b2a5b53]  shadow-md  shadow-blue-300 backdrop-blur-lg p-4 rounded-lg flex flex-col items-center justify-center h-full"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img
                      src={skill.icon}
                      alt={`${skill.name} icon`}
                      className="w-12 h-12 mb-4"
                    />
                    <span className="text-lg font-medium text-gray-800">
                      {skill.name}
                    </span>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Category Indicator */}
          <div className="flex justify-center mt-8">
            {skillSets.map((category, index) => (
              <span
                key={index}
                onClick={() => setCurrentCategory(index)}
                className={`h-2 w-10 mx-1 rounded-full cursor-pointer ${
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
