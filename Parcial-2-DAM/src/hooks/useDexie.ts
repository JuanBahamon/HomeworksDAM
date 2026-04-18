import { useLiveQuery } from "dexie-react-hooks";
import { db_local, MissionRecord, ProgressRecord } from "../db/DexieLocal";

export const useDexie = (userId: string) => {

  const missions = useLiveQuery(
    () => db_local.missions.where("userId").equals(userId).toArray(), [userId]);

  const progress = useLiveQuery(() => db_local.progress.where("userId").equals(userId).first(), [userId]);

  const saveMission = async (missionId: number) => {
    const existing = await db_local.missions.where({ missionId, userId }).first();
    if (existing) {
        await db_local.missions.update(existing.id!, {completed: true,completedAt: new Date().toISOString(),
        });
    } else {
        await db_local.missions.add({missionId, completed: true, completedAt: new Date().toISOString(), userId,
      });
    }
  };

  const savePoints = async (points: number) => {
    const existing = await db_local.progress.where("userId").equals(userId).first();
    if (existing) {
      await db_local.progress.update(existing.id!, {
        points, updatedAt: new Date().toISOString(),
      });
    } else {
      await db_local.progress.add({
        userId, points, updatedAt: new Date().toISOString(),
      });
    }
  };

  const clearAll = async () => {
    await db_local.missions.where("userId").equals(userId).delete();
    await db_local.progress.where("userId").equals(userId).delete();
  };

  return {
    missions: missions ?? [], progress: progress ?? null, saveMission, savePoints, clearAll,
  };
};