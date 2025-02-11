import React from 'react';
import { Link } from 'react-router-dom';
import { FiEye, FiExternalLink } from 'react-icons/fi';
import PortfolioNav from '../nav/PortfolioNav';

const PortfolioOverview = () => {
  const projects = [
    {
      id: 1,
      category: 'MERN Stack',
      title: 'The Catalyzer',
      desc: 'A dynamic MERN stack project',
      img: 'https://dummyimage.com/420x260',
      caseStudyLink: '/projects/1',
      liveLink: 'https://example.com',
    },
    {
      id: 2,
      category: 'Full Stack',
      title: 'Shooting Stars',
      desc: 'A full-stack app with modern technologies',
      img: 'https://dummyimage.com/421x261',
      caseStudyLink: '/projects/2',
      liveLink: 'https://example.com',
    },
    {
      id: 2,
      category: 'Full Stack',
      title: 'Shooting Stars',
      desc: 'A full-stack app with modern technologies',
      img: 'https://dummyimage.com/421x261',
      caseStudyLink: '/projects/2',
      liveLink: 'https://example.com',
    },
    {
      id: 2,
      category: 'Full Stack',
      title: 'Shooting Stars',
      desc: 'A full-stack app with modern technologies',
      img: 'https://dummyimage.com/421x261',
      caseStudyLink: '/projects/2',
      liveLink: 'https://example.com',
    },
    {
      id: 2,
      category: 'Full Stack',
      title: 'Shooting Stars',
      desc: 'A full-stack app with modern technologies',
      img: 'https://dummyimage.com/421x261',
      caseStudyLink: '/projects/2',
      liveLink: 'https://example.com',
    },
    // Add more projects here...
  ];

  const renderProjectCard = (project) => (
   
    <div key={project.id} className="lg:w-1/4 md:w-1/2 p-4 w-full">
      <a href={project.liveLink} className="block relative h-48 rounded overflow-hidden">
        <img
          alt={project.title}
          className="object-cover object-center w-full h-full block"
          src={project.img}
        />
      </a>
      <div className="mt-4">
        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{project.category}</h3>
        <h2 className="text-gray-900 title-font text-lg font-medium">{project.title}</h2>
        <p className="mt-1">{project.desc}</p>
        <div className="mt-4 flex space-x-4">
          <Link
            to={project.caseStudyLink}
            className="text-white bg-blue-600  text-sm px-2 py-2 rounded-md inline-flex items-center "
          >
        
            Case Study
          </Link>
          <a
            href={project.liveLink}
            className="text-indigo-600 inline-flex items-center hover:underline"
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
          {projects.map((project) => renderProjectCard(project))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioOverview;
