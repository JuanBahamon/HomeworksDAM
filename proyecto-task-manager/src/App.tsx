import React from 'react';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router-dom';

import { AuthProveedor, useAuthContexto } from './context/AuthContexto';
import { TareasProveedor } from './context/TareasContexto';

import Login from './pages/Login';
import Registro from './pages/Registro';
import Home from './pages/Home';
import DetalleTarea from './pages/DetalleTarea';
import AgregarEditarTarea from './pages/AgregarEditarTarea';

/* Estilos base de Ionic */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

setupIonicReact();

// Ruta protegida: redirige a /login si no hay usuario autenticado
const RutaProtegida: React.FC<{ component: React.FC; path: string; exact?: boolean }> = ({
  component: Componente,
  path,
  exact
}) => {
  const { usuario, cargando } = useAuthContexto();

  return (
    <Route
      path={path}
      exact={exact}
      render={() => {
        if (cargando) return null;
        return usuario ? <Componente /> : <Redirect to="/login" />;
      }}
    />
  );
};

const Rutas: React.FC = () => (
  <IonRouterOutlet>
    <Route exact path="/login" component={Login} />
    <Route exact path="/registro" component={Registro} />
    <RutaProtegida exact path="/tareas" component={Home} />
    <RutaProtegida exact path="/tareas/agregar" component={AgregarEditarTarea} />
    <RutaProtegida exact path="/tareas/editar/:id" component={AgregarEditarTarea} />
    <RutaProtegida exact path="/tareas/detalle/:id" component={DetalleTarea} />
    <Redirect exact from="/" to="/login" />
  </IonRouterOutlet>
);

const App: React.FC = () => (
  <IonApp>
    <TareasProveedor>
      <AuthProveedor>
        <IonReactRouter>
          <Rutas />
        </IonReactRouter>
      </AuthProveedor>
    </TareasProveedor>
  </IonApp>
);

export default App;