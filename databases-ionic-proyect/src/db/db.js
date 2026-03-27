import Dexie from 'dexie';

const db = new Dexie('Challenge06DB');

db.version(1).stores({
  frutas: '++id, nombre, createdAt',
});

db.version(2).stores({
  frutas: '++id, nombre, proveedor, createdAt',
});

export default db;
