import { useState } from 'react'
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton, IonToast, IonLoading } from '@ionic/react'

const usuarios = [
  { id: 1, email: 'recepcion@medicare.com', password: '1234', nombre: 'Laura Gómez', rol: 'recepcionista' },
  { id: 2, email: 'medico@medicare.com', password: '1234', nombre: 'Dr. Carlos Ruiz', rol: 'medico' },
  { id: 3, email: 'admin@medicare.com', password: '1234', nombre: 'Admin Medicare', rol: 'admin' },
]

export default function PaginaLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mostrarPassword, setMostrarPassword] = useState(false)
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState(false)

  function iniciarSesion() {
    setCargando(true)
    setTimeout(() => {
      const encontrado = usuarios.find(u => u.email === email && u.password === password)
      setCargando(false)
      if (encontrado) {
        localStorage.setItem('medicare_usuario', JSON.stringify(encontrado))
        window.location.href = '/visitas'
      } else {
        setError(true)
      }
    }, 1500)
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>MediCare+ Visitas</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="floating">Email</IonLabel>
          <IonInput value={email} onIonChange={e => setEmail(e.detail.value!)} />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Contraseña</IonLabel>
          <IonInput
            type={mostrarPassword ? 'text' : 'password'}
            value={password}
            onIonChange={e => setPassword(e.detail.value!)}
          />
        </IonItem>
        <IonButton fill="clear" onClick={() => setMostrarPassword(!mostrarPassword)}>
          {mostrarPassword ? 'Ocultar' : 'Mostrar'} contraseña
        </IonButton>
        <IonButton expand="block" onClick={iniciarSesion}>Ingresar</IonButton>

        <IonLoading isOpen={cargando} message="Verificando..." />
        <IonToast
          isOpen={error}
          message="Usuario o contraseña incorrectos"
          duration={1500}
          onDidDismiss={() => setError(false)}
        />
      </IonContent>
    </IonPage>
  )
}