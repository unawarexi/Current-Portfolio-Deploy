import { db } from '../../config/firebase.config.js';
import { createLogger } from '../../logs/logger.js';
const log              = createLogger('About');
const DOC_ID           = 'profile';   // single document in 'about' collection

const get = async () => {
  const doc = await db.collection('about').doc(DOC_ID).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() };
};

const upsert = async (data) => {
  const payload = { ...data, updatedAt: new Date().toISOString() };
  await db.collection('about').doc(DOC_ID).set(payload, { merge: true });
  log.info('About profile upserted');
};

const updateCv = async (cvUrl) => {
  await db.collection('about').doc(DOC_ID).set({ cvUrl, updatedAt: new Date().toISOString() }, { merge: true });
  log.info('CV updated', { cvUrl });
};

export { get, upsert, updateCv };
