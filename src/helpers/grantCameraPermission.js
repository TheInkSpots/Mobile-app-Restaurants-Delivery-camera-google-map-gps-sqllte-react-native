import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

const getCameraPermission = async () => {
    //console.log('getCameraPermission');
    MediaLibrary.requestPermissionsAsync();
    const cameraStatus = await Camera.requestCameraPermissionsAsync();
    setHasCameraPermission(cameraStatus.status === 'granted')
}

export  default getCameraPermission;