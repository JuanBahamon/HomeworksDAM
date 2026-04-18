import React, { useState, useEffect, useRef } from "react";
import {IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonProgressBar, IonBadge, IonText, IonIcon, IonChip, IonLabel, IonSpinner, IonButtons,
} from "@ionic/react";
import { checkmarkCircle, logOutOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useCamera } from "../hooks/useCamera";
import { useGeolocation } from "../hooks/useGeolocation";
import { useAccelerometer } from "../hooks/useAccelerometer";
import { useHaptics } from "../hooks/useHaptics";
import { useLocalNotifications } from "../hooks/useLocalNotification";
import { useCollection } from "../hooks/useCollection";
import { useDexie } from "../hooks/useDexie";
import "./Home.scss";

const missions = [
  { id: 1, name: "Evidencia fotográfica", description: "Toma una foto con la cámara", points: 30},
  { id: 2, name: "Desplazamiento", description: "Muévete más de 30 metros de tu posición inicial", points: 50},
  { id: 3, name: "Calma", description: "Quédate quieto 10 segundos (el dispositivo vibra al completar)", points: 40},
];

const total_points = missions.reduce((s, m) => s + m.points, 0);

const Home: React.FC = () => {
  const { user, logout } = useAuth();
  const history = useHistory();

  const { takePhoto, photo } = useCamera();
  const { distance, captureOrigin, startWatching, stopWatching } = useGeolocation();
  const { isStill, startListening, stopListening } = useAccelerometer();
  const { vibrateMission } = useHaptics();
  const { requestPermissions, notifyMissionComplete, notifyOneLeft, notifyAllComplete } = useLocalNotifications();

  const { add, update, getAll } = useCollection("userProgress");
  const dexie = useDexie(user?.uid ?? "");

  const [completedMissions, setCompletedMissions] = useState<number[]>([]);
  const [points, setPoints] = useState(0);
  const [firebaseDocId, setFirebaseDocId] = useState<string | null>(null);
  const [geoActive, setGeoActive] = useState(false);
  const [stillTimer, setStillTimer] = useState(0);

  const stillIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const stillSecondsRef = useRef(0);

  useEffect(() => {
    requestPermissions();
  }, []);

  useEffect(() => {
    if (!user?.uid) return;
    loadProgress();
  }, [user]);

  useEffect(() => {
    if (dexie.missions.length > 0) {
      const ids = dexie.missions.filter((m) => m.completed).map((m) => m.missionId);
      setCompletedMissions(ids);
    }
    if (dexie.progress) {
      setPoints(dexie.progress.points);
    }
  }, [dexie.missions, dexie.progress]);

  const loadProgress = async () => {
    const docs = await getAll([["userId", "==", user?.uid]]);
    if (docs.length > 0) {
      const doc = docs[0];
      setFirebaseDocId(doc.id);
      setPoints(doc.points ?? 0);
      const ids = (doc.missions ?? []).filter((m: any) => m.completed).map((m: any) => m.id);
      setCompletedMissions(ids);
    }
  };

  const isMissionComplete = (id: number) => completedMissions.includes(id);

  const completeMission = async (missionId: number) => {
    if (isMissionComplete(missionId)) return;

    const mission = missions.find((m) => m.id === missionId)!;
    const newPoints = points + mission.points;
    const newCompleted = [...completedMissions, missionId];

    setPoints(newPoints);
    setCompletedMissions(newCompleted);

    await dexie.saveMission(missionId);
    await dexie.savePoints(newPoints);

    const payload = {
      userId: user?.uid, points: newPoints, missions: missions.map((m) => ({ id: m.id, completed: newCompleted.includes(m.id) })), updatedAt: new Date().toISOString(),
    };

    if (firebaseDocId) {

      await update(firebaseDocId, payload);
    } else {
      const newId = await add(payload);
      setFirebaseDocId(newId);
    }

    await notifyMissionComplete(mission.name);
    const remaining = missions.length - newCompleted.length;
    if (remaining === 1) await notifyOneLeft();
    if (remaining === 0) await notifyAllComplete();
  };

  const handleMission1 = async () => {
    const result = await takePhoto();
    if (result) await completeMission(1);
  };

  const handleMission2Start = async () => {
    await captureOrigin();
    setGeoActive(true);
    startWatching(async (d) => {
      if (d >= 30 && !isMissionComplete(2)) {
        await stopWatching();
        setGeoActive(false);
        await completeMission(2);
      }
    });
  };

  const handleMission3Start = async () => {
    stillSecondsRef.current = 0;
    setStillTimer(0);

    await startListening(async (still) => {
      if (still) {
        if (!stillIntervalRef.current) {
          stillIntervalRef.current = setInterval(async () => {
            stillSecondsRef.current += 1;
            setStillTimer(stillSecondsRef.current);

            if (stillSecondsRef.current >= 10) {
              clearInterval(stillIntervalRef.current!);
              stillIntervalRef.current = null;
              await stopListening();
              await vibrateMission();
              await completeMission(3);
            }
          }, 1000);
        }
      } else {
        if (stillIntervalRef.current) {
          clearInterval(stillIntervalRef.current);
          stillIntervalRef.current = null;
        }
        stillSecondsRef.current = 0;
        setStillTimer(0);
      }
    });
  };

  const progressPercent = completedMissions.length / missions.length;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Misiones</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={logout}>
              <IonIcon icon={logOutOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">

        <IonCard>
          <IonCardContent>
            <div className="progress-card_row">
              <div className="progress-card_title">
                <IonText color="medium"><small>Progreso</small></IonText>
                <h2>{completedMissions.length} / {missions.length} misiones</h2>
              </div>
              <div className="progress-card_points">
                <IonText color="medium"><small>Puntos</small></IonText>
                <h2>{points} <small>/ {total_points}</small></h2>
              </div>
            </div>
            <IonProgressBar
              className="progress-card_bar"
              value={progressPercent}
              color={progressPercent === 1 ? "success" : "primary"}
            />
            <IonText color="medium">
              <small>{Math.round(progressPercent * 100)}% completado</small>
            </IonText>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              {missions[0].name}
              {isMissionComplete(1) && <IonIcon icon={checkmarkCircle} color="success" />}
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>{missions[0].description}</p>
            <IonChip color={isMissionComplete(1) ? "success" : "warning"}>
              <IonLabel>{isMissionComplete(1) ? "Completada" : "Pendiente"}</IonLabel>
            </IonChip>
            <IonBadge className="mission-card_badge" color="primary">
              {missions[0].points} pts
            </IonBadge>
            {photo && (
              <img className="mission-card_photo" src={photo} alt="evidencia" />
            )}
            {!isMissionComplete(1) && (
              <IonButton expand="block" onClick={handleMission1} className="ion-margin-top">
                Tomar foto
              </IonButton>
            )}
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              {missions[1].name}
              {isMissionComplete(2) && <IonIcon icon={checkmarkCircle} color="success" />}
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>{missions[1].description}</p>
            <IonChip color={isMissionComplete(2) ? "success" : "warning"}>
              <IonLabel>{isMissionComplete(2) ? "Completada" : "Pendiente"}</IonLabel>
            </IonChip>
            <IonBadge className="mission-card_badge" color="primary">
              {missions[1].points} pts
            </IonBadge>
            {geoActive && (
              <div className="mission-card_distance">
                <p>Distancia: <strong>{Math.round(distance)}m</strong> / 30m</p>
                <IonProgressBar value={Math.min(distance / 30, 1)} color="tertiary" />
              </div>
            )}
            {!isMissionComplete(2) && !geoActive && (
              <IonButton expand="block" onClick={handleMission2Start} className="ion-margin-top">
                Iniciar seguimiento GPS
              </IonButton>
            )}
            {geoActive && <IonSpinner name="dots" />}
          </IonCardContent>
        </IonCard>


        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              {missions[2].name}
              {isMissionComplete(3) && <IonIcon icon={checkmarkCircle} color="success" />}
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>{missions[2].description}</p>
            <p className="mission-card_hint">Se habilita después de completar la misión 2</p>
            <IonChip color={isMissionComplete(3) ? "success" : "warning"}>
              <IonLabel>{isMissionComplete(3) ? "Completada" : "Pendiente"}</IonLabel>
            </IonChip>
            <IonBadge className="mission-card_badge" color="primary">
              {missions[2].points} pts
            </IonBadge>
            {stillTimer > 0 && !isMissionComplete(3) && (
              <div className="mission-card_timer">
                <p>Quieto por: <strong>{stillTimer}s</strong> / 10s</p>
                <IonProgressBar value={stillTimer / 10} color="success" />
              </div>
            )}
            {!isMissionComplete(3) && isMissionComplete(2) && (
              <IonButton
                expand="block"
                onClick={handleMission3Start}
                className="ion-margin-top"
                disabled={stillTimer > 0}
              >
                Iniciar temporizador quieto
              </IonButton>
            )}
          </IonCardContent>
        </IonCard>

        {completedMissions.length > 0 && (
          <IonButton
            expand="block"
            color="success"
            className="results-btn"
            onClick={() => history.push("/results")}
          >
            Ver resultados y ranking
          </IonButton>
        )}

      </IonContent>
    </IonPage>
  );
};

export default Home;