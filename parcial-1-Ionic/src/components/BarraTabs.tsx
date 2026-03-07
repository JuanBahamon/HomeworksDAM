import { IonTabBar, IonTabButton, IonLabel, IonBadge } from '@ionic/react'

interface Props {
  pendientes: number
}

export default function BarraTabs({ pendientes }: Props) {
  return (
    <IonTabBar slot="bottom">
      <IonTabButton tab="visitas" href="/visitas">
        <IonLabel>Visitas</IonLabel>
        {pendientes > 0 && <IonBadge color="danger">{pendientes}</IonBadge>}
      </IonTabButton>
      <IonTabButton tab="pacientes" href="/pacientes">
        <IonLabel>Pacientes</IonLabel>
      </IonTabButton>
      <IonTabButton tab="perfil" href="/perfil">
        <IonLabel>Perfil</IonLabel>
      </IonTabButton>
    </IonTabBar>
  )
}