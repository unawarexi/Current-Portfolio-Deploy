import React from 'react';

const ProjectCategories = ({ formData, handleChange }) => {
  // Categories and project types defined as JSON objects
  const categories = [
    { value: '', label: 'Select a category' },
    { value: 'blockchain', label: 'Blockchain Development' },
    { value: 'mobile', label: 'Mobile Development' },
    { value: 'web', label: 'Web Development' },
    { value: 'game', label: 'Game Development' },
    { value: 'ai', label: 'Artificial Intelligence' },
  ];

  const projectTypes = [
    { value: '', label: 'Select project type' },
    { value: 'opensource', label: 'Open Source' },
    { value: 'solo', label: 'Solo' },
    { value: 'collab', label: 'Collaboration' },
    { value: 'organization', label: 'Organization' },
    { value: 'production', label: 'Production' },
  ];

  return (
    <div className=' items-center justify-center container'>
      {/* Categories Section */}
      <div className="border-b pb-6 ">
        <h2 className="text-xl font-semibold text-indigo-600 mb-4">Categories</h2>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-2 border rounded-md bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500"
        >
          {categories.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      </div>

      {/* Project Details Section */}
      <div className="border-b pb-6 mt-6">
        <h2 className="text-xl font-semibold text-indigo-600 mb-4">Project Details</h2>

        <label className="block text-sm font-medium text-gray-700">Project Description</label>
        <textarea
          name="projectDescription"
          rows={4}
          value={formData.projectDescription}
          onChange={handleChange}
          className="w-full p-3 border rounded-md bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Describe your project, its goals, and features."
        />

        <label className="block text-sm font-medium text-gray-700 mt-4">Project Type</label>
        <select
          name="projectType"
          value={formData.projectType}
          onChange={handleChange}
          className="w-full p-2 border rounded-md bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500"
        >
          {projectTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>

        {/* Links Section */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">Google Play Link (if applicable)</label>
          <input
            type="url"
            name="googlePlayLink"
            value={formData.googlePlayLink}
            onChange={handleChange}
            className="w-full p-3 border rounded-md bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="https://play.google.com/..."
          />

          <label className="block text-sm font-medium text-gray-700 mt-4">App Store Link (if applicable)</label>
          <input
            type="url"
            name="appStoreLink"
            value={formData.appStoreLink}
            onChange={handleChange}
            className="w-full p-3 border rounded-md bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="https://apps.apple.com/..."
          />

          <label className="block text-sm font-medium text-gray-700 mt-4">Web Live Link (if applicable)</label>
          <input
            type="url"
            name="webLiveLink"
            value={formData.webLiveLink}
            onChange={handleChange}
            className="w-full p-3 border rounded-md bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="https://yourproject.com"
          />

          <label className="block text-sm font-medium text-gray-700 mt-4">Deep Enhancements</label>
          <textarea
            name="deepEnhancements"
            rows={4}
            value={formData.deepEnhancements}
            onChange={handleChange}
            className="w-full p-3 border rounded-md bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Describe any deep enhancements or advanced features you've implemented in this project."
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectCategories;
