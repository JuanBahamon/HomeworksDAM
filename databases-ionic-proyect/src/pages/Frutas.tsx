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
} from '@ionic/react';
import { trashOutline, createOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import useDexie from '../hooks/useDexie';

const Frutas: React.FC = () => {
  const { results, manualResults, isPending, error, add, update, deleteItem, getByProveedor } = useDexie('frutas');

  const historial = useHistory();

  const [nombre, setNombre] = useState('');
  const [proveedor, setProveedor] = useState('');
  const [editando, setEditando] = useState<any>(null);

  const [filtroProveedor, setFiltroProveedor] = useState('');
  const [resultadosFiltro, setResultadosFiltro] = useState<any[]>([]);
  const [mostrandoFiltro, setMostrandoFiltro] = useState(false);

  const handleAgregar = async () => {
    if (!nombre.trim()) return;

    if (editando) {
      await update(editando.id, { nombre, proveedor });
      setEditando(null);
    } else {
      await add({ nombre, proveedor });
    }

    setNombre('');
    setProveedor('');
  };

  const handleEditar = (fruta: any) => {
    setEditando(fruta);
    setNombre(fruta.nombre);
    setProveedor(fruta.proveedor || '');
  };

  const handleEliminar = async (id: number) => {
    await deleteItem(id);
  };

  const handleFiltrarProveedor = async () => {
    if (!filtroProveedor.trim()) return;
    const data = await getByProveedor(filtroProveedor.trim());
    setResultadosFiltro(data);
    setMostrandoFiltro(true);
  };

  const handleLimpiarFiltro = () => {
    setResultadosFiltro([]);
    setFiltroProveedor('');
    setMostrandoFiltro(false);
  };

  const listaActual = mostrandoFiltro ? resultadosFiltro : results;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Frutas</IonTitle>
          <IonButtons slot="end">
            <IonButton fill="clear" onClick={() => historial.push('/contactos')}>
              Contactos
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">

        <IonItem>
          <IonLabel position="floating">Nombre de la fruta</IonLabel>
          <IonInput
            placeholder="Ej: Mango"
            value={nombre}
            onIonInput={(e) => setNombre(e.detail.value!)}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Proveedor</IonLabel>
          <IonInput
            placeholder="Ej: Frutos del Valle"
            value={proveedor}
            onIonInput={(e) => setProveedor(e.detail.value!)}
          />
        </IonItem>

        <IonButton
          expand="block"
          className="ion-margin-top"
          onClick={handleAgregar}
          disabled={isPending}
        >
          {isPending ? <IonSpinner name="crescent" /> : (editando ? 'Guardar Cambios' : 'Agregar')}
        </IonButton>

        {editando && (
          <IonButton
            expand="block"
            fill="outline"
            color="medium"
            className="ion-margin-top"
            onClick={() => { setEditando(null); setNombre(''); setProveedor(''); }}
          >
            Cancelar edición
          </IonButton>
        )}

        {error && (
          <IonText color="danger">
            <p>{error}</p>
          </IonText>
        )}

        <div style={{ marginTop: 16, padding: '8px', background: 'var(--ion-color-light)', borderRadius: 8 }}>
          <p style={{ margin: '0 0 8px', fontWeight: 'bold' }}>🔍 Filtrar por proveedor (newFunction)</p>
          <IonItem lines="none">
            <IonInput
              placeholder="Nombre del proveedor"
              value={filtroProveedor}
              onIonInput={(e) => setFiltroProveedor(e.detail.value!)}
            />
          </IonItem>
          <IonButton expand="block" size="small" onClick={handleFiltrarProveedor}>
            Buscar
          </IonButton>
          {mostrandoFiltro && (
            <IonButton expand="block" size="small" fill="outline" onClick={handleLimpiarFiltro}>
              Mostrar todas
            </IonButton>
          )}
        </div>

        <IonList className="ion-margin-top">
          {listaActual.map((fruta: any) => (
            <IonItem key={fruta.id}>
              <IonLabel>
                <h2>{fruta.nombre}</h2>
                {fruta.proveedor && <p>Proveedor: {fruta.proveedor}</p>}
              </IonLabel>
              <IonButton
                slot="end"
                fill="clear"
                onClick={() => handleEditar(fruta)}
              >
                <IonIcon icon={createOutline} />
              </IonButton>
              <IonButton
                slot="end"
                fill="clear"
                color="danger"
                onClick={() => handleEliminar(fruta.id)}
              >
                <IonIcon icon={trashOutline} />
              </IonButton>
            </IonItem>
          ))}
        </IonList>

        <IonButton expand="block" fill="outline" className="ion-margin-top" onClick={() => historial.push('/tareas')}>
          Ir a Tareas
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Frutas;
