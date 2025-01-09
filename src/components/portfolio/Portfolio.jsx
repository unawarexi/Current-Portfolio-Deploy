import React from "react";

// Array of project data
const projects = [
  {
    title: "Django Ecommerce",
    description:
      "Full-stack ecommerce solution with mail systems, authentication, and real-time updates.",
    image:
      "https://cdn.dribbble.com/userupload/10640469/file/still-a721a0ced00c365bd926e72a593adb1d.png",
    video:
      "https://cdn.dribbble.com/userupload/10640472/file/original-c81c56245856e105c75424cf9a958366.mp4",
  },
  {
    title: "Flutter Ecommerce",
    description:
      "Mobile application for ecommerce with real-time updates and state management.",
    image:
      "https://cdn.dribbble.com/userupload/17919100/file/original-4040769ee756ae0a166b1cedb84e9567.jpg",
    video:
      "https://cdn.dribbble.com/userupload/15548212/file/original-cb32eaa4d4ee5bfdeef33dd32790898e.mp4",
  },
  {
    title: "Flutter Real-time Workspace",
    description:
      "A collaborative workspace with real-time updates and notifications built using Flutter.",
    image:
      "https://cdn.dribbble.com/userupload/5800651/file/original-9b33b3725e6991c2ef6c2e2a9632c340.png",
    video:
      "https://cdn.dribbble.com/userupload/16834573/file/original-088532f01707c89a2774eae15f4242bf.mp4",
  },
  {
    title: "MERN Stack Remittance System",
    description:
      "A complete remittance system built with the MERN stack, featuring authentication and real-time updates.",
    image:
      "https://cdn.dribbble.com/userupload/14449293/file/original-f555f9bcaf89e3376eb8a7a2182f0eec.jpg",
    video:
      "https://cdn.dribbble.com/userupload/16297357/file/original-34e5474801bc2d9f38638fb21a95e162.mp4",
  },
  {
    title: "React Native Food Delivery",
    description:
      "Cross-platform food delivery app with real-time order tracking and state management.",
    image:
      "https://cdn.dribbble.com/userupload/17456178/file/original-25b698d7e80ef1f3cabfe0bc5f276c43.png",
    video:
      "https://cdn.dribbble.com/users/890912/screenshots/17912156/media/1918d9f71c7a937ecea3c4495c9da89a.mp4",
  },
  {
    title: "Python scripts, Virus and Packet Sniffers",
    description:
      "Mailing system with authentication, real-time notifications, and state management using modern web technologies.",
    image:
      "https://cdn.dribbble.com/users/458522/screenshots/17526524/media/744f6793a6f76cacffae4720a0fb64be.png",
    video:
      "https://cdn.dribbble.com/userupload/10293344/file/original-94eaa164ccebdbd25aed56710dd14ebd.mp4",
  },
];

const Portfolio = () => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col">
          <div className="h-1 bg-gray-200 rounded overflow-hidden">
            <div className="w-24 h-full bg-indigo-500"></div>
          </div>
          <div className="flex flex-wrap sm:flex-row flex-col py-6 mb-12">
            <h1 className="sm:w-2/5 text-gray-900 font-medium title-font md:text-2xl text-xl mb-2 sm:mb-0">
              Portfolio Projects
            </h1>
            <p className="sm:w-3/5 leading-relaxed text-sm sm:pl-10 pl-0 md-text-base text-[12px]"> 
              Dive into a portfolio of my recent projects, demonstrating
              expertise in full-stack development. These works encompass
              seamless front-end interfaces, efficient back-end architecture,
              secure authentication, database management, real-time data
              handling, API integrations, and comprehensive state management.
              Each project showcases my focus on building scalable, responsive,
              and performance-driven solutions.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
          {projects.map((project, index) => (
            <div key={index} className="p-4 lg:w-1/3 md:w-1/2 sm:mb-0 mb-6">
              <div className="rounded-lg h-64 overflow-hidden">
                {/* Video autoplay from the web */}
                <video
                  className="object-cover object-center h-full w-full"
                  src={project.video} // Add your video URL here
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  {/* Fallback for browsers that don't support video autoplay */}
                  <img
                    alt={project.title}
                    className="object-cover object-center h-full w-full"
                    src={project.image}
                  />
                </video>
              </div>

              <h2 className="md:text-xl text-lg font-medium title-font text-gray-900 mt-5">
                {project.title}
              </h2>
              <p className="md:text-base text-[13px] leading-relaxed mt-2">
                {project.description}
              </p>
              <a className="text-indigo-500 inline-flex items-center mt-3">
                Learn More
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 ml-2"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
