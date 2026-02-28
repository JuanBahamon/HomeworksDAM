import React from 'react';
import {
  IonItem,
  IonAvatar,
  IonLabel,
  IonButton,
  IonIcon,
  useIonAlert
} from '@ionic/react';
import { trashOutline } from 'ionicons/icons';

function ItemContacto({ contacto, alEliminar }) {
  const [presentAlert] = useIonAlert();

  const manejarEliminar = () => {
    presentAlert({
      header: 'Confirmar eliminación',
      message: `¿Estás seguro de eliminar a ${contacto.nombre}?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => alEliminar(contacto.id)
        }
      ]
    });
  };

  return (
    <IonItem>
      <IonAvatar slot="start" style={{ background: '#3880ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }}>
          {contacto.nombre.charAt(0).toUpperCase()}
        </span>
      </IonAvatar>
      <IonLabel>
        <h2>{contacto.nombre}</h2>
        <p>{contacto.telefono}</p>
      </IonLabel>
      <IonButton
        fill="clear"
        color="danger"
        slot="end"
        onClick={manejarEliminar}
        aria-label="Eliminar contacto"
      >
        <IonIcon icon={trashOutline} />
      </IonButton>
    </IonItem>
  );
}

export default ItemContacto;