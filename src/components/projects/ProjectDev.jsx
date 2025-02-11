import React, { useState } from 'react';

const ProjectDev = ({ formData, handleChange }) => {
  return (
    <div className="border-b pb-6 mx-auto">
      <h2 className="text-xl font-semibold text-indigo-600">Developer Profile</h2>
      <p className="text-sm text-gray-600 mb-4">This information will help potential employers learn more about you and your skills.</p>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Profile Picture */}
        <div className="col-span-2">
          <label className="block text-sm font-medium">Profile Picture</label>
          <input
            type="file"
            name="profilePicture"
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Developer's Name */}
        <div className="col-span-2 lg:col-span-1">
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* GitHub URL */}
        <div className="col-span-2 lg:col-span-1">
          <label className="block text-sm font-medium">GitHub URL</label>
          <input
            type="url"
            name="github"
            value={formData.github}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* LinkedIn URL */}
        <div className="col-span-2 lg:col-span-1">
          <label className="block text-sm font-medium">LinkedIn URL</label>
          <input
            type="url"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Portfolio URL */}
        <div className="col-span-2 lg:col-span-1">
          <label className="block text-sm font-medium">Portfolio URL</label>
          <input
            type="url"
            name="portfolio"
            value={formData.portfolio}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>


        {/* Experience */}
        <div className="col-span-2">
          <label className="block text-sm font-medium">Experience</label>
          <textarea
            name="experience"
            rows={4}
            value={formData.experience}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            placeholder="Describe your relevant experience or notable projects"
          />
        </div>

        {/* Contact Information */}
        <div className="col-span-2 lg:col-span-1">
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="col-span-2 lg:col-span-1">
          <label className="block text-sm font-medium">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Location */}
        <div className="col-span-2 lg:col-span-1">
          <label className="block text-sm font-medium">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            placeholder="Enter your location (city, country)"
          />
        </div>

        {/* Education */}
        <div className="col-span-2">
          <label className="block text-sm font-medium">Education</label>
          <textarea
            name="education"
            rows={3}
            value={formData.education}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            placeholder="Describe your education, certifications, or degrees"
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectDev;
