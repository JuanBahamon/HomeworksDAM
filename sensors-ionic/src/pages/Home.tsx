import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonIcon,
  IonList,
  IonItem,
  IonLabel
} from '@ionic/react';
import { locationOutline, cameraOutline, moveOutline, phonePortraitOutline, notificationsOutline, fingerPrintOutline} from 'ionicons/icons';
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
              <p>Obtener coordenadas GPS</p>
            </IonLabel>
          </IonItem>

          <IonItem button routerLink="/camera">
            <IonIcon slot="start" icon={cameraOutline} color="secondary" />
            <IonLabel>
              <h2>Cámara</h2>
              <p>Tomar fotos o usar la galería</p>
            </IonLabel>
          </IonItem>

          <IonItem button routerLink="/motion">
            <IonIcon slot="start" icon={moveOutline} color="tertiary" />
            <IonLabel>
              <h2>Acelerómetro</h2>
              <p>Detectar movimiento y orientación</p>
            </IonLabel>
          </IonItem>

          <IonItem button routerLink="/device">
            <IonIcon slot="start" icon={phonePortraitOutline} color="warning" />
            <IonLabel>
              <h2>Información del Dispositivo</h2>
              <p>Batería y detalles del sistema</p>
           </IonLabel>
          </IonItem>

          <IonItem button routerLink="/haptics"><IonIcon slot="start" icon={fingerPrintOutline} color="danger" />
            <IonLabel>Vibración</IonLabel>
          </IonItem>
          
          <IonItem button routerLink="/notifications">
            <IonIcon slot="start" icon={notificationsOutline} color="success" />
            <IonLabel>Notificaciones</IonLabel>
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