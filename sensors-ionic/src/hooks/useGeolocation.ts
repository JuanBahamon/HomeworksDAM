import { useState } from "react";
import { Geolocation, Position } from "@capacitor/geolocation";

export const useGeolocation = () => {
  // Guardamos específicamente las coordenadas (coords) para que tengan latitude y longitude
  const [position, setPosition] = useState<Position['coords'] | null>(null);

  const getCurrentLocation = async () => {
    try {
      const pos = await Geolocation.getCurrentPosition();
      setPosition(pos.coords); // <--- Guardamos solo las coordenadas
    } catch (err) {
      console.error(err);
    }
  };

  return { position, getCurrentLocation };
};