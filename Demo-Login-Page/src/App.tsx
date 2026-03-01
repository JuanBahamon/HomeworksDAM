import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Preferences } from '@capacitor/preferences';
import PaginaLogin from './pages/PaginaLogin';
import PaginaLista from './pages/PaginaLista';

setupIonicReact();

const App: React.FC = () => {
    const [sesionIniciada, setSesionIniciada] = useState<boolean | null>(null);

    useEffect(() => {
        const verificarSesion = async () => {
            const { value } = await Preferences.get({ key: 'sesion_iniciada' });
            setSesionIniciada(value === 'true');
        };
        verificarSesion();
    }, []);

  if (sesionIniciada === null) return null;

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/login" component={PaginaLogin} />
          <Route exact path="/home">
            {sesionIniciada ? <PaginaLista /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/">
            <Redirect to={sesionIniciada ? '/home' : '/login'} />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;