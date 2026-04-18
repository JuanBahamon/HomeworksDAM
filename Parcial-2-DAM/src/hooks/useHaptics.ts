import { Haptics, ImpactStyle, NotificationType } from "@capacitor/haptics";

export const useHaptics = () => {
    const impact = async (style: ImpactStyle = ImpactStyle.Medium) => {
        await Haptics.impact({ style });
  };
  
  const notify = async (type: NotificationType = NotificationType.Success) => {
    await Haptics.notification({ type });
  };

  const vibrateMission = async () => {
    await Haptics.vibrate({ duration: 300 });
    await new Promise((r) => setTimeout(r, 200));
    await Haptics.vibrate({ duration: 300 });
    await new Promise((r) => setTimeout(r, 200));
    await Haptics.vibrate({ duration: 600 });
  };

  return { impact, notify, vibrateMission };
};