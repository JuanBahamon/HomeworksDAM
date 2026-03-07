import { useState, useEffect } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { IonApp, IonRouterOutlet, IonTabs, setupIonicReact } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import PaginaLogin from './pages/PaginaLogin'
import PaginaVisitas from './pages/PaginaVisita'
import PaginaDetalleVisita from './pages/PaginaDetalleVisita'
import PaginaPerfil from './pages/PaginaPerfil'
import PaginaPacientes from './pages/PaginaPacientes'
import BarraTabs from './components/BarraTabs'

setupIonicReact()

export default function App() {
  const usuario = localStorage.getItem('medicare_usuario')
  const [visitas, setVisitas] = useState<any[]>([])

  useEffect(() => {
    const guardadas = localStorage.getItem('medicare_visitas')
    if (guardadas) {
      setVisitas(JSON.parse(guardadas))
    }
  }, [])

  const pendientes = visitas.filter(v => v.estado === 'pendiente').length

  return (
    <IonApp>
      <IonReactRouter>
        {!usuario ? (
          <IonRouterOutlet>
            <Route path="/login" component={PaginaLogin} exact />
            <Redirect to="/login" />
          </IonRouterOutlet>
        ) : (
          <IonTabs>
            <IonRouterOutlet>
              <Route path="/visitas" component={PaginaVisitas} exact />
              <Route path="/visitas/:id" component={PaginaDetalleVisita} exact />
              <Route path="/pacientes" component={PaginaPacientes} exact />
              <Route path="/perfil" component={PaginaPerfil} exact />
              <Redirect exact from="/" to="/visitas" />
            </IonRouterOutlet>
            <BarraTabs pendientes={pendientes} />
          </IonTabs>
        )}
      </IonReactRouter>
    </IonApp>
  )
}