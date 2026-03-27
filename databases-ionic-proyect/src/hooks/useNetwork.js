import { useState, useEffect } from 'react';
import { Network } from '@capacitor/network';

const useNetwork = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [connectionType, setConnectionType] = useState(null);

  useEffect(() => {
    const checkInitialStatus = async () => {
      const status = await Network.getStatus();
      setIsOnline(status.connected);
      setConnectionType(status.connectionType); // wifi | cellular | none
    };

    checkInitialStatus();

    const listener = Network.addListener('networkStatusChange', (status) => {
      setIsOnline(status.connected);
      setConnectionType(status.connectionType);
    });

    return () => {
      listener.then((l) => l.remove());
    };
  }, []);

  return { isOnline, connectionType };
};

export default useNetwork;
