import React, { useEffect, useState } from "react";
import {
  IonPage, IonContent, IonHeader, IonToolbar, IonTitle,
  IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonList, IonItem, IonLabel, IonBadge, IonButton,
  IonIcon, IonText, IonChip,
} from "@ionic/react";
import { trophyOutline, arrowBackOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useDexie } from "../hooks/useDexie";
import "./Results.scss";

const missions_count = 3;
const total_points = 120;

const FAKE_USERS = [
  { name: "Carlos M.", points: 115 },
  { name: "Ana García", points: 90 },
  { name: "Luis P.", points: 70 },
  { name: "Sofia R.", points: 40 },
];

const MEDALS = ["1°", "2°", "3°"];

const Results: React.FC = () => {
  const { user } = useAuth();
  const history = useHistory();
  const dexie = useDexie(user?.uid ?? "");

  const [myPoints, setMyPoints] = useState(0);
  const [myCompleted, setMyCompleted] = useState(0);

  useEffect(() => {
    if (dexie.progress) setMyPoints(dexie.progress.points);
    if (dexie.missions) setMyCompleted(dexie.missions.filter((m) => m.completed).length);
  }, [dexie.progress, dexie.missions]);

  const myEntry = {
    name: user?.email?.split("@")[0] ?? "Tu",
    points: myPoints,
    isMe: true,
  };

  const allUsers = [
    ...FAKE_USERS.map((u) => ({ ...u, isMe: false })),
    myEntry,
  ].sort((a, b) => b.points - a.points);

  const myRank = allUsers.findIndex((u) => u.isMe) + 1;
  const percentComplete = Math.round((myCompleted / missions_count) * 100);

  const statusColor =
    percentComplete === 100 ? "success" : percentComplete >= 50 ? "warning" : "danger";
  const statusText =
    percentComplete === 100 ? "Completado" : percentComplete >= 50 ? "En progreso" : "Iniciando";

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Resultados</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Tu desempeño</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <div className="summary-card-row">
              <div className="summary-card-stat">
                <IonText color="primary">
                  <h1>{myPoints}</h1>
                </IonText>
                <IonText color="medium"><small>puntos totales</small></IonText>
              </div>
              <div className="summary-card-stat">
                <IonText color="secondary">
                  <h1>{myCompleted}/{missions_count}</h1>
                </IonText>
                <IonText color="medium"><small>misiones</small></IonText>
              </div>
              <div className="summary-card-stat">
                <IonText color="tertiary">
                  <h1>#{myRank}</h1>
                </IonText>
                <IonText color="medium"><small>posición</small></IonText>
              </div>
            </div>
            <div className="summary-card-status">
              <IonChip color={statusColor}>
                <IonLabel>{statusText}</IonLabel>
              </IonChip>
            </div>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle className="ranking-card-title">
              <IonIcon icon={trophyOutline} />
              Ranking Top 5
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent className="ranking-card-content">
            <IonList lines="full">
              {allUsers.slice(0, 5).map((u, index) => (
                <IonItem
                  key={index}
                  className={u.isMe ? "ranking-card-item-me" : ""}
                >
                  <IonLabel>
                    <span className="ranking-card-medal">
                      {index < 3 ? MEDALS[index] : `#${index + 1}`}
                    </span>
                    {u.isMe ? `${u.name} (Tu)` : u.name}
                  </IonLabel>
                  <IonBadge slot="end" color={u.isMe ? "primary" : "medium"}>
                    {u.points} pts
                  </IonBadge>
                </IonItem>
              ))}
            </IonList>
          </IonCardContent>
        </IonCard>

        <IonButton
          expand="block"
          fill="outline"
          className="back-btn"
          onClick={() => history.push("/home")}
        >
          <IonIcon icon={arrowBackOutline} slot="start" />
          Volver a misiones
        </IonButton>

      </IonContent>
    </IonPage>
  );
};

export default Results;