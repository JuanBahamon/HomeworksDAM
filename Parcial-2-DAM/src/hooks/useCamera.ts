import { useState } from "react";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";

export const useCamera = () => {
    const [photo, setPhoto] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    
    const takePhoto = async (): Promise<string | null> => {
        try {
            setError(null);
            const image = await Camera.getPhoto({
            quality: 80,
            allowEditing: false,
            resultType: CameraResultType.DataUrl,
            source: CameraSource.Camera,
        });
        const dataUrl = image.dataUrl ?? null;
        setPhoto(dataUrl);
        return dataUrl;
    } catch (e: any) {
        setError(e.message);
        return null;
    }
  };

  return { photo, error, takePhoto };
};