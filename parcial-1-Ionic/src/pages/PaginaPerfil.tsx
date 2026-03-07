import { useHistory } from 'react-router-dom'
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonButton, IonAvatar } from '@ionic/react'

export default function PaginaPerfil() {
  const history = useHistory()
  const usuario = JSON.parse(localStorage.getItem('medicare_usuario') || '{}')

  function cerrarSesion() {
    localStorage.removeItem('medicare_usuario')
    window.location.href = '/login'
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mi perfil</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonAvatar style={{ width: '80px', height: '80px', background: '#0C2340', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ color: 'white', fontSize: '32px', fontWeight: 'bold', margin: 'auto' }}>
            {usuario.nombre?.charAt(0)}
          </p>
        </IonAvatar>
        <IonItem>
          <IonLabel>
            <h2>{usuario.nombre}</h2>
            <p>{usuario.rol}</p>
          </IonLabel>
        </IonItem>
        <IonButton expand="block" onClick={cerrarSesion}>Cerrar sesión</IonButton>
      </IonContent>
    </IonPage>
  )
}