import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { RfpData, RfpStatus, StageHistory } from '../../types';

interface RfpDB extends DBSchema {
  rfps: {
    key: string;
    value: RfpData;
    indexes: { 
      'by-client': string; 
      'by-status': string; 
      'by-date': string;
    };
  };
}

export class RfpService {
  private db: Promise<IDBPDatabase<RfpDB>>;
  private static instance: RfpService;

  private constructor() {
    this.db = this.initDB();
  }

  static getInstance(): RfpService {
    if (!RfpService.instance) {
      RfpService.instance = new RfpService();
    }
    return RfpService.instance;
  }

  private initDB(): Promise<IDBPDatabase<RfpDB>> {
    return openDB<RfpDB>('rfp-store', 2, {
      upgrade(db) {
        const rfpStore = db.createObjectStore('rfps', { keyPath: 'rfpId' });
        rfpStore.createIndex('by-client', 'clientId');
        rfpStore.createIndex('by-status', 'status');
        rfpStore.createIndex('by-date', 'createdAt');
      },
    });
  }

  async add(rfp: RfpData): Promise<void> {
    try {
      const db = await this.db;
      await db.add('rfps', {
        ...rfp,
        version: 1,
        lastModified: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error adding RFP:', error);
      throw new Error('Failed to add RFP');
    }
  }

  async update(rfpId: string, updates: Partial<RfpData>): Promise<RfpData> {
    try {
      const db = await this.db;
      const tx = db.transaction('rfps', 'readwrite');
      const store = tx.objectStore('rfps');
      
      const existing = await store.get(rfpId);
      if (!existing) throw new Error('RFP not found');

      const updated = {
        ...existing,
        ...updates,
        version: existing.version + 1,
        lastModified: new Date().toISOString()
      };

      await store.put(updated);
      await tx.done;
      return updated;
    } catch (error) {
      console.error('Error updating RFP:', error);
      throw new Error('Failed to update RFP');
    }
  }

  async getByClient(clientId: string): Promise<RfpData[]> {
    try {
      const db = await this.db;
      return db.getAllFromIndex('rfps', 'by-client', clientId);
    } catch (error) {
      console.error('Error getting RFPs by client:', error);
      return [];
    }
  }

  async getByStatus(status: RfpStatus): Promise<RfpData[]> {
    try {
      const db = await this.db;
      return db.getAllFromIndex('rfps', 'by-status', status);
    } catch (error) {
      console.error('Error getting RFPs by status:', error);
      return [];
    }
  }

  async getAll(): Promise<RfpData[]> {
    try {
      const db = await this.db;
      return db.getAll('rfps');
    } catch (error) {
      console.error('Error getting all RFPs:', error);
      return [];
    }
  }

  async clearAll(): Promise<void> {
    try {
      const db = await this.db;
      const tx = db.transaction('rfps', 'readwrite');
      await tx.objectStore('rfps').clear();
      await tx.done;
    } catch (error) {
      console.error('Error clearing RFPs:', error);
      throw new Error('Failed to clear RFPs');
    }
  }
}