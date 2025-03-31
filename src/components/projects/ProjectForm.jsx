import React, { useState, useEffect } from 'react';
import ProjectDev from './ProjectDev';
import ProjectCategories from './ProjectCategories';
import ProjectImage_Upload from './ProjectImage_Upload';
import ProjectStack from './ProjectStack';
import { saveFormData, uploadProfilePicture } from '../../firebase/FirebaseApi';
import { SubmitSpinner } from '../../constants/Spinners';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    profilePicture: null,
    category: '',
    projectDescription: '',
    projectType: '',
    googlePlayLink: '',
    appStoreLink: '',
    webLiveLink: '',
    deepEnhancements: '',
    coverPhotoUpload: [],
    projectImageUpload: [],
    technologies: [],
    coverImageLinks: [],
    projectImageLinks: [],
  });

  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({
    profile: 0,
    cover: 0,
    project: 0
  });
  const [serverStatus, setServerStatus] = useState('unknown');

  // Check server connectivity on component mount
  useEffect(() => {
    const checkServerConnection = async () => {
      try {
        const apiUrl = import.meta.env.VITE_REACT_APP_API_URL || 'http://localhost:3001/api';
        console.log("Checking server connection at:", apiUrl);
        const response = await fetch(`${apiUrl}/health`);
        
        if (response.ok) {
          const data = await response.json();
          console.log("Server health check successful:", data);
          setServerStatus('connected');
        } else {
          console.error("Server health check failed with status:", response.status);
          setServerStatus('error');
        }
      } catch (error) {
        console.error("Server connection error:", error);
        setServerStatus('error');
      }
    };

    checkServerConnection();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    // Handle file inputs
    if (files && name === 'profilePicture') {
      // Validate file size and type
      const file = files[0];
      if (file && validateFile(file, 'image')) {
        setFormData({ ...formData, [name]: file });
        console.log(`Profile picture file selected: ${file.name}, size: ${(file.size / 1024).toFixed(2)}KB`);
      } else {
        toast.error('Please select a valid image file (max 5MB)');
      }
    } 
    // Handle manual URL input for profile picture
    else if (name === 'profilePictureUrl') {
      setFormData({ ...formData, profilePicture: value });
    } 
    // Handle the file uploads from ProjectImage_Upload component
    else if (name === 'coverPhotoUpload' || name === 'projectImageUpload') {
      if (files && files[0]) {
        const file = files[0];
        if (validateFile(file, 'image')) {
          if (name === 'coverPhotoUpload') {
            const newCoverPhotos = [...formData.coverPhotoUpload, file];
            setFormData({ ...formData, coverPhotoUpload: newCoverPhotos });
            console.log(`Cover photo added: ${file.name}, total: ${newCoverPhotos.length}`);
          } else {
            const newProjectImages = [...formData.projectImageUpload, file];
            setFormData({ ...formData, projectImageUpload: newProjectImages });
            console.log(`Project image added: ${file.name}, total: ${newProjectImages.length}`);
          }
        } else {
          toast.error('Please select a valid image file (max 5MB)');
        }
      }
    }
    // Handle arrays (like technologies)
    else if (name === 'technologies') {
      setFormData({ ...formData, [name]: value }); // value is already an array here
      console.log(`Technologies updated: ${value.length} items`);
    }
    // Handle regular inputs
    else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Validate file size and type
  const validateFile = (file, type) => {
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      console.error(`File too large: ${file.name}, size: ${(file.size / 1024).toFixed(2)}KB`);
      return false;
    }
    
    // Check file type
    if (type === 'image' && !file.type.startsWith('image/')) {
      console.error(`Invalid file type: ${file.name}, type: ${file.type}`);
      return false;
    }
    
    return true;
  };

  // Handle removing a file from the arrays
  const handleRemoveFile = (type, index) => {
    if (type === 'cover') {
      const updatedFiles = [...formData.coverPhotoUpload];
      const removedFile = updatedFiles[index];
      updatedFiles.splice(index, 1);
      setFormData({ ...formData, coverPhotoUpload: updatedFiles });
      console.log(`Cover photo removed: ${removedFile?.name || 'unknown'}, remaining: ${updatedFiles.length}`);
    } else if (type === 'project') {
      const updatedFiles = [...formData.projectImageUpload];
      const removedFile = updatedFiles[index];
      updatedFiles.splice(index, 1);
      setFormData({ ...formData, projectImageUpload: updatedFiles });
      console.log(`Project image removed: ${removedFile?.name || 'unknown'}, remaining: ${updatedFiles.length}`);
    }
  };

  const handleUploadProfilePicture = async (file) => {
    if (!file) {
      toast.error('Please select a profile picture to upload');
      return;
    }

    try {
      const uploadedUrl = await uploadProfilePicture(file);
      if (uploadedUrl) {
        setFormData({ ...formData, profilePicture: uploadedUrl });
        toast.success('Profile picture uploaded successfully!');
      } else {
        toast.error('Failed to upload profile picture');
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      toast.error('An error occurred while uploading the profile picture');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Reset progress
    setUploadProgress({
      profile: 0,
      cover: 0,
      project: 0
    });

    // Validate form data
    if (!formData.name || !formData.email) {
      toast.error('Please fill in all required fields');
      setLoading(false);
      return;
    }

    try {
      console.log("Form data being submitted:", {
        ...formData,
        profilePicture: formData.profilePicture ? `${formData.profilePicture.name} (${(formData.profilePicture.size / 1024).toFixed(2)}KB)` : null,
        coverPhotoUpload: formData.coverPhotoUpload.length,
        projectImageUpload: formData.projectImageUpload.length,
        coverImageLinks: formData.coverImageLinks.length,
        projectImageLinks: formData.projectImageLinks.length,
      });
      
      // Progress indicators
      if (formData.profilePicture) setUploadProgress(prev => ({ ...prev, profile: 25 }));
      if (formData.coverPhotoUpload.length > 0) setUploadProgress(prev => ({ ...prev, cover: 25 }));
      if (formData.projectImageUpload.length > 0) setUploadProgress(prev => ({ ...prev, project: 25 }));
      
      // Call saveFormData to handle the form submission
      const docId = await saveFormData(formData);
      
      // Update progress to complete
      setUploadProgress({ profile: 100, cover: 100, project: 100 });
      
      setLoading(false);
      toast.success('Project submitted successfully!', { autoClose: 2000 });
      console.log("Document saved with ID:", docId);
      
      // Reset form after successful submission
      setFormData({
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
        profilePicture: null,
        category: '',
        projectDescription: '',
        projectType: '',
        googlePlayLink: '',
        appStoreLink: '',
        webLiveLink: '',
        deepEnhancements: '',
        coverPhotoUpload: [],
        projectImageUpload: [],
        technologies: [],
        coverImageLinks: [],
        projectImageLinks: [],
      });
      
    } catch (error) {
      console.error("Error in form submission:", error);
      console.log("Error in form submission:", error);
      setLoading(false);
      
      // Provide more specific error messages
      if (error.message && error.message.includes('upload')) {
        toast.error(`Upload failed: ${error.message}`, { autoClose: 5000 });
        console.log(`Upload failed: ${error.message}`);
      } else if (error.message && error.message.includes('network')) {
        toast.error('Network error. Please check your internet connection.', { autoClose: 5000 });
      } else {
        toast.error(`Failed to submit project: ${error.message || 'Unknown error'}`, { autoClose: 5000 });
        console.log(`Failed to submit project: ${error.message}`);
      }
    }
  };

  return (
    <div>
      <ToastContainer position="top-right" />
      
      {/* Server status indicator */}
      {serverStatus === 'error' && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          <strong className="font-bold">Warning:</strong>
          <span className="block sm:inline"> Unable to connect to the server. Form submission may fail.</span>
        </div>
      )}
      
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
            <img
              className="object-cover object-center rounded"
              alt="hero"
              src="https://dummyimage.com/720x600"
            />
          </div>
          <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              Create Your Dev Portfolio
              <br className="hidden lg:inline-block" />
              Showcase Your Projects
            </h1>
            <p className="mb-8 leading-relaxed">
              Fill out this form to add your development project to your portfolio. Include details about your skills, experience, and the technologies you used.
            </p>
          </div>
        </div>
      </section>
      
      <form
        onSubmit={handleSubmit}
        className="space-y-12 mx-auto lg:p-6 p-4 text-black container shadow-lg rounded-lg bg-slate-50"
      >
        <div>
          <ProjectDev formData={formData} handleChange={handleChange} handleUploadProfilePicture={handleUploadProfilePicture} />
          <ProjectCategories formData={formData} handleChange={handleChange} />
          <ProjectImage_Upload 
            formData={formData} 
            handleChange={handleChange} 
            handleRemoveFile={handleRemoveFile}
          />
          <ProjectStack formData={formData} handleChange={handleChange} />
        </div>

        {/* Upload progress indicators - only show when uploading */}
        {loading && (
          <div className="space-y-2">
            {formData.profilePicture && (
              <div className="flex items-center">
                <span className="text-sm mr-2">Profile Image:</span>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${uploadProgress.profile}%` }}></div>
                </div>
                <span className="text-sm ml-2">{uploadProgress.profile}%</span>
              </div>
            )}
            
            {formData.coverPhotoUpload.length > 0 && (
              <div className="flex items-center">
                <span className="text-sm mr-2">Cover Photos:</span>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${uploadProgress.cover}%` }}></div>
                </div>
                <span className="text-sm ml-2">{uploadProgress.cover}%</span>
              </div>
            )}
            
            {formData.projectImageUpload.length > 0 && (
              <div className="flex items-center">
                <span className="text-sm mr-2">Project Images:</span>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${uploadProgress.project}%` }}></div>
                </div>
                <span className="text-sm ml-2">{uploadProgress.project}%</span>
              </div>
            )}
          </div>
        )}

        <div className="flex justify-end gap-4">
          <button type="button" className="text-sm font-semibold text-gray-900">
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-500 disabled:bg-indigo-400"
            disabled={loading} // Disable button while loading
          >
            {loading ? <SubmitSpinner /> : 'Save Project'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;