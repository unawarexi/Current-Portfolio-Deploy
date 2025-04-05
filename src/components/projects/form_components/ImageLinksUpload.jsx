import React, { useState } from 'react';
import LinksModal from './LinksModal';
import { FaPlus, FaTrash } from 'react-icons/fa';

const ProjectImage_Upload = ({ formData, handleChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addNewLink = (type) => {
    const event = {
      target: {
        name: type,
        value: [...(formData[type] || []), ''],
      },
    };
    handleChange(event);
  };

  const updateLink = (type, index, value) => {
    const updatedLinks = [...formData[type]];
    updatedLinks[index] = value;
    const event = {
      target: {
        name: type,
        value: updatedLinks,
      },
    };
    handleChange(event);
  };

  const handleRemoveLink = (type, index) => {
    const updatedLinks = [...formData[type]];
    updatedLinks.splice(index, 1);
    const event = {
      target: {
        name: type,
        value: updatedLinks,
      },
    };
    handleChange(event);
  };

  return (
    <div
      className="my-4 py-6 p-6  rounded-lg shadow-md bg-white dark:bg-[#1a1a2e] border-2 border-gray-300 dark:border-gray-700"
      style={{ width: '100%' }}
    >
      <h2 className="text-md font-semibold text-indigo-600 dark:text-indigo-400 mb-6">Project Images</h2>

      {/* Cover image links */}
      <div className="mb-8">
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-4">Cover Image Links</h3>
        {formData.coverImageLinks && formData.coverImageLinks.map((link, index) => (
          <div key={index} className="flex items-center gap-4 mb-4">
            <input
              type="url"
              name="coverImageLinks"
              value={link}
              onChange={(e) => updateLink('coverImageLinks', index, e.target.value)}
              placeholder="Enter cover image URL"
              className="w-full lg:w-3/4 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-indigo-400 text-xs sm:text-sm"
            />
            <button
              type="button"
              onClick={() => handleRemoveLink('coverImageLinks', index)}
              className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-600"
            >
              <FaTrash />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addNewLink('coverImageLinks')}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-600 transition duration-200"
        >
          <FaPlus />
          <span>Add Cover Image Link</span>
        </button>
      </div>

      {/* Project image links */}
      <div className="mb-8">
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-4">Project Image Links</h3>
        {formData.projectImageLinks && formData.projectImageLinks.map((link, index) => (
          <div key={index} className="flex items-center gap-4 mb-4">
            <input
              type="url"
              name="projectImageLinks"
              value={link}
              onChange={(e) => updateLink('projectImageLinks', index, e.target.value)}
              placeholder="Enter project image URL"
              className="w-full lg:w-3/4 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-indigo-400 text-xs sm:text-sm"
            />
            <button
              type="button"
              onClick={() => handleRemoveLink('projectImageLinks', index)}
              className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-600"
            >
              <FaTrash />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addNewLink('projectImageLinks')}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-600 transition duration-200"
        >
          <FaPlus />
          <span>Add Project Image Link</span>
        </button>
      </div>

      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400 transition duration-200"
      >
        View Uploaded Links
      </button>
      <LinksModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default ProjectImage_Upload;