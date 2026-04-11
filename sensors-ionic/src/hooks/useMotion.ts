import { useState, useEffect } from 'react';
import { Motion, AccelListenerEvent, RotationRate } from '@capacitor/motion';

export const useMotion = () => {
  const [accel, setAccel] = useState<AccelListenerEvent['acceleration'] | null>(null);
  const [orientation, setOrientation] = useState<RotationRate | null>(null);

  useEffect(() => {
    let accelHandler: any;
    let orientationHandler: any;

    const startTracking = async () => {
      accelHandler = await Motion.addListener('accel', (event) => {
        setAccel(event.acceleration);
      });

      orientationHandler = await Motion.addListener('orientation', (event) => {
        setOrientation(event);
      });
    };

    startTracking();
    return () => {
      Motion.removeAllListeners();
    };
  }, []);

  return { accel, orientation };
};