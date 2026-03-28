import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonButton, 
  IonIcon,
  IonList,
  IonItem,
  IonLabel
} from '@ionic/react';
import { locationOutline, cameraOutline } from 'ionicons/icons';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Challenge 07 - Sensores</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Mis Sensores</IonTitle>
          </IonToolbar>
        </IonHeader>

        <p>Selecciona un sensor para probar su funcionamiento:</p>

        <IonList>

          <IonItem button routerLink="/geolocation">
            <IonIcon slot="start" icon={locationOutline} color="primary" />
            <IonLabel>
              <h2>Geolocalización</h2>
              <p>Obtener coordenadas GPS en tiempo real</p>
            </IonLabel>
          </IonItem>

          <IonItem button routerLink="/camera">
            <IonIcon slot="start" icon={cameraOutline} color="secondary" />
            <IonLabel>
              <h2>Cámara</h2>
              <p>Tomar fotos o usar la galería</p>
            </IonLabel>
          </IonItem>
        </IonList>

        <div className="ion-margin-top" style={{ textAlign: 'center' }}>
          <small>Práctica de Desarrollo de Software para Plataformas Móviles</small>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;