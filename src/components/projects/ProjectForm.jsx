
import React, { useState } from 'react';
import ProjectDev from './ProjectDev';
import ProjectCategories from './ProjectCategories';
import ProjectImage_Upload from './ProjectImage_Upload';
import ProjectStack from './ProjectStack';

const ProjectForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    github: '',
    linkedin: '',
    portfolio: '',
    skills: '',
    experience: '',
    email: '',
    phone: '',
    location: '',
    education: '',
    profilePicture: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profilePicture') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission logic (e.g., API call)
    console.log(formData);
  };

  return (
    <div>
           <section class="text-gray-600 body-font">
  <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
    <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
      <img class="object-cover object-center rounded" alt="hero" src="https://dummyimage.com/720x600" />
    </div>
    <div class="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
      <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Before they sold out
        <br class="hidden lg:inline-block" />readymade gluten
      </h1>
      <p class="mb-8 leading-relaxed">Copper mug try-hard pitchfork pour-over freegan heirloom neutra air plant cold-pressed tacos poke beard tote bag. Heirloom echo park mlkshk tote bag selvage hot chicken authentic tumeric truffaut hexagon try-hard chambray.</p>
      <div class="flex justify-center">
        <button class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Button</button>
        <button class="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">Button</button>
      </div>
    </div>
  </div>
</section>
<form onSubmit={handleSubmit} className="space-y-12 p-6  bg-white container shadow-lg rounded-lg ">
     <div>
     <ProjectDev formData={formData} handleChange={handleChange} />
     <ProjectCategories formData={formData} handleChange={handleChange} />
     <ProjectImage_Upload formData={formData} handleChange={handleChange} />
     <ProjectStack formData={formData} handleChange={handleChange} />

     </div>

      <div className="flex justify-end gap-4">
        <button type="button" className="text-sm font-semibold text-gray-900">Cancel</button>
        <button type="submit" className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-500">Save</button>
      </div>
    </form>
    </div>
   
  );
};

export default ProjectForm;

