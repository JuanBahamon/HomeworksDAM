import { useState } from "react";
import { Camera, CameraResultType } from "@capacitor/camera";

export const useCamera = () => {
  const [photo, setPhoto] = useState<string | undefined>(undefined);

  const takePhoto = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri
    });
    setPhoto(image.webPath);
  };

  return { photo, takePhoto };
};