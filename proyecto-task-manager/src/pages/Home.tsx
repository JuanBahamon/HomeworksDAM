import React, { useState, useEffect } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle,
  IonContent
} from '@ionic/react';
import { Tarea } from '../models/tarea';
import TareaFormulario from '../components/TareaFormulario';
import TareaLista from '../components/TareaLista';

const Home: React.FC = () => {
  const [tareas, setTareas] = useState<Tarea[]>([]);

  // Efecto: cargar tareas del localStorage al iniciar
  useEffect(() => {
    const guardadas = localStorage.getItem('tareas');
    if (guardadas) {
      setTareas(JSON.parse(guardadas));
    }
  }, []);

  // Efecto: guardar tareas en localStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem('tareas', JSON.stringify(tareas));
  }, [tareas]);

  const agregarTarea = (titulo: string) => {
    const nuevaTarea: Tarea = {
      id: Date.now(),
      titulo,
      completada: false,
    };
    setTareas([...tareas, nuevaTarea]);
  };

  const completarTarea = (id: number) => {
    setTareas(tareas.map((t) =>
      t.id === id ? { ...t, completada: !t.completada } : t
    ));
  };

  const eliminarTarea = (id: number) => {
    setTareas(tareas.filter((t) => t.id !== id));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Mis Tareas</IonTitle>
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