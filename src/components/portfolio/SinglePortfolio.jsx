import React, { useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const SinglePortfolio = () => {
  const location = useLocation();
  const { project } = location.state || {};
  
  // Refs for GSAP animations
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const galleryRef = useRef(null);
  const contentRef = useRef(null);
  const infoRef = useRef(null);
  
  // Gallery images (would be dynamic in real implementation)
  const galleryImages = project?.gallery || [
    { id: 1, url: project?.img, alt: 'Gallery Image 1' },
    { id: 2, url: project?.img, alt: 'Gallery Image 2' },
    { id: 3, url: project?.img, alt: 'Gallery Image 3' },
    { id: 4, url: project?.img, alt: 'Gallery Image 4' },
    { id: 5, url: project?.img, alt: 'Gallery Image 5' },
    { id: 6, url: project?.img, alt: 'Gallery Image 6' },
    { id: 7, url: project?.img, alt: 'Gallery Image 7' },
    { id: 8, url: project?.img, alt: 'Gallery Image 8' },
    { id: 9, url: project?.img, alt: 'Gallery Image 9' },
    { id: 10, url: project?.img, alt: 'Gallery Image 10' },
  ];

  // Project details (would be dynamic in real implementation)
  const projectDetails = {
    client: project?.client || 'Client Name',
    duration: project?.duration || '3 months',
    role: project?.role || 'Lead Developer',
    team: project?.team || ['Frontend Developer', 'UI/UX Designer', 'Backend Developer'],
    challenges: project?.challenges || 'This project presented several challenges including responsive design implementation across multiple devices, optimizing performance for image-heavy content, and integrating with external APIs for dynamic content delivery.',
    solution: project?.solution || 'I implemented a modular component structure with lazy loading for better performance. Used advanced CSS techniques for responsive layouts, and developed a custom caching system for API responses.',
    results: project?.results || 'The final product achieved a 40% improvement in page load times, increased user engagement by 25%, and received positive feedback from both the client and end-users.',
  };

  useEffect(() => {
    if (!project) return;

    // Hero section animation
    gsap.fromTo(
      heroRef.current,
      { opacity: 0, scale: 1.1 },
      { 
        opacity: 1, 
        scale: 1, 
        duration: 1.2, 
        ease: "power3.out" 
      }
    );

    // Title animation
    gsap.fromTo(
      titleRef.current,
      { y: 100, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1, 
        delay: 0.5, 
        ease: "back.out(1.7)" 
      }
    );

    // Gallery images staggered animation
    gsap.fromTo(
      ".gallery-item",
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        stagger: 0.1, 
        duration: 0.8, 
        ease: "power2.out",
        scrollTrigger: {
          trigger: galleryRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none none"
        }
      }
    );

    // Content sections animation
    gsap.fromTo(
      ".content-section",
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        stagger: 0.2, 
        duration: 0.8, 
        ease: "power2.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top bottom-=50",
          toggleActions: "play none none none"
        }
      }
    );

    // Project info items animation
    gsap.fromTo(
      ".info-item",
      { opacity: 0, x: -30 },
      { 
        opacity: 1, 
        x: 0, 
        stagger: 0.1, 
        duration: 0.6, 
        ease: "power1.out",
        scrollTrigger: {
          trigger: infoRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none none"
        }
      }
    );

  }, [project]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Project Not Found</h2>
          <p className="text-gray-600 mb-6">The project you're looking for doesn't exist or has been removed.</p>
          <Link to="/portfolio" className="text-white bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-md transition-colors duration-300">
            Return to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 overflow-hidden">
      {/* Hero Section */}
      <div 
        ref={heroRef}
        className="relative w-full h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${project.img})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30 flex items-center justify-center">
          <div className="text-center max-w-4xl px-6">
            <span className="inline-block px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-full mb-6 transform transition-transform hover:scale-105">
              {project.category}
            </span>
            <h1 
              ref={titleRef}
              className="text-white text-5xl md:text-7xl font-bold leading-tight mb-6"
            >
              {project.title}
            </h1>
            <p className="text-gray-200 text-xl mb-10 max-w-2xl mx-auto">
              {project.subtitle || 'An innovative solution designed to solve real-world problems'}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={project.liveLink}
                className="text-white bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-md transition-all duration-300 transform hover:scale-105 inline-flex items-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>View Live Project</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                </svg>
              </a>
              {project.repoLink && (
                <a
                  href={project.repoLink}
                  className="text-gray-800 bg-white hover:bg-gray-100 px-8 py-4 rounded-md transition-all duration-300 transform hover:scale-105 inline-flex items-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>View Code</span>
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <span className="text-white text-sm mb-2">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-1">
            <div className="w-1 h-2 bg-white rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div ref={galleryRef} className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-10 text-center">Project Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {galleryImages.map((image, index) => (
            <div 
              key={image.id} 
              className={`gallery-item overflow-hidden rounded-lg ${index < 5 ? 'h-48' : 'h-48'}`}
            >
              <img 
                src={image.url} 
                alt={image.alt} 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
              />
            </div>
          ))}
        </div>
      </div>

      {/* Project Details Section */}
      <div ref={contentRef} className="container mx-auto px-4 py-16">
        {/* Project Info Cards */}
        <div ref={infoRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="info-item bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold mb-3 text-blue-600">Client & Duration</h3>
            <p className="mb-2"><span className="font-medium">Client:</span> {projectDetails.client}</p>
            <p><span className="font-medium">Timeline:</span> {projectDetails.duration}</p>
          </div>
          <div className="info-item bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold mb-3 text-blue-600">Role & Responsibilities</h3>
            <p className="mb-2"><span className="font-medium">Role:</span> {projectDetails.role}</p>
            <ul className="list-disc list-inside">
              {projectDetails.team.map((member, index) => (
                <li key={index}>{member}</li>
              ))}
            </ul>
          </div>
          <div className="info-item bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold mb-3 text-blue-600">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.category.split(', ').map((tech, index) => (
                <span key={index} className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm">
                  {tech.trim()}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* About the Project */}
        <div className="content-section mb-16">
          <h2 className="text-3xl font-bold mb-6">About the Project</h2>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="mb-6">{project.desc}</p>
          </div>
        </div>

        {/* Challenges and Solutions */}
        <div className="content-section mb-16">
          <h2 className="text-3xl font-bold mb-6">Challenges & Solutions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Challenges</h3>
              <p>{projectDetails.challenges}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Solutions</h3>
              <p>{projectDetails.solution}</p>
            </div>
          </div>
        </div>

        {/* Results & Outcome */}
        <div className="content-section mb-16">
          <h2 className="text-3xl font-bold mb-6">Results & Impact</h2>
          <p>{projectDetails.results}</p>
        </div>

        {/* Key Features */}
        <div className="content-section mb-16">
          <h2 className="text-3xl font-bold mb-6">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-md">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Feature {item}</h3>
                <p>A key feature description would go here explaining what makes this project unique and valuable.</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial */}
        <div className="content-section mb-16 bg-blue-600 text-white p-8 rounded-xl">
          <div className="max-w-3xl mx-auto text-center">
            <svg className="w-12 h-12 text-white opacity-50 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <p className="text-xl mb-6">"{project.testimonial || 'Working with this developer was an excellent experience. The project was delivered on time and exceeded our expectations in terms of quality and performance.'}"</p>
            <p className="font-semibold">{project.clientName || 'Client Name'} - {project.clientRole || 'Project Manager'}</p>
          </div>
        </div>

        {/* Related Projects */}
        <div className="content-section">
          <h2 className="text-3xl font-bold mb-6">Related Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="group relative overflow-hidden rounded-xl">
                <img 
                  src={project.img} 
                  alt={`Related Project ${item}`} 
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">Related Project {item}</h3>
                    <p className="text-gray-300 mb-4">Brief description of a similar project</p>
                    <Link to="/portfolio" className="text-blue-400 hover:text-white transition-colors duration-300 inline-flex items-center">
                      <span>View Project</span>
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gray-100 dark:bg-gray-800 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Interested in working together?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Let's discuss how we can collaborate on your next project and create something amazing together.</p>
          <Link 
            to="/contact" 
            className="text-white bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-md transition-all duration-300 transform hover:scale-105 inline-flex items-center"
          >
            <span>Get in Touch</span>
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SinglePortfolio;