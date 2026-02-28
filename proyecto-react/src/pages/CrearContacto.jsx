import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonBackButton,
  IonButtons,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  useIonAlert
} from '@ionic/react';

function CrearContacto({ alAgregarContacto }) {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const history = useHistory();
  const [presentAlert] = useIonAlert();

  const manejarGuardar = () => {
    if (!nombre.trim() || !telefono.trim()) {
      presentAlert({
        header: 'Campos incompletos',
        message: 'Por favor completa todos los campos',
        buttons: ['OK']
      });
      return;
    }

    alAgregarContacto(nombre, telefono);

    history.push('/home');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Nuevo Contacto</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="floating">Nombre completo</IonLabel>
          <IonInput
            value={nombre}
            onIonInput={(e) => setNombre(e.detail.value)}
            clearInput
          />
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Teléfono</IonLabel>
          <IonInput
            type="tel"
            value={telefono}
            onIonInput={(e) => setTelefono(e.detail.value)}
            clearInput
          />
        </IonItem>

        <IonButton
          expand="block"
          style={{ marginTop: '24px'}}
          onClick={manejarGuardar}
        >
          Guardar Contacto
        </IonButton>

        <IonButton
          expand="block"
          fill="outline"
          color="medium"
          style={{ marginTop: '8px' }}
          onClick={() => history.push('/home')}
        >
          Cancelar
        </IonButton>
      </IonContent>
    </IonPage>
  );
}

export default CrearContacto;