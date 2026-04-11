import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton, IonList, IonItem, IonLabel } from '@ionic/react';
import { useMotion } from '../hooks/useMotion';

const MotionPage: React.FC = () => {
  const { accel, orientation } = useMotion();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="tertiary">
          <IonButtons slot="start"><IonBackButton /></IonButtons>
          <IonTitle>Acelerómetro</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h3>Movimiento en tiempo real</h3>
        
        <IonList>
          <IonItem>
            <IonLabel>
              <h2>Aceleración</h2>
              {/* Usamos ?. y || 0 para que no falle si es null */}
              <p>X: {accel?.x?.toFixed(2) || '0.00'}</p>
              <p>Y: {accel?.y?.toFixed(2) || '0.00'}</p>
              <p>Z: {accel?.z?.toFixed(2) || '0.00'}</p>
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonLabel>
              <h2>Orientación (Giroscopio)</h2>
              <p>Alpha: {orientation?.alpha?.toFixed(2) || '0.00'}</p>
              <p>Beta: {orientation?.beta?.toFixed(2) || '0.00'}</p>
              <p>Gamma: {orientation?.gamma?.toFixed(2) || '0.00'}</p>
            </IonLabel>
          </IonItem>
        </IonList>

        <p style={{ color: 'gray', fontSize: '0.9em' }}>
          Nota: Si estás en el navegador de PC, los valores pueden quedarse en 0. Pruébalo en un móvil real o usa las herramientas de desarrollador (Sensors).
        </p>
      </IonContent>
    </IonPage>
  );
};

export default MotionPage;