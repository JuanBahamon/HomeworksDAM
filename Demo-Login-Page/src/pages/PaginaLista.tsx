import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { Preferences } from '@capacitor/preferences';

const PaginaLista: React.FC = () => {

  const manejarLogout = async () => {
    await Preferences.remove({ key: 'sesion_iniciada' });
    window.location.href = '/login';
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Lista</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h2>¡Bienvenido!</h2>
        <p>Estás dentro de la app.</p>
        <IonButton expand="block" color="danger" onClick={manejarLogout}>
          Cerrar Sesión
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default PaginaLista;