import React, { useState, useEffect } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonInput,
  IonButton,
  IonLabel,
  IonButtons,
  IonBackButton
} from '@ionic/react';
import { useParams, useHistory } from 'react-router-dom';
import { useTareasContexto } from '../context/TareasContexto';

interface Params {
  id?: string;
}

const AgregarEditarTarea: React.FC = () => {
  const { id } = useParams<Params>();
  const { tareas, agregarTarea, editarTarea } = useTareasContexto();
  const historial = useHistory();
  const [titulo, setTitulo] = useState('');

  const esEdicion = !!id;

  useEffect(() => {
    if (esEdicion) {
      const tarea = tareas.find((t) => t.id === Number(id));
      if (tarea) setTitulo(tarea.titulo);
    }
  }, [id, tareas, esEdicion]);

  const manejarGuardar = () => {
    if (titulo.trim() === '') return;

    if (esEdicion) {
      editarTarea(Number(id), titulo.trim());
    } else {
      agregarTarea(titulo.trim());
    }
    historial.replace('/tareas');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tareas" />
          </IonButtons>
          <IonTitle>{esEdicion ? 'Editar Tarea' : 'Agregar Tarea'}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="floating">Título de la tarea</IonLabel>
          <IonInput
            value={titulo}
            onIonInput={(e) => setTitulo(e.detail.value!)}
          />
        </IonItem>

        <IonButton
          expand="block"
          className="ion-margin-top"
          onClick={manejarGuardar}
        >
          {esEdicion ? 'Guardar Cambios' : 'Agregar'}
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default AgregarEditarTarea;