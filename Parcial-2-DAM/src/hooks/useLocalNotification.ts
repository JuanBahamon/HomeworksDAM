import { LocalNotifications } from "@capacitor/local-notifications";

let notifId = 1;
export const useLocalNotifications = () => {

  const requestPermissions = async () => {
    await LocalNotifications.requestPermissions();
  };

  const sendNotification = async (title: string, body: string) => {
    await LocalNotifications.schedule({
      notifications: [
        {
          id: notifId++, title, body, schedule: { at: new Date(Date.now() + 500) }, sound: undefined, attachments: undefined, actionTypeId: "", extra: null,
        },
      ],
    });
  };

  const notifyMissionComplete = async (missionName: string) => {
    await sendNotification(
        "Mision Completa!",
        `Has completado la misión: ${missionName}`
    );
  };

  const notifyOneLeft = async () => {
    await sendNotification(
        "Vamos por la siguiente!",
        "Te falta 1 misión para completar"
    );
  };

  const notifyAllComplete = async () => {
    await sendNotification(
        "Eres un ganador!",
        "Has completado todas las misiones"
    );
  };

  return {requestPermissions, sendNotification, notifyMissionComplete, notifyOneLeft, notifyAllComplete,
  };
};