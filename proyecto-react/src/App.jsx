import React, { useState, useEffect } from 'react';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router-dom';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

import Home from './pages/Home';
import DetallesContacto from './pages/DetalleContacto';
import CrearContacto from './pages/CrearContacto';

setupIonicReact();

const contactosIniciales = [
{ id : 1, nombre: 'Juan Bahamon', telefono: '3246022537'},
{ id : 2, nombre: 'Maria Gomez' , telefono: '3165356013'},
{ id : 3, nombre: 'Carlos Perez' , telefono: '3157896543'},
{ id : 4, nombre: 'Ana Rodriguez' , telefono: '3174561230'},
{ id : 5, nombre: 'Luis Martinez' , telefono: '3196543210'},
];

function App() {
  const [contactos, setContactos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setContactos(contactosIniciales);
      setCargando(false);
    }, 2000);
  }, []);

  const agregarContacto = (nombre, telefono) => {
    const nuevoContacto = { id: Date.now(), nombre, telefono };
    setContactos([...contactos, nuevoContacto]);
  };

  const eliminarContacto = (id) => {
    setContactos(contactos.filter(c => c.id !== id));
  };

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/home">
            <Home
              contactos={contactos}
              cargando={cargando}
              alEliminarContacto={eliminarContacto}
            />
          </Route>

          <Route exact path="/contacto/:id">
            <DetallesContacto
              contactos={contactos}
              alEliminarContacto={eliminarContacto}
            />
          </Route>

          <Route exact path="/crear">
            <CrearContacto alAgregarContacto={agregarContacto} />
          </Route>

          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;