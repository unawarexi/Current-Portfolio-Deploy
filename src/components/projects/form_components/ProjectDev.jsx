import React, { useState } from 'react';
import LinksModal from './LinksModal';

const ProjectDev = ({ formData, handleChange, handleUploadProfilePicture }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div
      className="pb-6 p-6 mx-auto bg-white dark:bg-[#1a1a2e] my-6 py-8 rounded-xl border-2 border-gray-300 dark:border-gray-700"
      style={{ width: '100%' }}
    >
      <h2 className="text-md font-bold text-indigo-700 dark:text-indigo-400">
        Developer Profile
      </h2>
      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-300 mb-6">
        This information will help potential employers learn more about you and
        your skills.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        {/* Profile Picture */}
        <div className="col-span-2">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
              Profile Picture
            </label>
            <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className=" px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400 transition duration-200"
      >
        View Uploaded Links
      </button>
      <LinksModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
          </div>
          <input
            type="text"
            name="profilePicture" // Updated to match the formData property
            value={formData.profilePicture || ''}
            onChange={handleChange}
            className="w-full mt-3 p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder="Uploaded profile picture URL"
          />
        </div>

        {/* Developer's Name */}
        <div className="col-span-2 lg:col-span-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* GitHub URL */}
        <div className="col-span-2 lg:col-span-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">GitHub URL</label>
          <input
            type="url"
            name="github"
            value={formData.github}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* LinkedIn URL */}
        <div className="col-span-2 lg:col-span-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">LinkedIn URL</label>
          <input
            type="url"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* Portfolio URL */}
        <div className="col-span-2 lg:col-span-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Portfolio URL</label>
          <input
            type="url"
            name="portfolio"
            value={formData.portfolio}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* Experience */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Experience</label>
          <textarea
            name="experience"
            rows={4}
            value={formData.experience}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder="Describe your relevant experience or notable projects"
          />
        </div>

        {/* Contact Information */}
        <div className="col-span-2 lg:col-span-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div className="col-span-2 lg:col-span-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* Location */}
        <div className="col-span-2 lg:col-span-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder="Enter your location (city, country)"
          />
        </div>

        {/* Education */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Education</label>
          <textarea
            name="education"
            rows={3}
            value={formData.education}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder="Describe your education, certifications, or degrees"
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectDev;
