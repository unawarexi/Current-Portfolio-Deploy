import React, { useState } from "react";
import useResponsive from "../../Hooks/useResponsive";
import Images from "../../constants/ImageStrings";

const experienceData = {
  "Web Development": {
    description:
      "Experience in building scalable and responsive web applications.",
    subcategories: {
      Frontend: [
        {
          company: "ABC Corp",
          role: "Frontend Developer",
          year: "2021 - 2023",
          description:
            "Worked on building user-friendly and responsive web pages using React and modern web technologies.",
          skills: ["HTML", "CSS", "JavaScript", "React", "Tailwind"],
        },
        {
          company: "XYZ Ltd",
          role: "Frontend Developer",
          year: "2019 - 2021",
          description:
            "Developed and maintained responsive web apps and ensured the best UI/UX for users.",
          skills: ["HTML", "CSS", "Vue.js", "JavaScript", "Bootstrap"],
        },
      ],
      Fullstack: [
        {
          company: "Tech Solutions",
          role: "Fullstack Developer",
          year: "2022 - Present",
          description:
            "Developing both frontend and backend applications using Node.js, React, and MongoDB.",
          skills: ["React", "Node.js", "Express.js", "MongoDB", "GraphQL"],
        },
      ],
      Backend: [
        {
          company: "Innovatech",
          role: "Backend Developer",
          year: "2020 - 2022",
          description:
            "Building APIs and managing server-side logic with Node.js and Express.",
          skills: ["Node.js", "Express.js", "MongoDB", "PostgreSQL"],
        },
      ],
    },
  },
  "Mobile Development": {
    description:
      "Experience in developing mobile applications for both iOS and Android platforms.",
    subcategories: {
      Frontend: [
        {
          company: "AppDev Studio",
          role: "Mobile Frontend Developer",
          year: "2021 - 2023",
          description:
            "Developed UI components for iOS and Android using React Native.",
          skills: ["React Native", "JavaScript", "Redux", "Firebase"],
        },
      ],
      Fullstack: [
        {
          company: "MobileTech Inc.",
          role: "Mobile Fullstack Developer",
          year: "2022 - Present",
          description:
            "Worked on both frontend and backend for mobile apps using React Native and Firebase.",
          skills: ["React Native", "Node.js", "Express", "MongoDB"],
        },
      ],
      Backend: [
        {
          company: "SmartMobile",
          role: "Mobile Backend Developer",
          year: "2020 - 2022",
          description:
            "Developed mobile app backend services and APIs using Node.js and Firebase.",
          skills: ["Node.js", "Firebase", "MongoDB", "Express"],
        },
      ],
    },
  },
  "Blockchain Development": {
    description:
      "Building decentralized applications and smart contracts on blockchain platforms.",
    subcategories: {
      "Smart Contract Developer": [
        {
          company: "Blockchain Labs",
          role: "Smart Contract Developer",
          year: "2021 - Present",
          description:
            "Developed and deployed smart contracts on Ethereum using Solidity and Truffle.",
          skills: ["Solidity", "Ethereum", "Truffle", "Hardhat", "Web3.js"],
        },
      ],
      "dApp Developer": [
        {
          company: "Decentralized Solutions",
          role: "dApp Developer",
          year: "2022 - Present",
          description:
            "Developed decentralized applications with React and integrated them with blockchain.",
          skills: ["React", "Web3.js", "IPFS", "Ethereum", "Metamask"],
        },
      ],
    },
  },
  Others: {
    description:
      "Other roles and responsibilities including IT Technician, Networking, and Project Management.",
    subcategories: {
      "IT Technician": [
        {
          company: "Tech Support Ltd.",
          role: "IT Technician",
          year: "2018 - 2020",
          description:
            "Responsible for troubleshooting hardware and software issues and maintaining IT infrastructure.",
          skills: ["Windows", "Linux", "Networking", "System Administration"],
        },
      ],
      Networking: [
        {
          company: "NetConnect Inc.",
          role: "Network Engineer",
          year: "2020 - Present",
          description:
            "Set up, managed, and troubleshooted networking systems including routers and switches.",
          skills: ["TCP/IP", "Routing", "Switching", "Firewall", "VPN"],
        },
      ],
      "Project Lead": [
        {
          company: "Project Masters",
          role: "Project Lead",
          year: "2021 - Present",
          description:
            "Leading cross-functional teams to deliver complex projects on time and within budget.",
          skills: [
            "Agile",
            "Scrum",
            "Project Management",
            "Leadership",
            "Team Collaboration",
          ],
        },
      ],
    },
  },
};

const Experience = () => {
  const [activeCategory, setActiveCategory] = useState("Web Development");
  const [activeSubcategory, setActiveSubcategory] = useState("Frontend");

  const { isMobile, isTablet, isDesktop } = useResponsive();

  return (
    <section className="text-gray-600 body-font shadow-slate-400 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.1)] rounded-tr-3xl rounded-tl-3xl">
      <div className="container px-5 py-10 mx-auto h-[auto]">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-center mb-10 mt-10 ">
          {/* Text Section (60%) */}
          <div className="md:w-3/5 w-full text-center   ">
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4">
              My Work Experience
            </h1>
            <p className="md:text-base text-[10px] leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto ">
              A detailed overview of my professional experience in various domains
              of software development and IT.
            </p>
          </div>
          {/* Image Section (40%) */}
          <div className="md:w-[30%] w-full mt-6 md:mt-0  flex justify-center ">
            <img
              src={Images.aboutImage2}
              alt="Experience Illustration"
              className="rounded-lg object-contain"
            />
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="md:flex grid md:justify-center justify-start mb-8">
          {Object.keys(experienceData).map((category) => (
            <div
              key={category}
              className={`md:px-6 px-4 py-3 cursor-pointer lg:text-lg md:text-sm text-[10px]  font-medium ${
                activeCategory === category
                  ? "text-indigo-500 border-b-4 border-indigo-500"
                  : "text-gray-600 hover:text-indigo-500"
              }`}
              onClick={() => {
                setActiveCategory(category);
                setActiveSubcategory(
                  Object.keys(experienceData[category].subcategories)[0]
                );
              }}
            >
              {category}
            </div>
          ))}
        </div>

        {/* Subcategory Navigation */}
        <div className="flex md:justify-center justify-start mb-8">
          {Object.keys(experienceData[activeCategory].subcategories).map(
            (subcategory) => (
              <div
                key={subcategory}
                className={`md:px-6 px-3 py-3 cursor-pointer md:text-lg text-[13px] mx-auto md:mx-0 font-medium ${
                  activeSubcategory === subcategory
                    ? "dark:text-indigo-300 text-indigo-600 md:border-b-4 border-b-2 border-indigo-500"
                    : "text-gray-600 hover:text-indigo-500"
                }`}
                onClick={() => setActiveSubcategory(subcategory)}
              >
                {subcategory}
              </div>
            )
          )}
        </div>

        {/* Dynamic Content for Active Subcategory */}
        <section className="text-gray-600  body-font">
          <div className="container px-5 py-10 mx-auto flex flex-wrap">
            {experienceData[activeCategory].subcategories[
              activeSubcategory
            ].map((job, index) => (
              <div
                key={index}
                className="flex relative pb-10  sm:items-center md:-ml-10 lg:mx-auto  lg:w-2/3 md:w-2/3 mx-auto "
              >
                <div className="h-full md:w-6 w-2 absolute inset-0 flex items-center justify-center">
                  <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                </div>

                {/* ---------- number ----------------- */}
                <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 -ml-2 md:-ml-0   sm:mt-0 inline-flex items-center justify-center bg-indigo-500 text-white relative z-10 title-font font-medium text-sm">
                  {index + 1}
                </div>

                {/* --------- for icons   ------------- */}
                <div className="flex-grow md:pl-8 pl-2 flex sm:items-center items-start flex-col sm:flex-row">
                  <div className="flex-shrink-0 md:w-24 md:h-24 w-14 h-14 dark:bg-black/30 shadow-md dark:shadow-indigo-300 bg-indigo-100 text-indigo-500 rounded-full inline-flex items-center justify-center">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      className="w-12 h-12"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                  </div>
                  <div className="flex-grow pl-2 md:pl-6 md:mt-6 mt-2 sm:mt-0 dark:bg-black/30 md:mx-4 p-2 shadow-lg shadow-blue-300 bg-blue-50 md:p-10 rounded-lg">
                    {/* <!-- Role and Company --> */}
                    {isMobile ? (
                      <>
                        {" "}
                        <h2 className="font-medium title-font text-gray-900 mb-1 text-sm md:text-xl">
                          {job.role} at <br /> <span className="text-indigo-300 font-bold">{job.company}</span>
                        </h2>
                      </>
                    ) : (
                      <>
                        {" "}
                        <h2 className="font-medium title-font text-gray-900 mb-1 text-lg md:text-xl">
                          {job.role} at <span>{job.company}</span>
                        </h2>
                      </>
                    )}

                    {/* <!-- Description --> */}
                    <p className="leading-relaxed text-[10px] md:text-sm lg:text-base">
                      {job.description}
                    </p>

                    {/* <!-- Year --> */}
                    <p className="text-gray-500 text-[10px] mt-2 md:text-base">
                      {job.year}
                    </p>

                    {/* <!-- Skills Section --> */}
                    <div className="flex flex-col w-full sm:flex-row items-start sm:items-center md:mt-2 mt-4 space-y-2 sm:space-y-0">
                     {!isMobile &&  <p className="mx-2 ">Skills:</p>}

                      {/* <!-- Skills list on smaller screens wraps, but stays inline on larger screens --> */}
                      <div className="  w-full grid grid-cols-3 md:flex justify-center items-center gap-2 md:gap-0 text-center md:flex-nowrap space-x-1 space-y-2 md:space-y-0 sm:space-x-4 text-blue-700 ">
                        {job.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="bg-blue-200 md:px-4 w-full px-1 py-2 rounded-full md:text-xs text-[7px]"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
};

export default Experience;
