import { openDB, DBSchema } from 'idb';

let dbPromise: Promise<any>;

interface RfpDB extends DBSchema {
  rfps: {
    key: string;
    value: {
      id: number;
      rfpId: string;
      title: string;
      content: string;
      requirements: any[];
      clientName: string;
      clientId: string;
      projectType: string;
      status: string;
      createdAt: string;
      assignedPartners: string[];
      crmContent: string;
      phases: any[];
      submittedBy: number;
      submitterRole: string;
      visibleToAdmin: boolean;
      bidDetails?: {
        deadline: string;
        requirements: string;
        evaluationCriteria: string;
        createdAt: string;
        status: 'open' | 'closed';
      };
      stageHistory: Array<{
        from: string;
        to: string;
        timestamp: string;
        note: string;
      }>;
      version: number;
      lastModified: string;
    };
    indexes: { 'by-client': string; 'by-status': string; 'by-date': string };
  };
  optimize: {
    key: string;
    value: {
      clientId: string;
      items: Array<{
        id: string;
        optimizeId: string;
        title: string;
        area: string;
        priority: string;
        impact: string;
        recommendation: string;
        status: string;
        createdAt: string;
      }>;
      assignments: Record<string, string>;
      lastModified: string;
    };
  };
}

const DB_NAME = 'rfp-store';
const DB_VERSION = 3; // Increment version to trigger upgrade

const initDB = () => {
  if (!dbPromise) {
    dbPromise = openDB<RfpDB>(DB_NAME, DB_VERSION, {
    upgrade(db, oldVersion, newVersion, transaction) {
      // Create stores only if they don't exist
      if (!db.objectStoreNames.contains('rfps')) {
        const rfpStore = db.createObjectStore('rfps', { keyPath: 'rfpId' });
        rfpStore.createIndex('by-client', 'clientId');
        rfpStore.createIndex('by-status', 'status');
        rfpStore.createIndex('by-date', 'createdAt');
      }
      
      // Always recreate optimize store to ensure correct schema
      if (db.objectStoreNames.contains('optimize')) {
        db.deleteObjectStore('optimize');
      }
      try {
        db.createObjectStore('optimize', { keyPath: 'clientId' });
      } catch (error) {
        console.error('Error creating optimize store:', error);
        throw error;
      }
    },
    });
  }
  return dbPromise;
};

export const rfpDB = {
  async add(rfp: RfpDB['rfps']['value']) {
    try {
      const db = await initDB();
      return db.add('rfps', {
        ...rfp,
        version: 1,
        lastModified: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error adding RFP:', error);
      throw error;
    }
  },

  async update(rfpId: string, updates: Partial<RfpDB['rfps']['value']>) {
    try {
      const db = await initDB();
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
      throw error;
    }
  },

  async getByClient(clientId: string) {
    try {
      const db = await initDB();
      return db.getAllFromIndex('rfps', 'by-client', clientId);
    } catch (error) {
      console.error('Error getting RFPs by client:', error);
      return [];
    }
  },

  async getAll() {
    try {
      const db = await initDB();
      return db.getAll('rfps');
    } catch (error) {
      console.error('Error getting all RFPs:', error);
      return [];
    }
  },

  async getByStatus(status: string) {
    try {
      const db = await initDB();
      return db.getAllFromIndex('rfps', 'by-status', status);
    } catch (error) {
      console.error('Error getting RFPs by status:', error);
      return [];
    }
  },

  async clearAll() {
    try {
      const db = await initDB();
      const tx = db.transaction('rfps', 'readwrite');
      await tx.objectStore('rfps').clear();
      await tx.done;
    } catch (error) {
      console.error('Error clearing RFPs:', error);
      throw error;
    }
  }
};

export const optimizeDB = {
  async saveItems(clientId: string, items: any[]) {
    try {
    const db = await initDB();
    return db.put('optimize', {
      clientId,
      items,
      assignments: {},
      lastModified: new Date().toISOString()
    });
    } catch (error) {
      console.error('Error saving optimize items:', error);
      throw error;
    }
  },

  async getItems(clientId: string) {
    try {
      const db = await initDB();
      const data = await db.get('optimize', clientId);
      return data?.items || [];
    } catch (error) {
      console.error('Error getting optimize items:', error);
      return [];
    }
  },

  async saveAssignments(clientId: string, assignments: Record<string, string>) {
    try {
    const db = await initDB();
    const existing = await db.get('optimize', clientId);
    return db.put('optimize', {
      clientId,
      items: existing?.items || [],
      assignments,
      lastModified: new Date().toISOString()
    });
    } catch (error) {
      console.error('Error saving optimize assignments:', error);
      throw error;
    }
  },

  async getAssignments(clientId: string) {
    try {
      const db = await initDB();
      const data = await db.get('optimize', clientId);
      return data?.assignments || {};
    } catch (error) {
      console.error('Error getting optimize assignments:', error);
      return {};
    }
  }
};