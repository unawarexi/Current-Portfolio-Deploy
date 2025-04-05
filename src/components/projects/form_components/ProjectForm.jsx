import React, { useState, useEffect } from 'react';
import ProjectDev from './ProjectDev';
import ProjectCategories from './ProjectCategories';
import ImageLinksUpload from './ImageLinksUpload';
import ProjectStack from './ProjectStack';
import { saveFormData } from '../../../firebase/FirebaseApi';
import { ToastContainer, toast } from 'react-toastify';
import { SubmitSpinner } from '../../../constants/Spinners';
import 'react-toastify/dist/ReactToastify.css';

const ProjectForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    github: '',
    linkedin: '',
    portfolio: '',
    skills: '',
    experience: '',
    email: '',
    phone: '',
    location: '',
    education: '',
    profilePicture: '',
    category: '',
    projectDescription: '',
    projectType: '',
    googlePlayLink: '',
    appStoreLink: '',
    webLiveLink: '',
    deepEnhancements: '',
    technologies: [],
    coverImageLinks: [],
    projectImageLinks: [],
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate form data
    if (!formData.name || !formData.email) {
      toast.error('Please fill in all required fields');
      setLoading(false);
      return;
    }

    try {
      console.log("Form data being submitted:", formData);

      // Call saveFormData to handle the form submission
      const docId = await saveFormData(formData);

      setLoading(false);
      toast.success('Project submitted successfully!', { autoClose: 2000 });
      console.log("Document saved with ID:", docId);

      // Reset form after successful submission
      setFormData({
        name: '',
        github: '',
        linkedin: '',
        portfolio: '',
        skills: '',
        experience: '',
        email: '',
        phone: '',
        location: '',
        education: '',
        profilePicture: '',
        category: '',
        projectDescription: '',
        projectType: '',
        googlePlayLink: '',
        appStoreLink: '',
        webLiveLink: '',
        deepEnhancements: '',
        technologies: [],
        coverImageLinks: [],
        projectImageLinks: [],
      });
    } catch (error) {
      console.error("Error in form submission:", error);
      setLoading(false);
      toast.error(`Failed to submit project: ${error.message || 'Unknown error'}`, { autoClose: 5000 });
    }
  };

  return (
    <div>
      <ToastContainer position="top-right" />
      <form
        onSubmit={handleSubmit}
        className="space-y-12 mx-auto lg:p-6 text-black container shadow-lg rounded-lg"
        style={{ width: '100%' }}
      >
        <div className="text-xs sm:text-sm">
          <ProjectDev formData={formData} handleChange={handleChange} />
          <ProjectCategories formData={formData} handleChange={handleChange} />
          <ImageLinksUpload formData={formData} handleChange={handleChange} />
          <ProjectStack formData={formData} handleChange={handleChange} />
        </div>

        <div className="flex justify-end mx-6 pb-6 gap-4 text-xs sm:text-sm">
          <button type="button" className="font-semibold text-gray-900 bg-gray-300 dark:bg-gray-700 rounded-md px-4 py-2 hover:bg-gray-400 dark:hover:bg-gray-600">
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-500 disabled:bg-indigo-400"
            disabled={loading}
          >
            {loading ? <SubmitSpinner /> : 'Save Project'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;