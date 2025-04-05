import React, { useState, useEffect } from "react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { FaTimesCircle } from "react-icons/fa";
import { uploadImageToCloudinary, uploadMultipleImages } from '../../../firebase/CloudinaryApi';
import { SubmitSpinner } from '../../../constants/Spinners';
import { ToastContainer, toast } from 'react-toastify';

const ImageUploads = () => {
  const [formData, setFormData] = useState({
    profilePicture: null,
    coverPhotoUpload: [],
    projectImageUpload: [],
  });

  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({
    profile: 0,
    cover: 0,
    project: 0,
  });
  const [serverStatus, setServerStatus] = useState("unknown");

  // Check server connectivity on component mount
  useEffect(() => {
    const checkServerConnection = async () => {
      try {
        const apiUrl =
          import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:3001/api";
        console.log("Checking server connection at:", apiUrl);
        const response = await fetch(`${apiUrl}/health`);

        if (response.ok) {
          const data = await response.json();
          console.log("Server health check successful:", data);
          setServerStatus("connected");
        } else {
          console.error(
            "Server health check failed with status:",
            response.status
          );
          setServerStatus("error");
        }
      } catch (error) {
        console.error("Server connection error:", error);
        setServerStatus("error");
      }
    };

    checkServerConnection();
  }, []);

  // File validation function (was missing)
  const validateFile = (file, type) => {
    // Check file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      console.error("File too large:", file.name);
      return false;
    }

    // Check file type
    if (type === "image") {
      if (!file.type.startsWith("image/")) {
        console.error("Invalid file type:", file.type);
        return false;
      }
    }

    return true;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // Handle file inputs
    if (files && name === "profilePicture") {
      // Validate file size and type
      const file = files[0];
      if (file && validateFile(file, "image")) {
        setFormData({ ...formData, [name]: file });
        console.log(
          `Profile picture file selected: ${file.name}, size: ${(
            file.size / 1024
          ).toFixed(2)}KB`
        );
      } else {
        toast.error("Please select a valid image file (max 5MB)");
      }
    }

    // Handle the file uploads from ProjectImage_Upload component
    else if (name === "coverPhotoUpload" || name === "projectImageUpload") {
      if (files && files[0]) {
        const file = files[0];
        if (validateFile(file, "image")) {
          if (name === "coverPhotoUpload") {
            const newCoverPhotos = [...formData.coverPhotoUpload, file];
            setFormData({ ...formData, coverPhotoUpload: newCoverPhotos });
            console.log(
              `Cover photo added: ${file.name}, total: ${newCoverPhotos.length}`
            );
          } else {
            const newProjectImages = [...formData.projectImageUpload, file];
            setFormData({ ...formData, projectImageUpload: newProjectImages });
            console.log(
              `Project image added: ${file.name}, total: ${newProjectImages.length}`
            );
          }
        } else {
          toast.error("Please select a valid image file (max 5MB)");
        }
      }
    }
    // Handle regular inputs
    else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Function to remove files (was missing)
  const handleRemoveFile = (fileType, index) => {
    if (fileType === "cover") {
      const updatedFiles = [...formData.coverPhotoUpload];
      updatedFiles.splice(index, 1);
      setFormData({ ...formData, coverPhotoUpload: updatedFiles });
      console.log(`Removed cover photo at index ${index}, remaining: ${updatedFiles.length}`);
    } else if (fileType === "project") {
      const updatedFiles = [...formData.projectImageUpload];
      updatedFiles.splice(index, 1);
      setFormData({ ...formData, projectImageUpload: updatedFiles });
      console.log(`Removed project image at index ${index}, remaining: ${updatedFiles.length}`);
    }
  };

  const getFilePreview = (file) => {
    if (typeof file === "string") {
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
          name: "coverPhotoUpload",
          files: [file],
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
          name: "projectImageUpload",
          files: [file],
        },
      };
      handleChange(event);
    }
  };

  // Add a new project image field
  const addProjectImageField = () => {
    // This just triggers the file input, the logic to add to formData is in handleProjectImageChange
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = handleProjectImageChange;
    input.click();
  };

  // const handleProfilePictureUpload = async (e) => {
  //   e.preventDefault();
  //   if (!formData.profilePicture) {
  //     toast.error("Please select a profile picture to upload.");
  //     return;
  //   }

  //   setLoading(true);
  //   try {
  //     // Update progress indicator
  //     setUploadProgress(prev => ({ ...prev, profile: 10 }));
      
  //     const secureUrl = await uploadImageToCloudinary(formData.profilePicture);
      
  //     // Update progress indicator
  //     setUploadProgress(prev => ({ ...prev, profile: 100 }));
      
  //     if (secureUrl) {
  //       toast.success("Profile picture uploaded successfully!");
  //       console.log("Uploaded profile picture URL:", secureUrl);
  //     } else {
  //       toast.error("Failed to upload profile picture.");
  //     }
  //   } catch (error) {
  //     console.error("Error during profile picture upload:", error);
  //     toast.error("An error occurred while uploading the profile picture.");
  //   } finally {
  //     setLoading(false);
  //     // Reset progress after a delay
  //     setTimeout(() => {
  //       setUploadProgress(prev => ({ ...prev, profile: 0 }));
  //     }, 3000);
  //   }
  // };

  // const handleCoverPhotoUpload = async () => {
  //   if (formData.coverPhotoUpload.length === 0) {
  //     toast.error("Please select a cover photo to upload.");
  //     return;
  //   }

  //   setLoading(true);
  //   try {
  //     // Update progress indicator
  //     setUploadProgress(prev => ({ ...prev, cover: 10 }));
      
  //     const secureUrls = await uploadMultipleImages(formData.coverPhotoUpload);
      
  //     // Update progress indicator
  //     setUploadProgress(prev => ({ ...prev, cover: 100 }));
      
  //     if (secureUrls && secureUrls.length > 0) {
  //       toast.success("Cover photos uploaded successfully!");
  //       console.log("Uploaded cover photo URLs:", secureUrls);
  //     } else {
  //       toast.error("Failed to upload cover photos.");
  //     }
  //   } catch (error) {
  //     console.error("Error during cover photo upload:", error);
  //     toast.error("An error occurred while uploading the cover photos.");
  //   } finally {
  //     setLoading(false);
  //     // Reset progress after a delay
  //     setTimeout(() => {
  //       setUploadProgress(prev => ({ ...prev, cover: 0 }));
  //     }, 3000);
  //   }
  // };

  // const handleProjectImagesUpload = async () => {
  //   if (formData.projectImageUpload.length === 0) {
  //     toast.error("Please select project images to upload.");
  //     return;
  //   }

  //   setLoading(true);
  //   try {
  //     // Update progress indicator
  //     setUploadProgress(prev => ({ ...prev, project: 10 }));
      
  //     const secureUrls = await uploadMultipleImages(formData.projectImageUpload);
      
  //     // Update progress indicator
  //     setUploadProgress(prev => ({ ...prev, project: 100 }));
      
  //     if (secureUrls && secureUrls.length > 0) {
  //       toast.success("Project images uploaded successfully!");
  //       console.log("Uploaded project image URLs:", secureUrls);
  //     } else {
  //       toast.error("Failed to upload project images.");
  //     }
  //   } catch (error) {
  //     console.error("Error during project image upload:", error);
  //     toast.error("An error occurred while uploading the project images.");
  //   } finally {
  //     setLoading(false);
  //     // Reset progress after a delay
  //     setTimeout(() => {
  //       setUploadProgress(prev => ({ ...prev, project: 0 }));
  //     }, 3000);
  //   }
  // };

  const handleUploadAllImages = async () => {
    if (!formData.profilePicture && formData.coverPhotoUpload.length === 0 && formData.projectImageUpload.length === 0) {
      toast.error("Please select at least one image to upload.");
      return;
    }

    setLoading(true);
    try {
      const uploadResults = [];

      // Upload profile picture if it exists
      if (formData.profilePicture) {
        setUploadProgress(prev => ({ ...prev, profile: 10 }));
        const profileResponse = await uploadImageToCloudinary(formData.profilePicture);
        setUploadProgress(prev => ({ ...prev, profile: 100 }));
        uploadResults.push(profileResponse);
      }

      // Upload cover photos if they exist
      if (formData.coverPhotoUpload.length > 0) {
        setUploadProgress(prev => ({ ...prev, cover: 10 }));
        const coverResponse = await uploadMultipleImages(formData.coverPhotoUpload);
        setUploadProgress(prev => ({ ...prev, cover: 100 }));
        uploadResults.push(...coverResponse);
      }

      // Upload project images if they exist
      if (formData.projectImageUpload.length > 0) {
        setUploadProgress(prev => ({ ...prev, project: 10 }));
        const projectResponse = await uploadMultipleImages(formData.projectImageUpload);
        setUploadProgress(prev => ({ ...prev, project: 100 }));
        uploadResults.push(...projectResponse);
      }

      // Check if all uploads were successful
      if (uploadResults.length > 0) {
        console.log("All images uploaded successfully:", uploadResults);
        toast.success("All images uploaded successfully!");
      } else {
        throw new Error("No images were uploaded.");
      }
    } catch (error) {
      console.error("Error during image upload:", error.message);
      toast.error("An error occurred while uploading images.");
    } finally {
      setLoading(false);
      // Reset progress after a delay
      setTimeout(() => {
        setUploadProgress({ profile: 0, cover: 0, project: 0 });
      }, 3000);
    }
  };

  return (
    <div className="shadow-lg pb-6 mx-auto bg-white dark:bg-[#1a1a2e] my-6 px-12 py-8 rounded-xl border-2 border-gray-300 dark:border-gray-700">
      <h2 className="text-2xl font-bold text-indigo-700 dark:text-indigo-400">Developer Profile</h2>
      <p className="text-sm text-gray-500 dark:text-gray-300 mb-6">
        This information will help potential employers learn more about you and
        your skills.
      </p>

      {/* Server status indicator */}
      <div className="mb-4">
        <span className="text-sm md:text-base font-medium text-gray-700 dark:text-gray-300">Server Status: </span>
        <span className={`inline-block px-2 py-1 text-xs md:text-sm rounded-full ${
          serverStatus === "connected" ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100" : 
          serverStatus === "error" ? "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100" : 
          "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100"
        }`}>
          {serverStatus === "connected" ? "Connected" : 
           serverStatus === "error" ? "Error" : "Checking..."}
        </span>
      </div>

      <div className="mt-8 grid gap-8 md:grid-cols-1 lg:grid-cols-2">
        {/* Profile Picture */}
        <div className="col-span-1">
          <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Profile Picture
          </label>
          <input
            type="file"
            name="profilePicture"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-800 text-xs md:text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          
          {formData.profilePicture && (
            <div className="mt-4 relative w-40 h-40 mx-auto">
              <img 
                src={getFilePreview(formData.profilePicture)} 
                alt="Profile Preview" 
                className="w-full h-full object-cover rounded-lg border"
              />
              <button
                type="button"
                onClick={() => setFormData({...formData, profilePicture: null})}
                className="absolute top-2 right-2 text-red-600 hover:text-red-800 bg-white dark:bg-gray-800 rounded-full p-1"
              >
                <FaTimesCircle size={20} />
              </button>
            </div>
          )}
        </div>

        {/* Cover photo field */}
        <div className="col-span-1 relative mb-6">
          <label
            htmlFor="cover-photo"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Cover photo (Main project image)
          </label>

          {/* Show preview if a cover photo exists */}
          {formData.coverPhotoUpload && formData.coverPhotoUpload.length > 0 ? (
            <div className="mt-2 relative">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {formData.coverPhotoUpload.map((file, index) => (
                  <div
                    key={index}
                    className="relative border rounded-md overflow-hidden"
                  >
                    <img
                      src={getFilePreview(file)}
                      alt={`Cover preview ${index}`}
                      className="w-full h-40 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveFile("cover", index)}
                      className="absolute top-2 right-2 text-red-600 hover:text-red-800 bg-white dark:bg-gray-800 rounded-full p-1"
                    >
                      <FaTimesCircle size={20} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add another cover photo button */}
              <button
                type="button"
                onClick={() =>
                  document.getElementById("coverPhotoUpload").click()
                }
                className="mt-4 p-2 bg-indigo-100 text-indigo-700 dark:bg-indigo-800 dark:text-indigo-100 rounded-md hover:bg-indigo-200 dark:hover:bg-indigo-700 transition duration-200"
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
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 dark:border-gray-700 px-6 py-10">
              <div className="text-center">
                <PhotoIcon
                  aria-hidden="true"
                  className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-500"
                />
                <div className="mt-4 flex text-sm text-gray-600 dark:text-gray-400 justify-center">
                  <label
                    htmlFor="coverPhotoUpload"
                    className="relative cursor-pointer rounded-md bg-white dark:bg-gray-800 font-semibold text-indigo-600 dark:text-indigo-400 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-indigo-500 dark:hover:text-indigo-300"
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
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Project images section */}
      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
          Project Screenshots/Images
        </h3>

        {/* Show preview of project images if they exist */}
        {formData.projectImageUpload && formData.projectImageUpload.length > 0 ? (
          <div className="mt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {formData.projectImageUpload.map((file, index) => (
                <div
                  key={index}
                  className="relative border rounded-md overflow-hidden"
                >
                  <img
                    src={getFilePreview(file)}
                    alt={`Project image ${index}`}
                    className="w-full h-40 object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveFile("project", index)}
                    className="absolute top-2 right-2 text-red-600 hover:text-red-800 bg-white dark:bg-gray-800 rounded-full p-1"
                  >
                    <FaTimesCircle size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 dark:border-gray-700 px-6 py-10">
            <div className="text-center">
              <PhotoIcon
                aria-hidden="true"
                className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-500"
              />
              <div className="mt-4 flex text-sm text-gray-600 dark:text-gray-400 justify-center">
                <span className="relative cursor-pointer rounded-md bg-white dark:bg-gray-800 font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300">
                  Click 'Add Project Image' below to upload screenshots
                </span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                PNG, JPG, GIF up to 5MB
              </p>
            </div>
          </div>
        )}

        {/* Button to add new project images */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={addProjectImageField}
            className="w-full p-2 bg-indigo-100 text-indigo-700 dark:bg-indigo-800 dark:text-indigo-100 rounded-md hover:bg-indigo-200 dark:hover:bg-indigo-700 transition duration-200"
          >
            + Add Project Image
          </button>
        </div>
      </div>

      {/* Single upload button */}
      <div className="mt-8">
        <button
          type="button"
          onClick={handleUploadAllImages}
          className={`w-full p-2 rounded-md text-white ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-500 dark:bg-indigo-800 dark:hover:bg-indigo-700"
          }`}
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <SubmitSpinner /> Uploading Images...
            </div>
          ) : (
            "Upload All Images"
          )}
        </button>
      </div>
      
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default ImageUploads;