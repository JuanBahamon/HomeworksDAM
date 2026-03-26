import React from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonButtons,
  useIonViewWillEnter
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import TareaFormulario from '../components/TareaFormulario';
import TareaLista from '../components/TareaLista';
import { useAuthContexto } from '../context/AuthContexto';
import { useTareasContexto } from '../context/TareasContexto';
import './Home.css';

const Home: React.FC = () => {
  const { cerrarSesion } = useAuthContexto();
  const { tareas, recargarTareas, agregarTarea, completarTarea, eliminarTarea } = useTareasContexto();
  const historial = useHistory();

  useIonViewWillEnter(() => {
    recargarTareas();
  });

  const manejarCerrarSesion = async () => {
    await cerrarSesion();
    historial.replace('/login');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mis Tareas</IonTitle>
          <IonButtons slot="end">
            <IonButton fill="clear" onClick={manejarCerrarSesion}>
              Salir
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <TareaFormulario alAgregar={agregarTarea} />
        <TareaLista
          tareas={tareas}
          alCompletar={completarTarea}
          alEliminar={eliminarTarea}
        />
      </IonContent>
    </IonPage>
  );
};

export default Home;