import Dexie, { Table } from "dexie";

export interface MissionRecord {
  id?: number;
  missionId: number;
  completed: boolean;
  completedAt?: string;
  userId: string;
}

export interface ProgressRecord {
  id?: number;
  userId: string;
  points: number;
  updatedAt: string;
}

class ParcialDatabase extends Dexie {
  missions!: Table<MissionRecord>;
  progress!: Table<ProgressRecord>;

  constructor() {
    super("ParcialDB");
    this.version(1).stores({
      missions: "++id, missionId, completed, userId",
      progress: "++id, &userId, points",
    });
  }
}

export const db_local = new ParcialDatabase();