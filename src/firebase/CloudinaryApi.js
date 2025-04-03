// Configure the API base URL
const API_URL = import.meta.env.VITE_REACT_APP_API_URL || 'http://localhost:3001/api';

// Function to upload image to Cloudinary via server
const uploadImageToCloudinary = async (imageFile) => {
  if (!imageFile) {
    console.log("No image file provided for upload");
    return null;
  }

  try {
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', 'portfolio');

    const response = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Upload response error text:", errorText);
      throw new Error(`Upload failed: ${response.status}`);
    }

    const data = await response.json();
    console.log("Upload response data:", data);

    return data; // Return the full response data
  } catch (error) {
    console.error("Error uploading image:", error.message);
    throw error;
  }
};

// Function to upload multiple images
const uploadMultipleImages = async (imageFiles) => {
  if (!imageFiles || imageFiles.length === 0) {
    console.log("No image files provided for multiple upload");
    return [];
  }

  try {
    const formData = new FormData();
    imageFiles.forEach((file) => {
      formData.append('files', file);
    });
    formData.append('upload_preset', 'portfolio');

    const response = await fetch(`${API_URL}/upload-multiple`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Multiple upload response error text:", errorText);
      throw new Error(`Multiple upload failed: ${response.status}`);
    }

    const data = await response.json();
    console.log("Multiple upload response data:", data);

    return data; // Return the full response data
  } catch (error) {
    console.error("Error uploading multiple images:", error.message);
    throw error;
  }
};

// Function to upload a single profile picture
const uploadProfilePicture = async (imageFile) => {
    if (!imageFile) {
      console.error("No image file provided for upload");
      return null;
    }
  
    try {
      const formData = new FormData();
      formData.append('file', imageFile);
      formData.append('upload_preset', 'portfolio');
  
      const response = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Upload response error text:", errorText);
        throw new Error(`Failed to upload profile picture: ${response.status}`);
      }
  
      const data = await response.json();
      const secureUrl = data.secure_url || null;
      console.log("Profile picture uploaded successfully, URL:", secureUrl);
      return secureUrl;
    } catch (error) {
      console.error("Error uploading profile picture:", error.message);
      return null;
    }
};

export { uploadImageToCloudinary, uploadMultipleImages, uploadProfilePicture };