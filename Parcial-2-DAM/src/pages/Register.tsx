import React, { useState } from "react";
import {IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonItem, IonLabel, IonInput, IonButton, IonText, IonSpinner,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Register: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const { register, loading, error } = useAuth();
    const history = useHistory();

  const handleRegister = async () => {
    if (password !== confirm) return alert("Las contraseñas no coinciden");
    await register(email, password);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Registro</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="floating">Email</IonLabel>
          <IonInput
            type="email"
            value={email}
            onIonChange={(e) => setEmail(e.detail.value!)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Contraseña</IonLabel>
          <IonInput
            type="password"
            value={password}
            onIonChange={(e) => setPassword(e.detail.value!)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Confirmar contraseña</IonLabel>
          <IonInput
            type="password"
            value={confirm}
            onIonChange={(e) => setConfirm(e.detail.value!)}
          />
        </IonItem>

        {error && (
          <IonText color="danger">
            <p className="ion-padding-start">{error}</p>
          </IonText>
        )}

        <IonButton
          expand="block"
          className="ion-margin-top"
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? <IonSpinner /> : "Crear cuenta"}
        </IonButton>

        <IonButton
          expand="block"
          fill="outline"
          onClick={() => history.push("/login")}
        >
          Ya tengo cuenta
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Register;