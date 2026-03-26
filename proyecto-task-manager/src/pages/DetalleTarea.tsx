import React from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonButton,
  IonButtons,
  IonBackButton,
  IonBadge,
  useIonViewWillEnter
} from '@ionic/react';
import { useParams, useHistory } from 'react-router-dom';
import { useTareasContexto } from '../context/TareasContexto';

interface Params {
  id: string;
}

const DetalleTarea: React.FC = () => {
  const { id } = useParams<Params>();
  const { tareas, recargarTareas, eliminarTarea } = useTareasContexto();
  const historial = useHistory();

  useIonViewWillEnter(() => {
    recargarTareas();
  });

  if (!id) return null;

  const tarea = tareas.find((t) => t.id === Number(id));

  if (!tarea) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/tareas" />
            </IonButtons>
            <IonTitle>Detalle</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonLabel color="medium">Tarea no encontrada.</IonLabel>
        </IonContent>
      </IonPage>
    );
  }

  const manejarEliminar = () => {
    eliminarTarea(tarea.id);
    historial.push('/tareas');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tareas" />
          </IonButtons>
          <IonTitle>Detalle de Tarea</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel>
            <h2>{tarea.titulo}</h2>
          </IonLabel>
          <IonBadge color={tarea.completada ? 'success' : 'warning'} slot="end">
            {tarea.completada ? 'Completada' : 'Pendiente'}
          </IonBadge>
        </IonItem>

        <IonButton
          expand="block"
          className="ion-margin-top"
          onClick={() => historial.replace(`/tareas/editar/${tarea.id}`)}
        >
          Editar
        </IonButton>

        <IonButton
          expand="block"
          color="danger"
          fill="outline"
          className="ion-margin-top"
          onClick={manejarEliminar}
        >
          Eliminar
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default DetalleTarea;