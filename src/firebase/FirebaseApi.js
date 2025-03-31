import { db } from '../config/FirebaseConfig';
import { 
  collection, 
  addDoc, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit 
} from 'firebase/firestore';

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
    
    console.log("Uploading file to server:", imageFile.name, "Size:", (imageFile.size / 1024).toFixed(2) + "KB");
    console.log("API URL being used:", `${API_URL}/upload`);
    
    const response = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      body: formData,
    });
    
    // Log response status
    console.log("Upload response status:", response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Upload response error text:", errorText);
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch (e) {
        errorData = { error: errorText };
      }
      throw new Error(`Upload failed: ${errorData.error || response.status}`);
    }
    
    const data = await response.json();
    console.log("Upload response full data:", JSON.stringify(data));
    
    // Check for different possible URL locations in the response
    const secureUrl = data.secure_url || 
                      (data.result && data.result.secure_url) || 
                      data.url || 
                      (data.result && data.result.url) ||
                      null;
    
    console.log("Extracted secure URL:", secureUrl);
    
    if (!secureUrl) {
      console.error("Failed to extract secure URL from response:", data);
    }
    
    return secureUrl;
  } catch (error) {
    console.error("Error uploading image, details:", error.message);
    console.error("Full error object:", error);
    return null;
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
    
    // Append each file to the form data and log details
    let validFiles = 0;
    imageFiles.forEach((file, index) => {
      if (file) {
        formData.append('files', file);
        console.log(`File ${index} details: Name=${file.name}, Size=${(file.size / 1024).toFixed(2)}KB, Type=${file.type}`);
        validFiles++;
      } else {
        console.log(`File ${index} is null or undefined, skipping`);
      }
    });
    
    if (validFiles === 0) {
      console.log("No valid files to upload after filtering");
      return [];
    }
    
    formData.append('upload_preset', 'portfolio');
    
    console.log(`Uploading ${validFiles} files to server at: ${API_URL}/upload-multiple`);
    
    // Send the request and time it
    const startTime = Date.now();
    const response = await fetch(`${API_URL}/upload-multiple`, {
      method: 'POST',
      body: formData,
    });
    const endTime = Date.now();
    console.log(`Upload request took ${endTime - startTime}ms, status: ${response.status}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Multiple upload response error text:", errorText);
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch (e) {
        errorData = { error: errorText };
      }
      throw new Error(`Multiple upload failed: ${errorData.error || response.status}`);
    }
    
    const data = await response.json();
    console.log("Raw multiple upload response data:", JSON.stringify(data));
    
    // Extract URLs with detailed logging for debugging
    let urls = [];
    
    if (Array.isArray(data)) {
      console.log(`Processing array response with ${data.length} items`);
      
      urls = data.map((item, index) => {
        console.log(`Processing item ${index}:`, JSON.stringify(item));
        
        // Try different property paths that could contain the URL
        const secureUrl = item.secure_url || 
                          (item.result && item.result.secure_url) || 
                          item.url || 
                          (item.result && item.result.url) ||
                          null;
        
        console.log(`Item ${index} extracted URL: ${secureUrl}`);
        return secureUrl;
      }).filter(url => url !== null);
    } else if (data && typeof data === 'object') {
      // Handle case where response might be a single object with an array
      console.log("Processing object response:", JSON.stringify(data));
      
      if (data.secure_url) {
        urls = [data.secure_url];
      } else if (data.result && Array.isArray(data.result)) {
        console.log("Found result array in response with length:", data.result.length);
        urls = data.result.map((item, index) => {
          const secureUrl = item.secure_url || item.url || null;
          console.log(`Result item ${index} extracted URL: ${secureUrl}`);
          return secureUrl;
        }).filter(url => url !== null);
      } else if (data.urls && Array.isArray(data.urls)) {
        console.log("Found urls array in response with length:", data.urls.length);
        urls = data.urls.filter(url => url !== null);
      }
    } else {
      console.log("Unexpected response format from server:", JSON.stringify(data));
    }
    
    console.log("Final extracted URLs:", urls);
    
    if (urls.length === 0) {
      console.warn("No URLs were extracted from the response");
    }
    
    return urls;
  } catch (error) {
    console.error("Error uploading multiple images:", error.message);
    console.error("Full error object:", error);
    throw error;
  }
};

// Function to fetch uploaded images from Cloudinary
export const fetchUploadedImages = async () => {
  try {
    console.log("Fetching uploaded images from Cloudinary...");
    const response = await fetch(`${API_URL}/fetch-images`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Fetch images response error text:", errorText);
      throw new Error(`Failed to fetch images: ${response.status}`);
    }

    const imageUrls = await response.json();
    console.log("Successfully fetched images from Cloudinary:", imageUrls);
    return imageUrls;
  } catch (error) {
    console.error("Error fetching images from Cloudinary:", error.message);
    throw error;
  }
};

// Function to save form data
export const saveFormData = async (formData) => {
  try {
    console.log("Processing form data for submission");
    const dataToSave = { ...formData };
    
    console.log("Initial form data keys:", Object.keys(dataToSave));
    console.log("Profile picture present:", !!dataToSave.profilePicture);
    console.log("Cover photos count:", dataToSave.coverPhotoUpload?.length || 0);
    console.log("Project images count:", dataToSave.projectImageUpload?.length || 0);
    
    // Add timestamp to the data
    dataToSave.createdAt = new Date().toISOString();
    
    // Upload profile picture if provided
    if (dataToSave.profilePicture) {
      console.log("Uploading profile picture");
      try {
        const profileUrl = await uploadImageToCloudinary(dataToSave.profilePicture);
        if (profileUrl) {
          dataToSave.profilePicture = profileUrl;
          console.log("Profile picture uploaded successfully:", dataToSave.profilePicture);
        } else {
          console.log("No URL returned for profile picture, using default");
          dataToSave.profilePicture = '/default-profile.jpg'; // Use default instead of null/undefined
        }
      } catch (error) {
        console.error("Failed to upload profile picture:", error);
        dataToSave.profilePicture = '/default-profile.jpg'; // Use default instead of null
      }
    } else {
      // Make sure we never have undefined
      dataToSave.profilePicture = null;
    }
    
    // Upload cover photo(s) if provided
    if (dataToSave.coverPhotoUpload && dataToSave.coverPhotoUpload.length > 0) {
      console.log(`Uploading ${dataToSave.coverPhotoUpload.length} cover photos`);
      try {
        const filteredPhotos = dataToSave.coverPhotoUpload.filter(file => file);
        console.log(`After filtering, uploading ${filteredPhotos.length} cover photos`);
        
        if (filteredPhotos.length > 0) {
          const coverUrls = await uploadMultipleImages(filteredPhotos);
          if (coverUrls && coverUrls.length > 0) {
            dataToSave.coverPhotoUpload = coverUrls;
            console.log("Cover photos uploaded successfully:", dataToSave.coverPhotoUpload);
          } else {
            console.log("No URLs returned for cover photos, using empty array");
            dataToSave.coverPhotoUpload = [];
          }
        } else {
          dataToSave.coverPhotoUpload = [];
        }
      } catch (error) {
        console.error("Failed to upload cover photos:", error);
        dataToSave.coverPhotoUpload = []; // Set to empty array if upload fails
      }
    } else {
      // Make sure we never have undefined
      dataToSave.coverPhotoUpload = [];
    }
    
    // Upload project images if provided
    if (dataToSave.projectImageUpload && dataToSave.projectImageUpload.length > 0) {
      console.log(`Uploading ${dataToSave.projectImageUpload.length} project images`);
      try {
        const filteredImages = dataToSave.projectImageUpload.filter(file => file);
        console.log(`After filtering, uploading ${filteredImages.length} project images`);
        
        if (filteredImages.length > 0) {
          const projectUrls = await uploadMultipleImages(filteredImages);
          if (projectUrls && projectUrls.length > 0) {
            dataToSave.projectImageUpload = projectUrls;
            console.log("Project images uploaded successfully:", dataToSave.projectImageUpload);
          } else {
            console.log("No URLs returned for project images, using empty array");
            dataToSave.projectImageUpload = [];
          }
        } else {
          dataToSave.projectImageUpload = [];
        }
      } catch (error) {
        console.error("Failed to upload project images:", error);
        dataToSave.projectImageUpload = []; // Set to empty array if upload fails
      }
    } else {
      // Make sure we never have undefined
      dataToSave.projectImageUpload = [];
    }
    
    // Ensure links are arrays
    dataToSave.coverImageLinks = dataToSave.coverImageLinks || [];
    dataToSave.projectImageLinks = dataToSave.projectImageLinks || [];

    // Final check to ensure no undefined values before saving to Firestore
    Object.keys(dataToSave).forEach(key => {
      if (dataToSave[key] === undefined) {
        console.log(`Found undefined value for key ${key}, setting to null`);
        dataToSave[key] = null;
      }
    });
    
    console.log("All uploads completed, saving data to Firestore:", dataToSave);
    
    // Save processed data to Firestore
    const docRef = await addDoc(collection(db, 'projects'), dataToSave);
    console.log('Document written with ID: ', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error adding document: ', error);
    throw error; // Re-throw to allow the calling function to handle it
  }
};

// Function to fetch a single form detail by ID
export const fetchFormDetail = async (projectId) => {
  try {
    console.log(`Fetching project with ID: ${projectId}`);
    
    const docRef = doc(db, 'projects', projectId);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      console.log('No such document!');
      return null;
    } 
    
    // Get document data and add the id
    const projectData = {
      id: docSnap.id,
      ...docSnap.data()
    };
    
    console.log('Document data:', projectData);
    
    // Process any image URLs or other data if needed
    return processProjectData(projectData);
  } catch (error) {
    console.error('Error fetching document: ', error);
    throw error;
  }
};

// Function to fetch all form details (with optional filtering)
export const fetchAllFormDetails = async (filters = {}) => {
  try {
    console.log('Fetching all projects with filters:', filters);
    
    // Start with a base query
    let projectsQuery = collection(db, 'projects');
    
    // Apply filters if provided
    if (filters) {
      // Example: if category filter is provided
      if (filters.category) {
        projectsQuery = query(
          projectsQuery, 
          where('category', '==', filters.category)
        );
      }
      
      // Example: if user filter is provided
      if (filters.userId) {
        projectsQuery = query(
          projectsQuery, 
          where('userId', '==', filters.userId)
        );
      }
      
      // Example: limit results
      if (filters.limit) {
        projectsQuery = query(
          projectsQuery,
          limit(filters.limit)
        );
      }
      
      // Example: order by creation date (newest first)
      if (filters.orderByDate) {
        projectsQuery = query(
          projectsQuery,
          orderBy('createdAt', 'desc')
        );
      }
    }
    
    const querySnapshot = await getDocs(projectsQuery);
    
    // Process results
    const projects = [];
    querySnapshot.forEach((doc) => {
      // Get document data and add the id
      const projectData = {
        id: doc.id,
        ...doc.data()
      };
      
      // Process any image URLs or other data if needed
      projects.push(processProjectData(projectData));
    });
    
    console.log(`Retrieved ${projects.length} projects`);
    return projects;
  } catch (error) {
    console.error('Error fetching projects: ', error);
    throw error;
  }
};

// Helper function to process project data
const processProjectData = (projectData) => {
  // Deep clone to avoid modifying original
  const processed = JSON.parse(JSON.stringify(projectData));
  
  // Process date fields if needed
  if (processed.createdAt) {
    // Format date or add a display version
    processed.createdAtDisplay = new Date(processed.createdAt).toLocaleDateString();
  }
  
  // Process image URLs if needed
  // For example, if you need to handle image placeholders or defaults
  if (!processed.profilePicture) {
    processed.profilePicture = '/default-profile.jpg';
  }
  
  // If coverPhotoUpload is empty, provide a default
  if (!processed.coverPhotoUpload || processed.coverPhotoUpload.length === 0) {
    processed.coverPhotoUpload = ['/default-cover.jpg'];
  }
  
  // Process project images
  if (!processed.projectImageUpload || processed.projectImageUpload.length === 0) {
    processed.projectImageUpload = ['/default-project.jpg'];
  }
  
  return processed;
};

// Function to fetch projects by user ID
export const fetchUserProjects = async (userId) => {
  return fetchAllFormDetails({ userId });
};

// Function to fetch recent projects
export const fetchRecentProjects = async (limit = 5) => {
  return fetchAllFormDetails({ 
    limit, 
    orderByDate: true 
  });
};

// Function to fetch projects by category
export const fetchProjectsByCategory = async (category, limit = 10) => {
  return fetchAllFormDetails({ 
    category, 
    limit,
    orderByDate: true
  });
};

// Function to upload a single profile picture to Firebase
export const uploadProfilePicture = async (imageFile) => {
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
      throw new Error(`Failed to upload profile picture: ${response.status}`);
    }

    const data = await response.json();
    return data.secure_url || null;
  } catch (error) {
    console.error("Error uploading profile picture:", error.message);
    return null;
  }
};