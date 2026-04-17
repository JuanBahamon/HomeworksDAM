import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonButtons, IonBackButton, IonButton, IonList, IonItem, IonLabel
} from '@ionic/react';
import { useLocalNotifications } from '../hooks/useLocalNotification';

const NotificationPage: React.FC = () => {
  const {
    requestPermissions,
    notifyTrackingStarted,
    notifyTrackingStopped,
    notifyLowBattery,
    notifyNoMovement
  } = useLocalNotifications();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="success">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Notificaciones</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonLabel>
              <h2>Permisos</h2>
              <p>Solicitar permisos de notificación</p>
            </IonLabel>
          </IonItem>
          <IonButton expand="block" color="primary" onClick={requestPermissions} className="ion-margin">
            Pedir Permisos
          </IonButton>

          <IonItem>
            <IonLabel>
              <h2>Tracking iniciado</h2>
              <p>Notificación al iniciar tracking</p>
            </IonLabel>
          </IonItem>
          <IonButton expand="block" color="success" onClick={notifyTrackingStarted} className="ion-margin">
            Notificar inicio
          </IonButton>

          <IonItem>
            <IonLabel>
              <h2>Tracking detenido</h2>
              <p>Notificación al detener tracking</p>
            </IonLabel>
          </IonItem>
          <IonButton expand="block" color="danger" onClick={notifyTrackingStopped} className="ion-margin">
            Notificar detención
          </IonButton>

          <IonItem>
            <IonLabel>
              <h2>Batería baja</h2>
              <p>Notificación de batería baja</p>
            </IonLabel>
          </IonItem>
          <IonButton expand="block" color="warning" onClick={notifyLowBattery} className="ion-margin">
            Notificar batería baja
          </IonButton>

          <IonItem>
            <IonLabel>
              <h2>Sin movimiento</h2>
              <p>Notificación por inactividad</p>
            </IonLabel>
          </IonItem>
          <IonButton expand="block" color="medium" onClick={notifyNoMovement} className="ion-margin">
            Notificar sin movimiento
          </IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default NotificationPage;