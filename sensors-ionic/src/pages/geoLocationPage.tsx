import { useEffect, useRef, useState } from 'react';
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonButton, IonBackButton, IonButtons, IonBadge, IonText
} from '@ionic/react';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useGeolocation } from '../hooks/useGeolocation';
import { useHaptics } from '../hooks/useHaptics';
import { useDevice } from '../hooks/useDevice';
import { useLocalNotifications } from '../hooks/useLocalNotification';
import '../components/MapComponent.css';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const RecenterMap = ({ position }: { position: any }) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView([position.latitude, position.longitude]);
      map.invalidateSize();
    }
  }, [position]);
  return null;
};

const GeolocationPage: React.FC = () => {
  const { position, getCurrentLocation, startTracking, stopTracking } = useGeolocation();
  const { vibrate } = useHaptics();
  const { battery, getDeviceInfo } = useDevice();
  const {
    requestPermissions,
    notifyTrackingStarted,
    notifyTrackingStopped,
    notifyLowBattery,
    notifyNoMovement
  } = useLocalNotifications();

  const [isTracking, setIsTracking] = useState(false);
  const [path, setPath] = useState<[number, number][]>([]);
  const [ready, setReady] = useState(false);
  const noMovementTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const LOW_BATTERY_THRESHOLD = 0.2;

  useEffect(() => {
    requestPermissions();
    getCurrentLocation();
  }, []);

  useEffect(() => {
    if (position) {
      setReady(true);
      if (isTracking) {
        setPath(prev => [...prev, [position.latitude, position.longitude]]);
        resetNoMovementTimer();
      }
    }
  }, [position]);

  useEffect(() => {
    if (!isTracking) return;
    const interval = setInterval(async () => {
      await getDeviceInfo();
      if (battery && battery.batteryLevel !== undefined && battery.batteryLevel < LOW_BATTERY_THRESHOLD) {
        handleStopTracking(true);
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [isTracking, battery]);

  const resetNoMovementTimer = () => {
    if (noMovementTimer.current) clearTimeout(noMovementTimer.current);
    noMovementTimer.current = setTimeout(async () => {
      await notifyNoMovement();
    }, 60000);
  };

  const handleStartTracking = async () => {
    await vibrate();
    await notifyTrackingStarted();
    setPath([]);
    setIsTracking(true);
    startTracking();
    resetNoMovementTimer();
  };

  const handleStopTracking = async (lowBattery = false) => {
    if (noMovementTimer.current) clearTimeout(noMovementTimer.current);
    setIsTracking(false);
    stopTracking();
    if (lowBattery) {
      await notifyLowBattery();
    } else {
      await notifyTrackingStopped();
    }
  };

  const batteryPercent = battery?.batteryLevel !== undefined
    ? Math.round(battery.batteryLevel * 100)
    : null;

  const batteryColor = batteryPercent !== null
    ? batteryPercent > 50 ? 'success' : batteryPercent > 20 ? 'warning' : 'danger'
    : 'medium';

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start"><IonBackButton /></IonButtons>
          <IonTitle>Mapa y Ubicación</IonTitle>
          {batteryPercent !== null && (
            <IonButtons slot="end">
              <IonBadge color={batteryColor} style={{ marginRight: 10 }}>
                {batteryPercent}%
              </IonBadge>
            </IonButtons>
          )}
        </IonToolbar>
      </IonHeader>

      <IonContent scrollY={false}>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

          {/* Botones */}
          <div style={{ display: 'flex', gap: 8, padding: '10px', flexShrink: 0 }}>
            <IonButton
              expand="block"
              color="primary"
              onClick={handleStartTracking}
              disabled={isTracking}
              style={{ flex: 1 }}
            >
              Iniciar
            </IonButton>
            <IonButton
              expand="block"
              color="danger"
              onClick={() => handleStopTracking(false)}
              disabled={!isTracking}
              style={{ flex: 1 }}
            >
              Detener
            </IonButton>
            <IonButton
              expand="block"
              color="secondary"
              onClick={getCurrentLocation}
              style={{ flex: 1 }}
            >
              Ubicación
            </IonButton>
          </div>

          {position && (
            <div className="map-info" style={{ flexShrink: 0 }}>
              <IonText color={isTracking ? 'success' : 'medium'}>
                {isTracking ? 'Tracking activo' : 'Tracking inactivo'}
              </IonText>
              <p><b>Lat:</b> {position.latitude.toFixed(6)}</p>
              <p><b>Lng:</b> {position.longitude.toFixed(6)}</p>
              {path.length > 0 && <p><b>Puntos:</b> {path.length}</p>}
            </div>
          )}


          <div style={{ flex: 1, minHeight: 0 }}>
            {ready && position ? (
              <MapContainer
                center={[position.latitude, position.longitude]}
                zoom={18}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <RecenterMap position={position} />
                <Marker position={[position.latitude, position.longitude]} />
                {path.length > 1 && <Polyline positions={path} color="blue" />}
              </MapContainer>
            ) : (
              <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IonText>Obteniendo ubicación...</IonText>
              </div>
            )}
          </div>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default GeolocationPage;