import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonButtons, 
  IonBackButton, 
  IonButton, 
  IonIcon,
  IonImg
} from '@ionic/react';
import { camera } from 'ionicons/icons';
import { useCamera } from '../hooks/useCamera';

const CameraPage: React.FC = () => {
  const { photo, takePhoto } = useCamera();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="secondary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Sensor de Cámara</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div style={{ textAlign: 'center' }}>
          <h3>Captura de Imagen</h3>
          
          <IonButton expand="block" onClick={takePhoto}>
            <IonIcon slot="start" icon={camera} />
            Tomar Foto / Galería
          </IonButton>

          {photo ? (
            <div style={{ marginTop: '20px' }}>
              <IonImg src={photo} alt="Foto capturada" />
            </div>
          ) : (
            <p style={{ marginTop: '20px', color: 'gray' }}>
              Aún no has capturado ninguna imagen.
            </p>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CameraPage;