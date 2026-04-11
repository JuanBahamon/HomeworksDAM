import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import GeolocationPage from './pages/geoLocationPage'; 
import CameraPage from './pages/cameraPage';         
import MotionPage from './pages/motionPage';
import DevicePage from './pages/devicePage';

import '@ionic/react/css/core.css';
import '@ionic/react/css/palettes/dark.system.css';
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route exact path="/geolocation">
          <GeolocationPage />
        </Route>
        <Route exact path="/camera">
          <CameraPage />
        </Route>
        <Route exact path="/motion">
          <MotionPage />
        </Route>
        <Route exact path="/device">
          <DevicePage />
        </Route>

      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
