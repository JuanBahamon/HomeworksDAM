import { useState, useRef } from "react";
import { Geolocation, Position } from "@capacitor/geolocation";

const haversineDistance = (
  lat1: number, lon1: number,
  lat2: number, lon2: number
): number => {
  const R = 6371000;
  const toRad = (x: number) => (x * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

export const useGeolocation = () => {
    const [currentPosition, setCurrentPosition] = useState<Position | null>(null);
    const [originPosition, setOriginPosition] = useState<Position | null>(null);
    const [distance, setDistance] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const watchId = useRef<string | null>(null);
    
    const captureOrigin = async () => {
        try {
            await Geolocation.requestPermissions();
            const pos = await Geolocation.getCurrentPosition({ enableHighAccuracy: true });
            setOriginPosition(pos);
            setCurrentPosition(pos);
            setDistance(0);
            return pos;
        } catch (e: any) {
            setError(e.message);
            return null;
        }
  };

  const startWatching = async (onDistanceUpdate?: (d: number) => void) => {
    if (watchId.current) return;
    const origin = originPosition ?? await captureOrigin();
    if (!origin) return;

    watchId.current = await Geolocation.watchPosition(
        { enableHighAccuracy: true },
        (pos) => {
            if (!pos) return;
            setCurrentPosition(pos);
            const d = haversineDistance(origin.coords.latitude, origin.coords.longitude, pos.coords.latitude, pos.coords.longitude
            );
            setDistance(d);
            onDistanceUpdate?.(d);
      }
    );
  };

  const stopWatching = async () => {
    if (watchId.current) {
        await Geolocation.clearWatch({ id: watchId.current });
        watchId.current = null;
    }
  };

  return {
    currentPosition, originPosition, distance, error, captureOrigin, startWatching, stopWatching,
  };
};