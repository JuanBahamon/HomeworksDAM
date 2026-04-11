import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonButtons, 
  IonBackButton, 
  IonList, 
  IonItem, 
  IonLabel, 
  IonNote,
  IonButton
} from '@ionic/react';
import { useDevice } from '../hooks/useDevice';

const DevicePage: React.FC = () => {
  const { info, battery, getDeviceInfo } = useDevice();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="warning">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Información del Dispositivo</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonList lines="full">
          <IonItem>
            <IonLabel>Modelo</IonLabel>
            <IonNote slot="end">{info?.model}</IonNote>
          </IonItem>
          
          <IonItem>
            <IonLabel>Sistema Operativo</IonLabel>
            <IonNote slot="end">{info?.platform} (v{info?.osVersion})</IonNote>
          </IonItem>

          <IonItem>
            <IonLabel>Nivel de Batería</IonLabel>
            <IonNote slot="end">
                {battery?.batteryLevel ? Math.round(battery.batteryLevel * 100) : 0}%
            </IonNote>
          </IonItem>

          <IonItem>
            <IonLabel>¿Cargando?</IonLabel>
            <IonNote slot="end">{battery?.isCharging ? "Sí" : "No"}</IonNote>
          </IonItem>
        </IonList>

        <IonButton expand="block" color="warning" onClick={getDeviceInfo} className="ion-margin-top">
          Actualizar Información
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default DevicePage;