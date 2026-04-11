import { Haptics, ImpactStyle } from '@capacitor/haptics';

export const useHaptics = () => {
  const vibrate = async () => {
    await Haptics.vibrate();
  };

  const impactLight = async () => {
    await Haptics.impact({ style: ImpactStyle.Light });
  };

  return { vibrate, impactLight };
};