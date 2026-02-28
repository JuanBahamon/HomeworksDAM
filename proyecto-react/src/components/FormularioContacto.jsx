import React, { useState } from 'react';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonInput,
  IonButton,
  IonIcon,
  useIonAlert
} from '@ionic/react';
import { personAddOutline } from 'ionicons/icons';

function FormularioContacto({ alAgregarContacto }) {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [presentAlert] = useIonAlert();

  const manejarEnvio = () => {
    if (!nombre.trim() || !telefono.trim()) {
      presentAlert({
        header: 'Campos incompletos',
        message: 'Por favor completa todos los campos',
        buttons: ['OK']
      });
      return;
    }

    alAgregarContacto(nombre, telefono);
    setNombre('');
    setTelefono('');
  };

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Agregar Nuevo Contacto</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonItem>
          <IonInput
            placeholder="Nombre completo"
            value={nombre}
            onIonInput={(e) => setNombre(e.detail.value)}
            clearInput
          />
        </IonItem>
        <IonItem>
          <IonInput
            type="tel"
            placeholder="Teléfono"
            value={telefono}
            onIonInput={(e) => setTelefono(e.detail.value)}
            clearInput
          />
        </IonItem>
        <IonButton
          expand="block"
          onClick={manejarEnvio}
          style={{ marginTop: '16px' }}
        >
          <IonIcon slot="start" icon={personAddOutline} />
          Agregar Contacto
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
}

export default FormularioContacto;