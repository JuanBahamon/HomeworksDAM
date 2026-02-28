import React, { useState, useEffect } from 'react';
import {
  IonApp,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonPage,
  setupIonicReact
} from '@ionic/react';

/* Ionic CSS */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

import Imagen2 from './assets/imagen2.jpg';
import ListaContactos from './components/ListaContactos';
import FormularioContacto from './components/FormularioContacto';
import Cargador from './components/Cargador';

setupIonicReact();

const contactosIniciales = [
  { id: 1, nombre: 'Juan Pérez', telefono: '3001234567' },
  { id: 2, nombre: 'María García', telefono: '3012345678' },
  { id: 3, nombre: 'Carlos López', telefono: '3023456789' },
  { id: 4, nombre: 'Ana Martínez', telefono: '3034567890' }
];

function App() {
  const [contactos, setContactos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarContactos = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setContactos(contactosIniciales);
      setCargando(false);
    };
    cargarContactos();
  }, []);

  const agregarContacto = (nombre, telefono) => {
    const nuevoContacto = { id: Date.now(), nombre, telefono };
    setContactos([...contactos, nuevoContacto]);
  };

  const eliminarContacto = (id) => {
    setContactos(contactos.filter(contacto => contacto.id !== id));
  };

  return (
    <IonApp>
      <IonPage>
        <IonHeader>
          <IonToolbar color="primary">
            <div style={{ display: 'flex', alignItems: 'center', padding: '8px 16px', gap: '12px' }}>
              <img src={Imagen2} alt="Logo App" width="40" style={{ borderRadius: '50%' }} />
              <IonTitle>Gestión de Contactos</IonTitle>
            </div>
          </IonToolbar>
        </IonHeader>

        <IonContent className="ion-padding">
          {cargando ? (
            <Cargador />
          ) : (
            <>
              <FormularioContacto alAgregarContacto={agregarContacto} />
              <ListaContactos
                contactos={contactos}
                alEliminarContacto={eliminarContacto}
              />
            </>
          )}
        </IonContent>
      </IonPage>
    </IonApp>
  );
}

export default App;