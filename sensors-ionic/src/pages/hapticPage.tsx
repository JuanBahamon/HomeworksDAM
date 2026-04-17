import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonButtons, IonBackButton, IonButton, IonList, IonItem, IonLabel
} from '@ionic/react';
import { useHaptics } from '../hooks/useHaptics';

const HapticPage: React.FC = () => {
  const { vibrate, impactLight } = useHaptics();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="danger">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Vibración</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonLabel>
              <h2>Vibración estándar</h2>
              <p>Vibración normal del dispositivo</p>
            </IonLabel>
          </IonItem>
          <IonButton expand="block" color="danger" onClick={vibrate} className="ion-margin">
            Vibrar
          </IonButton>

          <IonItem>
            <IonLabel>
              <h2>Impacto suave</h2>
              <p>Vibración corta tipo feedback</p>
            </IonLabel>
          </IonItem>
          <IonButton expand="block" color="medium" onClick={impactLight} className="ion-margin">
            Impacto suave
          </IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default HapticPage;