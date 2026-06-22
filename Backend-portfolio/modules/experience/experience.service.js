import { db } from '../../config/firebase.config.js';
import { createLogger } from '../../logs/logger.js';
const log              = createLogger('Experience');
const COL              = 'experience';

const create = async (data) => {
  const payload = { ...data, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
  const ref = await db.collection(COL).add(payload);
  log.info('Experience created', { id: ref.id });
  return ref.id;
};

const getAll = async () => {
  const snap = await db.collection(COL).orderBy('order', 'asc').get();
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

const getById = async (id) => {
  const doc = await db.collection(COL).doc(id).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() };
};

const update = async (id, data) => {
  await db.collection(COL).doc(id).update({ ...data, updatedAt: new Date().toISOString() });
};

const remove = async (id) => {
  await db.collection(COL).doc(id).delete();
};

export { create, getAll, getById, update, remove };
