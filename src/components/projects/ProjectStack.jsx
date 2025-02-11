import React, { useState } from 'react';
import skillSets from '../../data/SkillsetsTech'; // Assuming this is the skillset data

const ProjectStack = ({ formData, handleChange }) => {
  const [selectedTechnologies, setSelectedTechnologies] = useState(formData.technologies || []);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSelectChange = (e) => {
    const { value, checked } = e.target;
    setSelectedTechnologies((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleSelectClick = () => {
    // Set the selected technologies into the input field or wherever required
    handleChange({ target: { name: 'technologies', value: selectedTechnologies } });
    setIsDropdownOpen(false); // Close the dropdown after selection
  };

  return (
    <div>
      {/* Technology Section */}
      <div className="border-b pb-6">
        <h2 className="text-lg font-semibold">Technologies</h2>
        <div className="mt-4">
          <label htmlFor="technologies" className="block text-sm font-medium text-gray-900">
            Select Technologies
          </label>

          {/* Display selected technologies */}
          <div className="w-full p-2 border rounded-md">
            {selectedTechnologies.length > 0
              ? selectedTechnologies.join(', ') // Display selected technologies
              : 'Select your technologies'}
          </div>

          {/* Button to open dropdown */}
          <button
            onClick={handleDropdownToggle}
            className="mt-2 px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-500"
          >
            {isDropdownOpen ? 'Close Selection' : 'Select Technologies'}
          </button>

          {/* Dropdown with checkboxes */}
          {isDropdownOpen && (
            <div className="mt-2 p-4 border border-indigo-600 rounded-md bg-white shadow-lg">
              <h3 className="text-lg font-medium mb-4">Choose Technologies</h3>

              {/* Map through categories and skills */}
              {skillSets.map((category) => (
                <div key={category.category} className="mb-6">
                  <h4 className="text-md font-semibold text-gray-900">{category.category}</h4>

                  {/* Map through skills within each category */}
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="flex items-center space-x-2 mb-2">
                      <input
                        type="checkbox"
                        id={skill.name}
                        value={skill.name}
                        checked={selectedTechnologies.includes(skill.name)}
                        onChange={handleSelectChange}
                        className="form-checkbox h-4 w-4 text-indigo-600"
                      />
                      <label htmlFor={skill.name} className="text-sm flex items-center space-x-2">
                        <img src={skill.icon} alt={skill.name} className="w-5 h-5" />
                        <span>{skill.name}</span>
                      </label>
                    </div>
                  ))}
                </div>
              ))}

              <button
                onClick={handleSelectClick}
                className="mt-4 px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-500"
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
