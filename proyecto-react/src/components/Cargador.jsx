import React from 'react';
import { IonSpinner, IonText } from '@ionic/react';

function Cargador() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '80px', gap: '16px' }}>
      <IonSpinner name="crescent" color="primary" style={{ width: '48px', height: '48px' }} />
      <IonText color="medium">
        <p>Cargando contactos...</p>
      </IonText>
    </div>
  );
}

export default Cargador;