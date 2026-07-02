import { AssetLinks } from './asset-links.model.js';
import { logger } from '../logs/logger.js';

export const assetLinksService = {
  /**
   * Save or update asset links for an entity
   */
  async saveAssetLinks(entityType, firebaseId, links) {
    try {
      const record = await AssetLinks.findOneAndUpdate(
        { firebaseId, entityType },
        { $set: links },
        { new: true, upsert: true }
      );
      return record;
    } catch (error) {
      logger.error('Error saving asset links', { error, firebaseId, entityType });
      throw new Error('Failed to save asset links');
    }
  },

  /**
   * Get asset links for an entity
   */
  async getAssetLinks(entityType, firebaseId) {
    try {
      const record = await AssetLinks.findOne({ firebaseId, entityType });
      return record;
    } catch (error) {
      logger.error('Error getting asset links', { error, firebaseId, entityType });
      return null;
    }
  },

  /**
   * Delete asset links for an entity
   */
  async deleteAssetLinks(entityType, firebaseId) {
    try {
      const result = await AssetLinks.deleteOne({ firebaseId, entityType });
      return result.deletedCount > 0;
    } catch (error) {
      logger.error('Error deleting asset links', { error, firebaseId, entityType });
      throw new Error('Failed to delete asset links');
    }
  },

  /**
   * Helper to merge asset links into a Firebase document
   */
  async mergeAssetLinks(firebaseDoc, entityType) {
    if (!firebaseDoc) return null;
    
    const record = await this.getAssetLinks(entityType, firebaseDoc.id);
    const merged = { ...firebaseDoc };
    
    if (record) {
      if (record.coverImages?.length) merged.coverImages = record.coverImages;
      if (record.projectImages?.length) merged.projectImages = record.projectImages;
      if (record.documents?.length) merged.documents = record.documents;
      if (record.avatar) merged.avatar = record.avatar;
      if (record.logo) merged.logo = record.logo;
    } else {
      // Provide defaults
      if (entityType === 'project') {
        merged.coverImages = [];
        merged.projectImages = [];
      } else if (entityType === 'about') {
        merged.documents = [];
      }
    }
    
    return merged;
  },

  // ============================================================================
  // DOCUMENT (ABOUT) SPECIFIC HELPERS
  // ============================================================================

  /**
   * Helper to always get or create the 'about' asset links record
   */
  async _getAboutRecord() {
    const firebaseId = 'profile';
    const entityType = 'about';
    let record = await AssetLinks.findOne({ firebaseId, entityType });
    if (!record) {
      record = await AssetLinks.create({ firebaseId, entityType, documents: [] });
    }
    return record;
  },

  async addDocument(docData) {
    const record = await this._getAboutRecord();
    if (docData.isActive !== false) docData.isActive = true;

    if (docData.isActive) {
      record.documents.filter(d => d.type === docData.type).forEach(d => {
        d.isActive = false;
      });
    }

    record.documents.push(docData);
    await record.save();
    return record.documents[record.documents.length - 1];
  },

  async getActiveCvUrl() {
    const record = await this._getAboutRecord();
    const active = record.documents.find(d => d.type === 'cv' && d.isActive);
    return active ? active.url : null;
  },

  async getActiveCoverLetterUrl() {
    const record = await this._getAboutRecord();
    const active = record.documents.find(d => d.type === 'cover-letter' && d.isActive);
    return active ? active.url : null;
  },

  async getAllCvs() {
    const record = await this._getAboutRecord();
    return record.documents.filter(d => d.type === 'cv');
  },

  async getAllCoverLetters() {
    const record = await this._getAboutRecord();
    return record.documents.filter(d => d.type === 'cover-letter');
  },

  async setActiveDocument(docId) {
    const record = await this._getAboutRecord();
    const doc = record.documents.id(docId);
    if (!doc) throw new Error("Document not found");

    record.documents
      .filter(d => d.type === doc.type && !d._id.equals(docId))
      .forEach(d => {
        d.isActive = false;
      });

    doc.isActive = true;
    await record.save();
  },

  async removeDocument(docId) {
    const record = await this._getAboutRecord();
    const doc = record.documents.id(docId);
    if (doc) {
      record.documents.pull(docId);
      await record.save();
    }
  }
};
