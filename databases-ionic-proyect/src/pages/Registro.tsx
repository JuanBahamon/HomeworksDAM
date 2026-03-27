import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonInput,
  IonButton,
  IonLabel,
  IonText,
  useIonViewWillEnter,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useAuthContexto } from '../context/AuthContexto';

const Registro: React.FC = () => {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const { registrar, cargando, error } = useAuthContexto();
  const historial = useHistory();

  useIonViewWillEnter(() => {
    setCorreo('');
    setContrasena('');
  });

  const manejarRegistro = async () => {
    await registrar(correo, contrasena);
    if (!error) {
      historial.replace('/contactos');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Registrarse</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="floating">Correo</IonLabel>
          <IonInput
            type="email"
            value={correo}
            onIonInput={(e) => setCorreo(e.detail.value!)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Contraseña</IonLabel>
          <IonInput
            type="password"
            value={contrasena}
            onIonInput={(e) => setContrasena(e.detail.value!)}
          />
        </IonItem>

        {error && (
          <IonText color="danger">
            <p className="ion-padding-horizontal">{error}</p>
          </IonText>
        )}

        <IonButton
          expand="block"
          className="ion-margin-top"
          onClick={manejarRegistro}
          disabled={cargando}
        >
          {cargando ? 'Cargando...' : 'Registrarse'}
        </IonButton>

        <IonButton
          expand="block"
          fill="clear"
          onClick={() => historial.replace('/login')}
        >
          ¿Ya tienes cuenta? Inicia sesión
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Registro;
