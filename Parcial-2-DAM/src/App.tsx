import React from "react";
import { IonApp, IonRouterOutlet, IonSpinner, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Results from "./pages/Results";

/* Core CSS de Ionic */
import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import "./theme/variables.css";

setupIonicReact();

const App: React.FC = () => {
  const { user, loading } = useAuth();

  // Esperar a que Firebase confirme si hay sesión activa o no
  // Sin esto, redirige a /home antes de saber si el user está logueado
  if (loading) {
    return (
      <IonApp>
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
          gap: 16,
        }}>
          <IonSpinner name="crescent" />
          <p style={{ color: "var(--ion-color-medium)" }}>Cargando...</p>
        </div>
      </IonApp>
    );
  }

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          {/* Rutas públicas - accesibles siempre */}
          <Route exact path="/login">
            {/* Si ya está logueado y va a /login, mandarlo a /home */}
            {user ? <Redirect to="/home" /> : <Login />}
          </Route>
          <Route exact path="/register">
            {user ? <Redirect to="/home" /> : <Register />}
          </Route>

          {/* Rutas protegidas */}
          <Route exact path="/home">
            {user ? <Home /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/results">
            {user ? <Results /> : <Redirect to="/login" />}
          </Route>

          {/* Redirect raíz: solo después de que loading=false */}
          <Route exact path="/">
            <Redirect to={user ? "/home" : "/login"} />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;