import { firebaseService } from "../../services/firebase.service.js";
import { assetLinksService } from "../../services/asset-links.service.js";
import { createLogger } from "../../logs/logger.js";
import AdvancedFormatter from "../../utils/formatters.js";

const log = createLogger("Projects");
const COLLECTION = "projects";

const extractLinks = (data) => {
  const { coverImages = [], projectImages = [], ...firebaseData } = data;
  return {
    firebaseData,
    mongoData: { coverImages, projectImages },
  };
};

const createProject = async (data) => {
  const { firebaseData, mongoData } = extractLinks(
    AdvancedFormatter.formatProjectData(data),
  );

  const saved = await firebaseService.createDoc(COLLECTION, firebaseData);

  if (mongoData.coverImages.length || mongoData.projectImages.length) {
    await assetLinksService.saveAssetLinks('project', saved.id, mongoData);
  }

  log.info("Project created", { id: saved.id });
  return saved.id;
};

const getAllProjects = async (opts = {}) => {
  const queryOpts = {};
  if (opts.category) queryOpts.where = { field: 'category', op: '==', value: opts.category };
  if (opts.limit) queryOpts.limit = Number(opts.limit);
  queryOpts.orderBy = 'createdAt';
  queryOpts.orderDir = 'desc';

  const projects = await firebaseService.getAllDocs(COLLECTION, queryOpts);
  
  return Promise.all(projects.map(p => assetLinksService.mergeAssetLinks(p, 'project')));
};

const getProjectById = async (id) => {
  const doc = await firebaseService.getDoc(COLLECTION, id);
  return assetLinksService.mergeAssetLinks(doc, 'project');
};

const updateProject = async (id, updates) => {
  const formatted = AdvancedFormatter.formatProjectData({
    title: "", category: "", description: "", type: "", status: "", year: "",
    client: "", role: "", duration: "", team: [], technologies: [],
    features: "", challenges: "", solution: "", results: "",
    githubLinks: [], googlePlayLinks: [], appStoreLinks: [],
    webLiveLinks: [], videoUrls: [], coverImages: [], projectImages: [],
    ...updates,
  });

  const formattedDelta = Object.fromEntries(
    Object.keys(updates).map((key) => [key, formatted[key]]),
  );

  const { firebaseData, mongoData } = extractLinks(formattedDelta);

  if (Object.keys(firebaseData).length > 0) {
    await firebaseService.updateDoc(COLLECTION, id, firebaseData);
  }

  if (mongoData.coverImages?.length || mongoData.projectImages?.length) {
    await assetLinksService.saveAssetLinks('project', id, mongoData);
  }

  log.info("Project updated", { id });

  const updated = await firebaseService.getDoc(COLLECTION, id);
  return await assetLinksService.mergeAssetLinks(updated, 'project');
};

const deleteProject = async (id) => {
  const deleted = await firebaseService.deleteDoc(COLLECTION, id);
  if (!deleted) return false;

  await assetLinksService.deleteAssetLinks('project', id);
  log.info("Project deleted", { id });
  return true;
};

export {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
