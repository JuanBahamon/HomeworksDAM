import React from 'react';
import { IonItem, IonLabel, IonCheckbox, IonButton, IonIcon } from '@ionic/react';
import { trashOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { Tarea } from '../models/tarea';

interface Props {
  tarea: Tarea;
  alCompletar: (id: number) => void;
  alEliminar: (id: number) => void;
}

const TareaItem: React.FC<Props> = ({ tarea, alCompletar, alEliminar }) => {
  const historial = useHistory();

  return (
    <IonItem>
      <IonCheckbox
        slot="start"
        checked={tarea.completada}
        onIonChange={() => alCompletar(tarea.id)}
      />
      <IonLabel
        style={{ textDecoration: tarea.completada ? 'line-through' : 'none', cursor: 'pointer' }}
        onClick={(e) => {
          e.stopPropagation();
          historial.replace(`/tareas/detalle/${tarea.id}`);
        }}
      >
        {tarea.titulo}
      </IonLabel>
      <IonButton
        slot="end"
        fill="clear"
        color="danger"
        onClick={() => alEliminar(tarea.id)}
      >
        <IonIcon icon={trashOutline} />
      </IonButton>
    </IonItem>
  );
};

export default TareaItem;