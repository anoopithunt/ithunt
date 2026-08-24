import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '../../data');
const STORAGE_FILE = path.join(DATA_DIR, 'storage.json');

// Memory cache of DB tables
let dbState = {
  users: [],
  admissions: [],
  careers: [],
  reviews: [],
  nielitProjects: [],
  events: [],
  courses: [],
  internships: [],
  contacts: []
};

// Initialize persistent file store
export function initDB() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (fs.existsSync(STORAGE_FILE)) {
      const content = fs.readFileSync(STORAGE_FILE, 'utf-8');
      dbState = { ...dbState, ...JSON.parse(content) };
    } else {
      saveDB();
    }
    console.log('✓ Database storage adapter initialized successfully');
  } catch (err) {
    console.error('❌ Database storage initialization error:', err.message);
  }
}

export function saveDB() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(dbState, null, 2), 'utf-8');
  } catch (err) {
    console.error('❌ Failed to save database to storage file:', err.message);
  }
}

export const db = {
  getCollection(collectionName) {
    if (!dbState[collectionName]) {
      dbState[collectionName] = [];
    }
    return dbState[collectionName];
  },

  find(collectionName, queryFn = () => true) {
    const coll = this.getCollection(collectionName);
    return coll.filter(queryFn);
  },

  findOne(collectionName, queryFn) {
    const coll = this.getCollection(collectionName);
    return coll.find(queryFn) || null;
  },

  findById(collectionName, id) {
    return this.findOne(collectionName, item => item.id === id);
  },

  insert(collectionName, item) {
    const coll = this.getCollection(collectionName);
    const newItem = {
      id: item.id || uuidv4(),
      createdAt: item.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...item
    };
    coll.unshift(newItem);
    saveDB();
    return newItem;
  },

  updateById(collectionName, id, updates) {
    const coll = this.getCollection(collectionName);
    const index = coll.findIndex(item => item.id === id);
    if (index === -1) return null;
    coll[index] = {
      ...coll[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    saveDB();
    return coll[index];
  },

  deleteById(collectionName, id) {
    const coll = this.getCollection(collectionName);
    const index = coll.findIndex(item => item.id === id);
    if (index === -1) return false;
    coll.splice(index, 1);
    saveDB();
    return true;
  },

  resetCollection(collectionName, data = []) {
    dbState[collectionName] = data;
    saveDB();
  }
};

export default db;
