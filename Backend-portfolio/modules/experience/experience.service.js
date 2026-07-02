import { firebaseService } from '../../services/firebase.service.js';
import { createLogger } from '../../logs/logger.js';

const log = createLogger('Experience');
const COL = 'experience';

const create = async (data) => {
  try {
    const saved = await firebaseService.createDoc(COL, data);
    log.info('Experience created', { id: saved.id });
    return saved.id;
  } catch (err) {
    log.error('create', { error: err.message });
    throw err;
  }
};

const getAll = async () => {
  try {
    return await firebaseService.getAllDocs(COL, { orderBy: 'order', orderDir: 'asc' });
  } catch (err) {
    log.error('getAll', { error: err.message });
    throw err;
  }
};

const getById = async (id) => {
  try {
    return await firebaseService.getDoc(COL, id);
  } catch (err) {
    log.error('getById', { error: err.message, id });
    throw err;
  }
};

const update = async (id, data) => {
  try {
    await firebaseService.updateDoc(COL, id, data);
    log.info('Experience updated', { id });
  } catch (err) {
    log.error('update', { error: err.message, id });
    throw err;
  }
};

const remove = async (id) => {
  try {
    await firebaseService.deleteDoc(COL, id);
    log.info('Experience deleted', { id });
  } catch (err) {
    log.error('remove', { error: err.message, id });
    throw err;
  }
};

export { create, getAll, getById, update, remove };
