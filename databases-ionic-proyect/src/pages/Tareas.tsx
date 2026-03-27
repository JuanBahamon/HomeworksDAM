import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonList,
  IonIcon,
  IonSpinner,
  IonText,
  IonButtons,
  IonCheckbox,
} from '@ionic/react';
import { trashOutline, wifiOutline, cellularOutline, cloudOfflineOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import useRealTimeCollection from '../hooks/useRealTimeCollection';
import useNetwork from '../hooks/useNetwork';

const Tareas: React.FC = () => {
  const { results, isPending, error, add, update, deleteDoc } = useRealTimeCollection('tareas');
  const { isOnline, connectionType } = useNetwork();
  const historial = useHistory();

  const [titulo, setTitulo] = useState('');

  const getIcon = () => {
    if (!isOnline) return cloudOfflineOutline;
    if (connectionType === 'wifi') return wifiOutline;
    return cellularOutline;
  };

  const handleAgregar = async () => {
    if (!titulo.trim()) return;
    await add({ titulo, completada: false });
    setTitulo('');
  };

  const handleCompletar = async (tarea: any) => {
    await update(tarea.id, {
      titulo: tarea.titulo,
      completada: !tarea.completada,
    });
  };

  const handleEliminar = async (id: string) => {
    await deleteDoc(id);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tareas</IonTitle>
          <IonButtons slot="end">
            <IonIcon icon={getIcon()} color={isOnline ? 'success' : 'danger'} style={{ marginRight: 8 }} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">

        {!isOnline && (
          <IonText color="danger">
            <p className="ion-text-center">
              <IonIcon icon={cloudOfflineOutline} /> Sin conexión — acciones deshabilitadas
            </p>
          </IonText>
        )}

        <IonItem>
          <IonLabel position="floating">Nueva tarea</IonLabel>
          <IonInput
            value={titulo}
            onIonInput={(e) => setTitulo(e.detail.value!)}
            disabled={!isOnline}
          />
        </IonItem>

        <IonButton
          expand="block"
          className="ion-margin-top"
          onClick={handleAgregar}
          disabled={isPending || !isOnline}
        >
          {isPending ? <IonSpinner name="crescent" /> : 'Agregar Tarea'}
        </IonButton>

        {error && (
          <IonText color="danger">
            <p>{error}</p>
          </IonText>
        )}

        <IonList className="ion-margin-top">
          {results.map((tarea: any) => (
            <IonItem key={tarea.id}>
              <IonCheckbox
                slot="start"
                checked={tarea.completada}
                onIonChange={() => handleCompletar(tarea)}
                disabled={!isOnline}
              />
              <IonLabel style={{ textDecoration: tarea.completada ? 'line-through' : 'none' }}>
                {tarea.titulo}
              </IonLabel>
              <IonButton
                slot="end"
                fill="clear"
                color="danger"
                onClick={() => handleEliminar(tarea.id)}
                disabled={!isOnline}
              >
                <IonIcon icon={trashOutline} />
              </IonButton>
            </IonItem>
          ))}
        </IonList>

        <IonButton expand="block" fill="outline" className="ion-margin-top" onClick={() => historial.push('/contactos')}>
          Ir a Contactos
        </IonButton>
        <IonButton expand="block" fill="outline" className="ion-margin-top" onClick={() => historial.push('/frutas')}>
          Ir a Frutas
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Tareas;
