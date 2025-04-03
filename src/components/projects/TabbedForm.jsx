import React, { useState } from 'react';
import ProjectForm from './form_components/ProjectForm';
import ImageUploads from './upload_cloudinary/ImageUploads';
import { toast } from 'react-toastify';
import Images from '../../constants/ImageStrings';

const TabbedForm = () => {
  const [activeTab, setActiveTab] = useState('projectInfo');

  const handleImageSubmit = async (imageData) => {
    try {
      console.log('Submitting image data to Cloudinary:', imageData);
      // Add Cloudinary upload logic here
      toast.success('Images uploaded successfully!');
    } catch (error) {
      console.error('Error uploading images:', error);
      toast.error('Failed to upload images');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
          <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
            <img
              className="object-cover object-center rounded"
              alt="hero"
              src={Images.aboutImage2}
            />
          </div>
          <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              Create Your Dev Portfolio
              <br className="hidden lg:inline-block" />
              Showcase Your Projects
            </h1>
            <p className="mb-8 leading-relaxed">
              Fill out this form to add your development project to your portfolio. Include details about your skills, experience, and the technologies you used.
            </p>
          </div>
        </div>
      </section>
    <div className="container mx-auto p-6 shadow-lg rounded-lg">
      {/* Tab Navigation */}
      <div className="flex border-b mb-6">
      <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'imageUpload' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-600'
          }`}
          onClick={() => setActiveTab('imageUpload')}
        >
          Image Upload
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'projectInfo' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-600'
          }`}
          onClick={() => setActiveTab('projectInfo')}
        >
          Project Info
        </button>
       
      </div>

      {/* Tab Content */}
      <div>
      {activeTab === 'imageUpload' && <ImageUploads handleImageSubmit={handleImageSubmit} />}
        {activeTab === 'projectInfo' && <ProjectForm />}
       
      </div>
    </div>
    </div>
  );
};

export default TabbedForm;
