import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonItemSliding, IonItemOptions, IonItemOption, IonSegment, IonSegmentButton, IonAlert, IonReorderGroup, IonReorder } from '@ionic/react'

const visitasIniciales = [
  { id: 1, paciente: 'María González', hora: '09:00', direccion: 'Calle 10 #45-23', estado: 'pendiente' },
  { id: 2, paciente: 'Pedro Ramírez', hora: '10:30', direccion: 'Carrera 5 #12-67', estado: 'pendiente' },
  { id: 3, paciente: 'Ana Torres', hora: '12:00', direccion: 'Av. Principal #88', estado: 'pendiente' },
]

export default function PaginaVisitas() {
  const [visitas, setVisitas] = useState<any[]>([])
  const [segmento, setSegmento] = useState('todas')
  const [mostrarAlerta, setMostrarAlerta] = useState(false)
  const [visitaSeleccionada, setVisitaSeleccionada] = useState<any>(null)
  const history = useHistory()

  useEffect(() => {
    const guardadas = localStorage.getItem('medicare_visitas')
    if (guardadas) {
      setVisitas(JSON.parse(guardadas))
    } else {
      localStorage.setItem('medicare_visitas', JSON.stringify(visitasIniciales))
      setVisitas(visitasIniciales)
    }
  }, [])

  function cambiarEstado(id: number, nuevoEstado: string) {
    const nuevas = visitas.map(v => v.id === id ? { ...v, estado: nuevoEstado } : v)
    localStorage.setItem('medicare_visitas', JSON.stringify(nuevas))
    setVisitas(nuevas)
  }

  function cancelarVisita(motivo: string) {
    const nuevas = visitas.map(v => v.id === visitaSeleccionada.id ? { ...v, estado: 'cancelada', motivo } : v)
    localStorage.setItem('medicare_visitas', JSON.stringify(nuevas))
    setVisitas(nuevas)
  }

  function reordenar(e: any) {
    const pendientes = visitas.filter(v => v.estado === 'pendiente')
    const otras = visitas.filter(v => v.estado !== 'pendiente')
    const items = e.detail.complete(pendientes)
    const nuevas = [...items, ...otras]
    localStorage.setItem('medicare_visitas', JSON.stringify(nuevas))
    setVisitas(nuevas)
  }

  const pendientes = visitas.filter(v => v.estado === 'pendiente')
  const otras = visitas.filter(v => v.estado !== 'pendiente')

  const visitasFiltradas = visitas.filter(v => {
    if (segmento === 'todas') return true
    if (segmento === 'pendientes') return v.estado === 'pendiente'
    if (segmento === 'en_curso') return v.estado === 'en_camino'
    if (segmento === 'finalizadas') return v.estado === 'finalizada'
    return true
  })

return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mis visitas</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSegment value={segmento} onIonChange={e => setSegmento(e.detail.value as string)}>
            <IonSegmentButton value="todas"><IonLabel>Todas</IonLabel></IonSegmentButton>
            <IonSegmentButton value="pendientes"><IonLabel>Pendientes</IonLabel></IonSegmentButton>
            <IonSegmentButton value="en_curso"><IonLabel>En curso</IonLabel></IonSegmentButton>
            <IonSegmentButton value="finalizadas"><IonLabel>Finalizadas</IonLabel></IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {segmento === 'todas' ? (
            <>
              <IonReorderGroup disabled={false} onIonItemReorder={reordenar}>
                {pendientes.map(v => (
                  <IonItemSliding key={v.id}>
                    <IonItemOptions side="start">
                      <IonItemOption color="secondary" onClick={() => history.push(`/visitas/${v.id}`)}>Ver detalle</IonItemOption>
                    </IonItemOptions>
                    <IonItem>
                      <IonReorder slot="start" />
                      <IonLabel>
                        <h2>{v.paciente}</h2>
                        <p>{v.hora} — {v.direccion}</p>
                        <p>{v.estado}</p>
                      </IonLabel>
                    </IonItem>
                    <IonItemOptions side="end">
                      <IonItemOption color="primary" onClick={() => cambiarEstado(v.id, 'en_camino')}>En camino</IonItemOption>
                      <IonItemOption color="danger" onClick={() => { setVisitaSeleccionada(v); setMostrarAlerta(true) }}>Cancelar</IonItemOption>
                    </IonItemOptions>
                  </IonItemSliding>
                ))}
              </IonReorderGroup>
              {otras.map(v => (
                <IonItemSliding key={v.id}>
                  <IonItemOptions side="start">
                    <IonItemOption color="secondary" onClick={() => history.push(`/visitas/${v.id}`)}>Ver detalle</IonItemOption>
                  </IonItemOptions>
                  <IonItem>
                    <IonLabel>
                      <h2>{v.paciente}</h2>
                      <p>{v.hora} — {v.direccion}</p>
                      <p>{v.estado}</p>
                    </IonLabel>
                  </IonItem>
                  <IonItemOptions side="end">
                    <IonItemOption color="primary" onClick={() => cambiarEstado(v.id, 'en_camino')}>En camino</IonItemOption>
                    <IonItemOption color="danger" onClick={() => { setVisitaSeleccionada(v); setMostrarAlerta(true) }}>Cancelar</IonItemOption>
                  </IonItemOptions>
                </IonItemSliding>
              ))}
            </>
          ) : (
            visitasFiltradas.map(v => (
              <IonItemSliding key={v.id}>
                <IonItemOptions side="start">
                  <IonItemOption color="secondary" onClick={() => history.push(`/visitas/${v.id}`)}>Ver detalle</IonItemOption>
                </IonItemOptions>
                <IonItem>
                  <IonLabel>
                    <h2>{v.paciente}</h2>
                    <p>{v.hora} — {v.direccion}</p>
                    <p>{v.estado}</p>
                  </IonLabel>
                </IonItem>
                <IonItemOptions side="end">
                  <IonItemOption color="primary" onClick={() => cambiarEstado(v.id, 'en_camino')}>En camino</IonItemOption>
                  <IonItemOption color="danger" onClick={() => { setVisitaSeleccionada(v); setMostrarAlerta(true) }}>Cancelar</IonItemOption>
                </IonItemOptions>
              </IonItemSliding>
            ))
          )}
        </IonList>

        <IonAlert
          isOpen={mostrarAlerta}
          header="Cancelar visita"
          inputs={[{ name: 'motivo', type: 'text', placeholder: 'Motivo de cancelación' }]}
          buttons={[
            { text: 'No', role: 'cancel', handler: () => setMostrarAlerta(false) },
            { text: 'Sí, cancelar', handler: (data) => { cancelarVisita(data.motivo); setMostrarAlerta(false) } }
          ]}
          onDidDismiss={() => setMostrarAlerta(false)}
        />
      </IonContent>
    </IonPage>
  )
}