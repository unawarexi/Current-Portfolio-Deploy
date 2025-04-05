import React, { useState } from 'react';
import skillSets from '../../../data/SkillsetsTech'; // Assuming this is the skillset data

const ProjectStack = ({ formData, handleChange }) => {
  const [selectedTechnologies, setSelectedTechnologies] = useState(formData.technologies || []);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSelectChange = (e) => {
    const { value, checked } = e.target;
    setSelectedTechnologies((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  const handleDropdownToggle = (e) => {
    e.preventDefault(); // Prevent form submission
    setIsDropdownOpen((prev) => !prev);
  };

  const handleSelectClick = (e) => {
    e.preventDefault(); // Prevent form submission
    handleChange({ target: { name: 'technologies', value: selectedTechnologies } });
    setIsDropdownOpen(false); // Close the dropdown after selection
  };

  return (
    <div
      className="my-4 py-4 p-6 rounded-lg bg-white dark:bg-[#1a1a2e] border-2 border-gray-300 dark:border-gray-700"
      style={{ width: '100%' }}
    >
      {/* Technology Section */}
      <div className="border-b pb-6 border-gray-300 dark:border-gray-700">
        <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">Technologies</h2>
        <div className="mt-4">
          {/* <label htmlFor="technologies" className="block text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-300">
            Select Technologies
          </label> */}

          {/* Display selected technologies */}
          <div className="w-full p-2 border rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-xs sm:text-sm">
            {selectedTechnologies.length > 0
              ? selectedTechnologies.join(', ') 
              : 'Select your technologies'}
          </div>

          {/* Button to open dropdown */}
          <button
            onClick={handleDropdownToggle}
            className="mt-2 px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400"
          >
            {isDropdownOpen ? 'Close Selection' : 'Select Technologies'}
          </button>

          {/* Dropdown with checkboxes */}
          {isDropdownOpen && (
            <div className="mt-2 p-4 border border-indigo-600 rounded-md bg-white dark:bg-gray-900 shadow-lg">
              <h3 className="text-md font-medium mb-4 text-gray-900 dark:text-gray-100">Choose Technologies</h3>

              {/* Map through categories and skills */}
              {skillSets.map((category) => (
                <div key={category.category} className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">{category.category}</h4>

                  {/* Map through skills within each category */}
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="flex items-center space-x-2 mb-2">
                      <input
                        type="checkbox"
                        id={skill.name}
                        value={skill.name}
                        checked={selectedTechnologies.includes(skill.name)}
                        onChange={handleSelectChange}
                        className="form-checkbox h-4 w-4 text-indigo-600 dark:text-indigo-400"
                      />
                      <label htmlFor={skill.name} className="text-sm flex items-center space-x-2 text-gray-900 dark:text-gray-300">
                        <img src={skill.icon} alt={skill.name} className="w-5 h-5" />
                        <span>{skill.name}</span>
                      </label>
                    </div>
                  ))}
                </div>
              ))}

              <button
                onClick={handleSelectClick}
                className="mt-4 px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400"
              >
                Select
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectStack;
