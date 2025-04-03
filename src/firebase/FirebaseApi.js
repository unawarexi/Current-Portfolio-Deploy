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

// Function to save form data
export const saveFormData = async (formData) => {
  try {
    console.log("Processing form data for submission");
    const dataToSave = { ...formData };

    // Add timestamp to the data
    dataToSave.createdAt = new Date().toISOString();

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

    console.log("Saving data to Firestore:", dataToSave);

    // Save processed data to Firestore
    const docRef = await addDoc(collection(db, 'projects'), dataToSave);
    console.log('Document written with ID: ', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error adding document: ', error);
    throw error;
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

