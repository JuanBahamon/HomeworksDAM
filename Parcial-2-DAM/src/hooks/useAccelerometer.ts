import { useState, useRef } from "react";
import { Motion } from "@capacitor/motion";

export const useAccelerometer = () => {
    const [isStill, setIsStill] = useState(false);
    const [accelData, setAccelData] = useState({ x: 0, y: 0, z: 0 });
    const listenerRef = useRef<any>(null);

    const still_threshold = 0.3;
    
    const startListening = async (onStillChange?: (still: boolean) => void) => {
        if (listenerRef.current) return;
        
        listenerRef.current = await Motion.addListener("accel", (event) => {
        const { x, y, z } = event.accelerationIncludingGravity;
        setAccelData({ x, y, z });

        const magnitude = Math.sqrt(x * x + y * y + z * z);
        const deviation = Math.abs(magnitude - 9.81);
        const still = deviation < still_threshold;

        setIsStill(still);
        onStillChange?.(still);
      });
  };

  const stopListening = async () => {
    if (listenerRef.current) {
        await listenerRef.current.remove();
        listenerRef.current = null;
        setIsStill(false);
    }
  };

  return { isStill, accelData, startListening, stopListening };
};