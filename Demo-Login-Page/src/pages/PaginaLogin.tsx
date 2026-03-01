import { IonButton, IonContent, IonInput, IonItem, IonLabel, IonPage, IonText } from '@ionic/react';
import { Preferences } from '@capacitor/preferences';
import { useState } from 'react';

const PaginaLogin: React.FC = () => {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');

  const manejarLogin = async () => {
    if (correo === 'user@mail.com' && contraseña === '123') {
      await Preferences.set({ key: 'sesion_iniciada', value: 'true' });
      window.location.href = '/home'; 
    } else {
      setError('Correo o contraseña incorrectos');
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonText color="primary"><h1>Iniciar Sesión</h1></IonText>

        <IonItem>
          <IonLabel position="floating">Correo</IonLabel>
          <IonInput type="email" value={correo} onIonChange={e => setCorreo(e.detail.value!)} />
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Contraseña</IonLabel>
          <IonInput type="password" value={contraseña} onIonChange={e => setContraseña(e.detail.value!)} />
        </IonItem>

        {error && <IonText color="danger"><p>{error}</p></IonText>}

        <IonButton expand="block" onClick={manejarLogin} className="ion-margin-top">
          Iniciar Sesión
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default PaginaLogin;