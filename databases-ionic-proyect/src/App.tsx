import React from 'react';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router-dom';

import { AuthProveedor, useAuthContexto } from './context/AuthContexto';

import Login from './pages/Login';
import Registro from './pages/Registro';
import Contactos from './pages/Contactos';
import Tareas from './pages/Tareas';
import Frutas from './pages/Frutas';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

setupIonicReact();

// Ruta protegida - igual que el proyecto task
const RutaProtegida: React.FC<{ component: React.FC; path: string; exact?: boolean }> = ({
  component: Componente,
  path,
  exact,
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
    <RutaProtegida exact path="/contactos" component={Contactos} />
    <RutaProtegida exact path="/tareas" component={Tareas} />
    <RutaProtegida exact path="/frutas" component={Frutas} />
    <Redirect exact from="/" to="/login" />
  </IonRouterOutlet>
);

const App: React.FC = () => (
  <IonApp>
    <AuthProveedor>
      <IonReactRouter>
        <Rutas />
      </IonReactRouter>
    </AuthProveedor>
  </IonApp>
);

export default App;
