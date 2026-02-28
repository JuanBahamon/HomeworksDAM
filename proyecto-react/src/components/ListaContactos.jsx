import React from 'react';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonText
} from '@ionic/react';
import ItemContacto from './ItemContacto';

function ListaContactos({ contactos, alEliminarContacto }) {
  if (contactos.length === 0) {
    return (
      <IonCard>
        <IonCardContent>
          <IonText color="medium">
            <p style={{ textAlign: 'center' }}>No hay contactos. ¡Agrega uno nuevo!</p>
          </IonText>
        </IonCardContent>
      </IonCard>
    );
  }

  return (
    <IonCard style={{ marginTop: '16px' }}>
      <IonCardHeader>
        <IonCardTitle>Lista de Contactos ({contactos.length})</IonCardTitle>
      </IonCardHeader>
      <IonCardContent style={{ padding: 0 }}>
        <IonList>
          {contactos.map(contacto => (
            <ItemContacto
              key={contacto.id}
              contacto={contacto}
              alEliminar={alEliminarContacto}
            />
          ))}
        </IonList>
      </IonCardContent>
    </IonCard>
  );
}

export default ListaContactos;