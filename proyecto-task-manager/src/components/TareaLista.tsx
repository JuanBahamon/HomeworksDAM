import React from 'react';
import { IonList, IonListHeader, IonLabel, IonItem } from '@ionic/react';
import { Tarea } from '../models/tarea';
import TareaItem from './TareaItem';

interface Props {
  tareas: Tarea[];
  alCompletar: (id: number) => void;
  alEliminar: (id: number) => void;
}

const TareaLista: React.FC<Props> = ({ tareas, alCompletar, alEliminar }) => {
  return (
    <IonList>
      <IonListHeader>
        <IonLabel>Mis Tareas ({tareas.length})</IonLabel>
      </IonListHeader>

      {tareas.length === 0 ? (
        <IonItem>
          <IonLabel color="medium">No hay tareas aún. ¡Agrega una!</IonLabel>
        </IonItem>
      ) : (
        tareas.map((tarea) => (
          <TareaItem
            key={tarea.id}
            tarea={tarea}
            alCompletar={alCompletar}
            alEliminar={alEliminar}
          />
        ))
      )}
    </IonList>
  );
};

export default TareaLista;