import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiExternalLink, FiPlus } from 'react-icons/fi';
import PortfolioNav from '../nav/PortfolioNav';
import projects from '../../data/PortfolioData'; // Import your project data

const PortfolioOverview = () => {
  const navigate = useNavigate();

  const handleCaseStudyClick = (project) => {
    navigate(`/projects/${project.title.replace(/\s+/g, '-').toLowerCase()}`, { state: { project: { ...project, video: project.video } } });
  };

  const renderProjectCard = (project, index) => (
    <div key={index} className="lg:w-1/4 md:w-1/2 p-4 w-full">
      <div className="block relative h-48 rounded overflow-hidden">
        {project.video ? (
          <video
            className="object-cover object-center w-full h-full block"
            src={project.video}
            autoPlay
            loop
            muted
            playsInline
          >
            <img
              alt={project.title}
              className="object-cover object-center w-full h-full block"
              src={project.image}
            />
          </video>
        ) : (
          <img
            alt={project.title}
            className="object-cover object-center w-full h-full block"
            src={project.image}
          />
        )}
      </div>
      <div className="mt-4">
        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
          {project.category || "Development"}
        </h3>
        <h2 className="text-gray-900 title-font md:text-lg text-sm font-medium">{project.title}</h2>
        <p className="mt-1 md:text-md text-xs">{project.description}</p>
        <div className="mt-4 flex space-x-8">
          <button
            onClick={() => handleCaseStudyClick(project)}
            className="text-white bg-indigo-600 md:text-sm text-xs px-4 py-2 rounded-md inline-flex items-center"
          >
            Case Study
          </button>
          <a
            href={project.liveLink || "#"}
            className="text-indigo-600 md:text-base text-sm inline-flex items-center hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FiExternalLink className="mr-1" />
            Live Preview
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <><PortfolioNav /></>
        <div className="flex flex-wrap -m-4">
          {projects.map((project, index) => renderProjectCard(project, index))}
        </div>
      </div>
      {/* Floating Action Button */}
      <button
        onClick={() => navigate('/auth/new')}
        className="fixed bottom-[25%] lg:right-20 right-6 bg-indigo-600 text-white rounded-full w-14 h-14 md:w-16 md:h-16 flex items-center justify-center shadow-lg hover:bg-indigo-700"
      >
        <FiPlus size={24} className="md:text-2xl" />
      </button>
    </section>
  );
};

export default PortfolioOverview;