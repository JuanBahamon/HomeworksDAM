import { LocalNotifications } from '@capacitor/local-notifications';

export const useLocalNotifications = () => {
  const requestPermissions = async () => {
    await LocalNotifications.requestPermissions();
  };

  const notifyTrackingStarted = async () => {
    await LocalNotifications.schedule({
      notifications: [{
        title: "Tracking iniciado",
        body: "Se está registrando tu ubicación",
        id: 1,
        schedule: { at: new Date(Date.now() + 500) },
        sound: undefined,
        attachments: undefined,
        actionTypeId: "",
        extra: null
      }]
    });
  };

  const notifyTrackingStopped = async () => {
    await LocalNotifications.schedule({
      notifications: [{
        title: "Tracking detenido",
        body: "Se dejó de registrar tu ubicación",
        id: 2,
        schedule: { at: new Date(Date.now() + 500) },
        sound: undefined,
        attachments: undefined,
        actionTypeId: "",
        extra: null
      }]
    });
  };

  const notifyLowBattery = async () => {
    await LocalNotifications.schedule({
      notifications: [{
        title: "Batería baja",
        body: "El tracking se detuvo por batería baja",
        id: 3,
        schedule: { at: new Date(Date.now() + 500) },
        sound: undefined,
        attachments: undefined,
        actionTypeId: "",
        extra: null
      }]
    });
  };

  const notifyNoMovement = async () => {
    await LocalNotifications.schedule({
      notifications: [{
        title: "Sin movimiento",
        body: "Llevas mucho tiempo sin moverte",
        id: 4,
        schedule: { at: new Date(Date.now() + 500) },
        sound: undefined,
        attachments: undefined,
        actionTypeId: "",
        extra: null
      }]
    });
  };

  return {
    requestPermissions,
    notifyTrackingStarted,
    notifyTrackingStopped,
    notifyLowBattery,
    notifyNoMovement
  };
};
