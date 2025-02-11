import React, { useState } from 'react';
import { PhotoIcon } from '@heroicons/react/24/solid';
import { FaTimesCircle } from 'react-icons/fa'; // Import the delete icon

const ProjectImage_Upload = ({ formData, handleChange }) => {
  const [fileFields, setFileFields] = useState([{ id: 0, file: null }]); // Initially, only the Cover Photo field

  // Handle adding a new file input field
  const addFileField = () => {
    setFileFields([...fileFields, { id: fileFields.length, file: null }]);
  };

  // Handle file change for each input
  const handleFileChange = (e, id) => {
    const updatedFiles = fileFields.map((field) => 
      field.id === id ? { ...field, file: e.target.files[0] } : field
    );
    setFileFields(updatedFiles);
    handleChange(e); // If you want to propagate the data to the parent component
  };

  // Handle removing an extra file field
  const removeFileField = (id) => {
    setFileFields(fileFields.filter((field) => field.id !== id));
  };

  return (
    <div>
      {/* Cover photo field */}
      <div className="col-span-full relative">
        <label htmlFor="cover-photo" className="block text-sm font-medium text-gray-900">
          Cover photo
        </label>
        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
          <div className="text-center">
            <PhotoIcon aria-hidden="true" className="mx-auto size-12 text-gray-300" />
            <div className="mt-4 flex text-sm text-gray-600">
              <label
                htmlFor="cover-photo-upload"
                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-indigo-500"
              >
                <span>Upload cover photo</span>
                <input
                  id="cover-photo-upload"
                  name="cover-photo-upload"
                  type="file"
                  className="sr-only"
                  onChange={(e) => handleFileChange(e, 0)} // Handle cover photo file change
                />
              </label>
            </div>
            <p className="text-xs text-gray-600">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>
      </div>

      {/* Dynamically added image fields */}
      {fileFields.slice(1).map((field) => ( // Skip the first cover photo field in the map
        <div key={field.id} className="mt-6 relative">
          <label htmlFor={`project-image-${field.id}`} className="block text-sm font-medium text-gray-900">
            Project Image {field.id}
          </label>
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            <div className="text-center">
              <PhotoIcon aria-hidden="true" className="mx-auto size-12 text-gray-300" />
              <div className="mt-4 flex text-sm text-gray-600">
                <label
                  htmlFor={`project-image-upload-${field.id}`}
                  className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-indigo-500"
                >
                  <span>Upload an image</span>
                  <input
                    id={`project-image-upload-${field.id}`}
                    name={`project-image-upload-${field.id}`}
                    type="file"
                    className="sr-only"
                    onChange={(e) => handleFileChange(e, field.id)} // Handle project image file change
                  />
                </label>
              </div>
              <p className="text-xs text-gray-600">PNG, JPG, GIF up to 10MB</p>
            </div>
            
            {/* Delete icon */}
            <button
              type="button"
              onClick={() => removeFileField(field.id)}
              className="absolute top-2 right-2 text-red-600 hover:text-red-800"
            >
              <FaTimesCircle size={20} />
            </button>
          </div>
        </div>
      ))}

      {/* Button to add new image fields */}
      <div className="mt-4">
        <button
          type="button"
          onClick={addFileField}
          className="w-full p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 transition duration-200"
        >
          + Add Another Image
        </button>
      </div>
    </div>
  );
};

export default ProjectImage_Upload;
