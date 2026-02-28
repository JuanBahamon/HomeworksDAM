import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonAvatar,
  IonFab,
  IonFabButton,
  IonIcon,
  IonText
} from '@ionic/react';
import { addOutline } from 'ionicons/icons';
import Cargador from '../components/Cargador';

function Home({ contactos, cargando, alEliminarContacto }) {
  const history = useHistory();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Gestión de Contactos</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {cargando ? (
          <Cargador />
        ) : (
          <>
            {contactos.length === 0 ? (
              <IonText color="medium">
                <p style={{ textAlign: 'center' }}>No hay contactos. ¡Agrega uno nuevo!</p>
              </IonText>
            ) : (
              <IonList>
                {contactos.map(contacto => (
                  <IonItem
                    key={contacto.id}
                    button
                    onClick={() => history.push(`/contacto/${contacto.id}`)}
                  >
                    <IonAvatar slot="start" style={{ background: '#3880ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }}>
                        {contacto.nombre.charAt(0).toUpperCase()}
                      </span>
                    </IonAvatar>
                    <IonLabel>
                      <h2>{contacto.nombre}</h2>
                      <p>{contacto.telefono}</p>
                    </IonLabel>
                  </IonItem>
                ))}
              </IonList>
            )}
          </>
        )}

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => history.push('/crear')}>
            <IonIcon icon={addOutline} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
}

export default Home;