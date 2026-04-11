import { LocalNotifications } from '@capacitor/local-notifications';

export const useLocalNotifications = () => {
  const scheduleNotification = async () => {
    await LocalNotifications.schedule({
      notifications: [
        {
          title: "¡Logro Desbloqueado!",
          body: "Has completado la práctica de sensores",
          id: 1,
          schedule: { at: new Date(Date.now() + 1000 * 3) },
          sound: undefined,
          attachments: undefined,
          actionTypeId: "",
          extra: null
        }
      ]
    });
  };

  return { scheduleNotification };
};
