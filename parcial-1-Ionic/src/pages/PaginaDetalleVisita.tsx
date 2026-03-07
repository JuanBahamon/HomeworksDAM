import { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonButton, IonInput, IonList } from '@ionic/react'

export default function PaginaDetalleVisita() {
  const { id } = useParams<{ id: string }>()
  const history = useHistory()

  const visitas = JSON.parse(localStorage.getItem('medicare_visitas') || '[]')
  const visita = visitas.find((v: any) => v.id === Number(id))

  const [medicamento, setMedicamento] = useState('')
  const [receta, setReceta] = useState<string[]>(visita?.receta || [])

  function agregarMedicamento() {
    if (!medicamento) return
    const nuevaReceta = [...receta, medicamento]
    setReceta(nuevaReceta)
    setMedicamento('')
    const nuevasVisitas = visitas.map((v: any) =>
      v.id === Number(id) ? { ...v, receta: nuevaReceta } : v
    )
    localStorage.setItem('medicare_visitas', JSON.stringify(nuevasVisitas))
  }

  function finalizarVisita() {
    const nuevasVisitas = visitas.map((v: any) =>
      v.id === Number(id) ? { ...v, estado: 'finalizada', receta } : v
    )
    localStorage.setItem('medicare_visitas', JSON.stringify(nuevasVisitas))
    history.push('/visitas')
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Detalle visita</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel>
            <h2>{visita?.paciente}</h2>
            <p>{visita?.hora}</p>
            <p>{visita?.direccion}</p>
            <p>{visita?.estado}</p>
          </IonLabel>
        </IonItem>

        <h3 style={{ margin: '16px 0 8px' }}>Receta</h3>
        <IonItem>
          <IonLabel position="floating">Agregar medicamento</IonLabel>
          <IonInput value={medicamento} onIonChange={e => setMedicamento(e.detail.value!)} />
        </IonItem>
        <IonButton onClick={agregarMedicamento}>Agregar</IonButton>

        <IonList>
          {receta.map((med, index) => (
            <IonItem key={index}>
              <IonLabel>{med}</IonLabel>
            </IonItem>
          ))}
        </IonList>

        <IonButton expand="block" color="success" onClick={finalizarVisita}>
          Finalizar visita
        </IonButton>
      </IonContent>
    </IonPage>
  )
}