import React, { useState, useEffect,useRef } from "react";
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { MaterialIcons } from '@expo/vector-icons';
import {
  Button,
  Image,
  View,
  TouchableOpacity,
  Platform,
  Text,
  Modal,
  StyleSheet
} from "react-native";

import { globalStyles } from "../../../styles/globalStyles";
import Constants from "expo-constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";





const ImagePickerComp = ({id, image, setImage,setTrigger,trigger}) => {
  //const [hasCameraPermission, setHasCameraPermission] = useState(null);
  //const [image, setImage] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off)
  const cameraRef = useRef(null);
  const [cameraModalOpen, setCameraModalOpen] = useState(false);

  const takePicture = async () => {
    console.log('take picture');
    if (cameraRef) {
        try {
            const data = await cameraRef.current.takePictureAsync();
            console.log(data);
            console.log('test : ',id);
            setImage(id, data.uri);
            setTrigger(!trigger);
            setCameraModalOpen(false);

        }
        catch (e) {
            console.log(e);
        }
    }

}

const saveImage = async () => {
    if (image) {
        try {
            await MediaLibrary.createAssetAsync(image);
            alert('Picture saved');
            setCameraModalOpen(false);
        }
        catch (e) {
            console.log(e);
        }
    }
}

const moveTo = async (newPosition) => {
  const camera = await positionMapRef.current.getCamera()
  if (camera) {
      console.log('new position', newPosition)
      camera.center = newPosition;
      positionMapRef.current.animateCamera(camera, { duration: 1000 })
      setPosition({
          latitude: newPosition.latitude,
          longitude: newPosition.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
      })
  }
}


  return (
    <View style={globalStyles.pickerContainer}>
    {/* <TouchableOpacity onPress={pickImage}> */}
    <TouchableOpacity onPress={() => setCameraModalOpen(true)}>
      {!image ? (
        <View style={globalStyles.upload}>
          <Text>Uploadm images</Text>
          <MaterialCommunityIcons name="upload" size={24} color="#0BB5FF" />
        </View>
      ) : (
        <Image style={globalStyles.imageUpload} source={{ uri: image }} />
      )}
    </TouchableOpacity>

    <Modal visible={cameraModalOpen} animationType='slide'>
                <View style={styles.modalContent}>
                    <MaterialIcons
                        name='close'
                        size={24}
                        style={styles.modalToggle}
                        onPress={() => setCameraModalOpen(false)}
                    />
                    {
                        !image ?
                            <Camera
                                ref={cameraRef}
                                style={styles.camera}
                                type={cameraType}
                                flashMode={flashMode}
                            />
                            :
                            <Image source={{ uri: image }} style={styles.camera} />
                    }
                    {
                        image
                            ?
                            <View style={styles.button}>
                                <Button title='Re-take' onPress={() => setImage(null)} />
                                <Button title='Save' onPress={saveImage} />
                            </View>
                            :
                            <View style={styles.button}>
                            <Button  title='Take Picture' onPress={takePicture} />
                            </View>
                    }
                </View>
            </Modal>
    </View>



  )
}
export default ImagePickerComp


const styles = StyleSheet.create({
  container: {
      padding: 24
  },
  camera: {
      flex: 1,
      borderRadius: 20,
  },
  modalContent: {
      flex: 1
  },
  modalToggle: {
      marginBottom: 10,
      borderWidth: 1,
      borderColor: '#f2f2f2',
      padding: 10,
      borderRadius: 10,
      alignSelf: 'center'
  },
  button:{
    marginBottom: 10,
    backgroundColor: '#f2f2f2',
  
  }

})