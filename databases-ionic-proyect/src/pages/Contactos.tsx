import React, { useEffect, useState } from 'react';
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
  IonBadge,
} from '@ionic/react';
import { trashOutline, wifiOutline, cellularOutline, cloudOfflineOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import useCollection from '../hooks/useCollection';
import useNetwork from '../hooks/useNetwork';
import { useAuthContexto } from '../context/AuthContexto';

const Contactos: React.FC = () => {
  const { results, isPending, error, getAll, add, removeDoc } = useCollection('contactos');
  const { isOnline, connectionType } = useNetwork();
  const { cerrarSesion } = useAuthContexto();
  const historial = useHistory();

  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');

  useEffect(() => {
    getAll();
  }, []);

  const getIcon = () => {
    if (!isOnline) return cloudOfflineOutline;
    if (connectionType === 'wifi') return wifiOutline;
    return cellularOutline;
  };

  const handleAgregar = async () => {
    if (!nombre.trim() || !telefono.trim()) return;
    await add({ nombre, telefono });
    setNombre('');
    setTelefono('');
    await getAll();
  };

  const handleEliminar = async (id: string) => {
    await removeDoc(id);
    await getAll();
  };

  const manejarCerrarSesion = async () => {
    await cerrarSesion();
    historial.replace('/login');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Contactos</IonTitle>
          <IonButtons slot="end">
            <IonIcon icon={getIcon()} color={isOnline ? 'success' : 'danger'} style={{ marginRight: 8 }} />
            <IonButton fill="clear" onClick={manejarCerrarSesion}>
              Salir
            </IonButton>
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
          <IonLabel position="floating">Nombre</IonLabel>
          <IonInput
            value={nombre}
            onIonInput={(e) => setNombre(e.detail.value!)}
            disabled={!isOnline}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Teléfono</IonLabel>
          <IonInput
            value={telefono}
            onIonInput={(e) => setTelefono(e.detail.value!)}
            disabled={!isOnline}
          />
        </IonItem>

        <IonButton
          expand="block"
          className="ion-margin-top"
          onClick={handleAgregar}
          disabled={isPending || !isOnline}
        >
          {isPending ? <IonSpinner name="crescent" /> : 'Agregar Contacto'}
        </IonButton>

        {error && (
          <IonText color="danger">
            <p>{error}</p>
          </IonText>
        )}

        <IonList className="ion-margin-top">
          {results.map((contacto: any) => (
            <IonItem key={contacto.id}>
              <IonLabel>
                <h2>{contacto.nombre}</h2>
                <p>{contacto.telefono}</p>
              </IonLabel>
              <IonButton
                slot="end"
                fill="clear"
                color="danger"
                onClick={() => handleEliminar(contacto.id)}
                disabled={!isOnline}
              >
                <IonIcon icon={trashOutline} />
              </IonButton>
            </IonItem>
          ))}
        </IonList>

        <IonButton expand="block" fill="outline" className="ion-margin-top" onClick={() => historial.push('/tareas')}>
          Ir a Tareas
        </IonButton>
        <IonButton expand="block" fill="outline" className="ion-margin-top" onClick={() => historial.push('/frutas')}>
          Ir a Frutas
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Contactos;
