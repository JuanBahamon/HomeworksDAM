import { useState, useEffect } from 'react'
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel } from '@ionic/react'

const pacientesDemo = [
  { id: 1, nombre: 'María', apellido: 'González', dni: '28456123' },
  { id: 2, nombre: 'Pedro', apellido: 'Ramírez', dni: '35219876' },
  { id: 3, nombre: 'Ana', apellido: 'Torres', dni: '4187234' },
]

export default function PaginaPacientes() {
  const [pacientes, setPacientes] = useState(pacientesDemo)

  useEffect(() => {
    const guardados = localStorage.getItem('medicare_pacientes')
    if (guardados) {
      setPacientes(JSON.parse(guardados))
    } else {
      localStorage.setItem('medicare_pacientes', JSON.stringify(pacientesDemo))
    }
  }, [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mis pacientes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {pacientes.map(p => (
            <IonItem key={p.id}>
              <IonLabel>
                <h2>{p.nombre} {p.apellido}</h2>
                <p>{p.dni}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  )
}