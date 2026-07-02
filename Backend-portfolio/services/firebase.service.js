import { db } from '../config/firebase.config.js';
import { logger } from '../logs/logger.js';

export const firebaseService = {
  /**
   * Create a new document with an auto-generated ID
   */
  async createDoc(collectionName, data) {
    const ref = db.collection(collectionName).doc();
    const payload = {
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await ref.set(payload);
    return { id: ref.id, ...payload };
  },

  /**
   * Get a document by ID
   */
  async getDoc(collectionName, docId) {
    const doc = await db.collection(collectionName).doc(docId).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() };
  },

  /**
   * Get all documents from a collection
   */
  async getAllDocs(collectionName, opts = {}) {
    let query = db.collection(collectionName);
    
    if (opts.orderBy) {
      const dir = opts.orderDir || 'asc';
      query = query.orderBy(opts.orderBy, dir);
    }
    
    if (opts.where) {
      // opts.where = { field: 'status', op: '==', value: 'Live' }
      query = query.where(opts.where.field, opts.where.op, opts.where.value);
    }
    
    if (opts.limit) {
      query = query.limit(opts.limit);
    }

    const snapshot = await query.get();
    if (snapshot.empty) return [];
    
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  /**
   * Update an existing document
   */
  async updateDoc(collectionName, docId, data) {
    const ref = db.collection(collectionName).doc(docId);
    const doc = await ref.get();
    if (!doc.exists) return null;

    const payload = {
      ...data,
      updatedAt: new Date().toISOString(),
    };
    
    await ref.set(payload, { merge: true });
    
    // Return updated document
    const updated = await ref.get();
    return { id: updated.id, ...updated.data() };
  },

  /**
   * Delete a document
   */
  async deleteDoc(collectionName, docId) {
    const ref = db.collection(collectionName).doc(docId);
    const doc = await ref.get();
    if (!doc.exists) return false;
    
    await ref.delete();
    return true;
  },

  /**
   * Upsert a singleton document (like the About profile)
   */
  async upsertSingleton(collectionName, docId, data) {
    const ref = db.collection(collectionName).doc(docId);
    const doc = await ref.get();
    
    const payload = {
      ...data,
      updatedAt: new Date().toISOString(),
    };
    
    if (!doc.exists) {
      payload.createdAt = new Date().toISOString();
    }
    
    await ref.set(payload, { merge: true });
    
    const updated = await ref.get();
    return { id: updated.id, ...updated.data() };
  }
};
