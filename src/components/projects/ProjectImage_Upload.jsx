import React, { useState } from 'react';
import { PhotoIcon } from '@heroicons/react/24/solid';
import { FaTimesCircle } from 'react-icons/fa';
import LinksModal from './LinksModal';

const ProjectImage_Upload = ({ formData, handleChange, handleRemoveFile }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to preview files already in formData
  const getFilePreview = (file) => {
    if (typeof file === 'string') {
      // If it's a URL string, it's already uploaded
      return file;
    } else if (file instanceof File) {
      // If it's a File object, create a temporary URL
      return URL.createObjectURL(file);
    }
    return null;
  };

  // Handle file change for cover photo
  const handleCoverPhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Create a synthetic event to pass to the parent formData
      const event = {
        target: {
          name: 'coverPhotoUpload',
          files: [file]
        },
      };
      handleChange(event);
    }
  };

  // Handle file change for project images
  const handleProjectImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Create a synthetic event to pass to the parent formData
      const event = {
        target: {
          name: 'projectImageUpload',
          files: [file]
        },
      };
      handleChange(event);
    }
  };

  // Add a new project image field
  const addProjectImageField = () => {
    // This just triggers the file input, the logic to add to formData is in handleProjectImageChange
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = handleProjectImageChange;
    input.click();
  };

  // Handle adding a new link
  const addNewLink = (type) => {
    const event = {
      target: {
        name: type,
        value: [...(formData[type] || []), ''], // Add an empty string for a new input
      },
    };
    handleChange(event);
  };

  // Handle updating a specific link
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

  // Handle removing a specific link
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
    <div className='bg-white my-4 px-10 py-4 rounded-lg'>
      <h2 className="text-xl font-semibold text-indigo-600 mb-4">Project Images</h2>
      
      {/* Cover photo field */}
      <div className="col-span-full relative mb-6">
        <label htmlFor="cover-photo" className="block text-sm font-medium text-gray-900">
          Cover photo (Main project image)
        </label>
        
        {/* Show preview if a cover photo exists */}
        {formData.coverPhotoUpload && formData.coverPhotoUpload.length > 0 ? (
          <div className="mt-2 relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {formData.coverPhotoUpload.map((file, index) => (
                <div key={index} className="relative border rounded-md overflow-hidden">
                  <img 
                    src={getFilePreview(file)} 
                    alt={`Cover preview ${index}`} 
                    className="w-full h-40 object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveFile('cover', index)}
                    className="absolute top-2 right-2 text-red-600 hover:text-red-800 bg-white rounded-full p-1"
                  >
                    <FaTimesCircle size={20} />
                  </button>
                </div>
              ))}
            </div>
            
            {/* Add another cover photo button */}
            <button
              type="button"
              onClick={() => document.getElementById('coverPhotoUpload').click()}
              className="mt-4 p-2 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200 transition duration-200"
            >
              + Add Another Cover Photo
            </button>
            <input
              id="coverPhotoUpload"
              name="coverPhotoUpload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleCoverPhotoChange}
            />
          </div>
        ) : (
          // Upload interface if no cover photo
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            <div className="text-center">
              <PhotoIcon aria-hidden="true" className="mx-auto h-12 w-12 text-gray-300" />
              <div className="mt-4 flex text-sm text-gray-600 justify-center">
                <label
                  htmlFor="coverPhotoUpload"
                  className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-indigo-500"
                >
                  <span>Upload cover photo</span>
                  <input
                    id="coverPhotoUpload"
                    name="coverPhotoUpload"
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={handleCoverPhotoChange}
                  />
                </label>
              </div>
              <p className="text-xs text-gray-600">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        )}
      </div>

      {/* Cover image links */}
      <div className="mt-6">
        <h3 className="text-md font-medium text-gray-900 mb-2">Cover Image Links</h3>
        {formData.coverImageLinks && formData.coverImageLinks.map((link, index) => (
          <div key={index} className="flex items-center gap-4 mb-2">
            <input
              type="url"
              name="coverImageLinks"
              value={link}
              onChange={(e) => updateLink('coverImageLinks', index, e.target.value)}
              placeholder="Enter cover image URL"
              className="w-full p-2 border rounded-md"
            />
            <button
              type="button"
              onClick={() => handleRemoveLink('coverImageLinks', index)}
              className="text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addNewLink('coverImageLinks')}
          className="mt-2 p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 transition duration-200"
        >
          + Add Cover Image Link
        </button>
      </div>

      {/* Project images section */}
      <div className="mt-6">
        <h3 className="text-md font-medium text-gray-900 mb-2">
          Project Screenshots/Images
        </h3>
        
        {/* Show preview of project images if they exist */}
        {formData.projectImageUpload && formData.projectImageUpload.length > 0 ? (
          <div className="mt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {formData.projectImageUpload.map((file, index) => (
                <div key={index} className="relative border rounded-md overflow-hidden">
                  <img 
                    src={getFilePreview(file)} 
                    alt={`Project image ${index}`} 
                    className="w-full h-40 object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveFile('project', index)}
                    className="absolute top-2 right-2 text-red-600 hover:text-red-800 bg-white rounded-full p-1"
                  >
                    <FaTimesCircle size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {/* Button to add new project images */}
        <button
          type="button"
          onClick={addProjectImageField}
          className="mt-4 w-full p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 transition duration-200"
        >
          + Add Project Image
        </button>
      </div>

      {/* Project image links */}
      <div className="mt-6">
        <h3 className="text-md font-medium text-gray-900 mb-2">Project Image Links</h3>
        {formData.projectImageLinks && formData.projectImageLinks.map((link, index) => (
          <div key={index} className="flex items-center gap-4 mb-2">
            <input
              type="url"
              name="projectImageLinks"
              value={link}
              onChange={(e) => updateLink('projectImageLinks', index, e.target.value)}
              placeholder="Enter project image URL"
              className="w-full p-2 border rounded-md"
            />
            <button
              type="button"
              onClick={() => handleRemoveLink('projectImageLinks', index)}
              className="text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addNewLink('projectImageLinks')}
          className="mt-2 p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 transition duration-200"
        >
          + Add Project Image Link
        </button>
      </div>

      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="mt-4 p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 transition duration-200"
      >
        View Uploaded Links
      </button>
      <LinksModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default ProjectImage_Upload;