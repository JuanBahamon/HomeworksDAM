import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
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
  IonButton,
  IonIcon,
  useIonAlert
} from '@ionic/react';
import { trashOutline } from 'ionicons/icons';

function DetallesContacto({ contactos, alEliminarContacto }) {
  const { id } = useParams();
  const history = useHistory();
  const [presentAlert] = useIonAlert();

  const contacto = contactos.find(c => c.id === parseInt(id));

  if (!contacto) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar color="primary">
            <IonButtons slot="start">
              <IonBackButton defaultHref="/home" />
            </IonButtons>
            <IonTitle>Detalle</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <p>Contacto no encontrado.</p>
        </IonContent>
      </IonPage>
    );
  }

  const manejarEliminar = () => {
    presentAlert({
      header: 'Eliminar contacto',
      message: `¿Estás seguro de eliminar a ${contacto.nombre}?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            alEliminarContacto(contacto.id);
            history.push('/home');
          }
        }
      ]
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Detalle del Contacto</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <div style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: '#3880ff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <span style={{ color: 'white', fontSize: '48px', fontWeight: 'bold' }}>
              {contacto.nombre.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>

        <IonItem>
          <IonLabel>
            <p>Nombre</p>
            <h2>{contacto.nombre}</h2>
          </IonLabel>
        </IonItem>

        <IonItem>
          <IonLabel>
            <p>Teléfono</p>
            <h2>{contacto.telefono}</h2>
          </IonLabel>
        </IonItem>

        <IonButton
          expand="block"
          color="danger"
          style={{ marginTop: '24px' }}
          onClick={manejarEliminar}
        >
          <IonIcon slot="start" icon={trashOutline} />
          Eliminar Contacto
        </IonButton>
      </IonContent>
    </IonPage>
  );
}

export default DetallesContacto;