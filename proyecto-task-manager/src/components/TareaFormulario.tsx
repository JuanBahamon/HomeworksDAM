import React, { useState } from 'react';
import { IonItem, IonInput, IonButton, IonIcon } from '@ionic/react';
import { addOutline } from 'ionicons/icons';

interface Props {
  alAgregar: (titulo: string) => void;
}

const TareaFormulario: React.FC<Props> = ({ alAgregar }) => {
  const [titulo, setTitulo] = useState('');

  const manejarAgregar = () => {
    if (titulo.trim() === '') return;
    alAgregar(titulo.trim());
    setTitulo('');
  };

  return (
    <IonItem>
      <IonInput
        value={titulo}
        placeholder="Nueva tarea..."
        onIonInput={(e) => setTitulo(e.detail.value!)}
        onKeyDown={(e) => e.key === 'Enter' && manejarAgregar()}
      />
      <IonButton slot="end" onClick={manejarAgregar}>
        <IonIcon icon={addOutline} />
      </IonButton>
    </IonItem>
  );
};

export default TareaFormulario;