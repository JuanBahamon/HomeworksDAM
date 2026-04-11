import { useState, useEffect } from 'react';
import { Device, DeviceInfo, BatteryInfo } from '@capacitor/device';

export const useDevice = () => {
  const [info, setInfo] = useState<DeviceInfo | null>(null);
  const [battery, setBattery] = useState<BatteryInfo | null>(null);

  const getDeviceInfo = async () => {
    const deviceInfo = await Device.getInfo();
    const batteryInfo = await Device.getBatteryInfo();
    setInfo(deviceInfo);
    setBattery(batteryInfo);
  };

  useEffect(() => {
    getDeviceInfo();
  }, []);

  return { info, battery, getDeviceInfo };
};