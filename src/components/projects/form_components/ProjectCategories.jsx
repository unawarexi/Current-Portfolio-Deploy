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
    <div className="container my-6 lg:px-8 px-4 py-6 rounded-xl shadow-lg bg-white dark:bg-[#1a1a2e] border-2 border-gray-300 dark:border-gray-700">
      {/* Categories Section */}
      <div className="border-b pb-6 border-gray-300 dark:border-gray-700">
        <h2 className="text-2xl font-semibold text-indigo-700 dark:text-indigo-400 mb-4">Categories</h2>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none hover:shadow-md transition-shadow"
        >
          {categories.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      </div>

      {/* Project Details Section */}
      <div className="border-b pb-6 mt-6 border-gray-300 dark:border-gray-700">
        <h2 className="text-2xl font-semibold text-indigo-700 dark:text-indigo-400 mb-4">Project Details</h2>

        <label className="block text-sm font-medium text-gray-800 dark:text-gray-300">Project Description</label>
        <textarea
          name="projectDescription"
          rows={4}
          value={formData.projectDescription}
          onChange={handleChange}
          className="w-full p-4 border rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none hover:shadow-md transition-shadow"
          placeholder="Describe your project, its goals, and features."
        />

        <label className="block text-sm font-medium text-gray-800 dark:text-gray-300 mt-4">Project Type</label>
        <select
          name="projectType"
          value={formData.projectType}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none hover:shadow-md transition-shadow"
        >
          {projectTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>

        {/* Links Section */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-800 dark:text-gray-300">Google Play Link (if applicable)</label>
          <input
            type="url"
            name="googlePlayLink"
            value={formData.googlePlayLink}
            onChange={handleChange}
            className="w-full p-4 border rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none hover:shadow-md transition-shadow"
            placeholder="https://play.google.com/..."
          />

          <label className="block text-sm font-medium text-gray-800 dark:text-gray-300 mt-4">App Store Link (if applicable)</label>
          <input
            type="url"
            name="appStoreLink"
            value={formData.appStoreLink}
            onChange={handleChange}
            className="w-full p-4 border rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none hover:shadow-md transition-shadow"
            placeholder="https://apps.apple.com/..."
          />

          <label className="block text-sm font-medium text-gray-800 dark:text-gray-300 mt-4">Web Live Link (if applicable)</label>
          <input
            type="url"
            name="webLiveLink"
            value={formData.webLiveLink}
            onChange={handleChange}
            className="w-full p-4 border rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none hover:shadow-md transition-shadow"
            placeholder="https://yourproject.com"
          />

          <label className="block text-sm font-medium text-gray-800 dark:text-gray-300 mt-4">Deep Enhancements</label>
          <textarea
            name="deepEnhancements"
            rows={4}
            value={formData.deepEnhancements}
            onChange={handleChange}
            className="w-full p-4 border rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none hover:shadow-md transition-shadow"
            placeholder="Describe any deep enhancements or advanced features you've implemented in this project."
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectCategories;
