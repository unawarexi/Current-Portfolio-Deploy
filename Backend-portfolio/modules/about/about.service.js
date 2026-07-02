import { firebaseService } from '../../services/firebase.service.js';
import { createLogger } from '../../logs/logger.js';

const log = createLogger('About');
const DOC_ID = 'profile';

/**
 * Fetch raw profile from Firebase.
 */
const get = async () => {
  try {
    return await firebaseService.getDoc('about', DOC_ID);
  } catch (err) {
    log.error('get', { error: err.message });
    throw err;
  }
};

/**
 * Upsert profile.
 *
 * Receives data that has ALREADY been formatted and validated by the controller.
 * cvUrl is intentionally excluded from the payload — it lives in MongoDB only.
 */
const upsert = async (data) => {
  try {
    const { cvUrl: _cv, coverLetterUrl: _cl, ...firebaseSafeData } = data;
    
    const saved = await firebaseService.upsertSingleton('about', DOC_ID, firebaseSafeData);
    log.info('About profile upserted successfully');

    return {
      success: true,
      data: firebaseSafeData,
      savedAt: saved.updatedAt,
    };
  } catch (err) {
    log.error('upsert', { error: err.message, stack: err.stack });
    throw new Error(`Failed to upsert profile: ${err.message}`);
  }
};

export { get, upsert };
