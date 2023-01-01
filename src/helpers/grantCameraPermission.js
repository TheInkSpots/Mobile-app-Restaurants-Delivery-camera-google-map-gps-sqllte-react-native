const getCameraPermission = async () => {
    console.log('getCameraPermission');
    MediaLibrary.requestPermissionsAsync();
    const cameraStatus = await Camera.requestCameraPermissionsAsync();
    setHasCameraPermission(cameraStatus.status === 'granted')
}

export  default getCameraPermission;