import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonBackButton, IonButtons } from '@ionic/react';
import { useGeolocation } from '../hooks/useGeolocation';

const GeolocationPage: React.FC = () => {
  const { position, getCurrentLocation } = useGeolocation();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start"><IonBackButton /></IonButtons>
          <IonTitle>Sensor de Ubicación</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonButton expand="block" onClick={getCurrentLocation}>Obtener Ubicación Actual</IonButton>
        {position && (
          <div style={{ marginTop: '20px' }}>
            <p><b>Latitud:</b> {position.latitude}</p>
            <p><b>Longitud:</b> {position.longitude}</p>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default GeolocationPage;