import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton, IonToast
} from '@ionic/react';
import { useHistory } from 'react-router-dom';

const Login: React.FC = () => {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleLogin = () => {
    if (username === 'admin' && password === '1234') {
      history.push('/posts');
    } else {
      setShowToast(true);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="floating">Usuario</IonLabel>
          <IonInput
            value={username}
            onIonChange={e => setUsername(e.detail.value!)}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Contraseña</IonLabel>
          <IonInput
            type="password"
            value={password}
            onIonChange={e => setPassword(e.detail.value!)}
          />
        </IonItem>

        <IonButton expand="block" className="ion-margin-top" onClick={handleLogin}>
          Entrar
        </IonButton>

        <IonToast
          isOpen={showToast}
          message="Usuario o contraseña incorrectos"
          duration={2000}
          onDidDismiss={() => setShowToast(false)}
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;