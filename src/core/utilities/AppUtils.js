import { Alert } from "react-native";
import React, { useState, useEffect , useRef} from "react";


//import * as ImagePicker from "expo-image-picker";
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'react-native-image-picker';
import { MaterialIcons } from '@expo/vector-icons';


export const fuelData = [
  {
    value: "E85"
  },
  {
    value: "Gasoline"
  },
  {
    value: "Diesel"
  }
];

export const typeData = [
  {
    value: "SEDAN"
  },
  {
    value: "COUPE"
  },
  {
    value: "SPORTS CAR"
  },
  {
    value: "STATION WAGON"
  }
];

export const transmissionData = [
  {
    value: "Manual"
  },
  {
    value: "Automatic"
  },
  {
    value: "Continuously variable transmission"
  }
];

export const seatingData = [
  {
    value: "1"
  },
  {
    value: "2"
  },
  {
    value: "3"
  },
  {
    value: "4"
  },
  {
    value: "5"
  },
  {
    value: "6"
  }
];

export const commonNavigation = name => {
  return {
    title: name,
    headerStyle: {
      backgroundColor: "#56CCF2",
      elevation: 0,
      shadowOpacity: 0
    },
    headerTintColor: "#ffffff",
    headerTitleStyle: {
      fontWeight: "bold",
      color: "#ffffff"
    }
  };
};

export const isEmpty = values => {
  let isEmptys = false;
  Object.entries(values).map(([key, value]) => {
    if (key === "image" && value === null) {
      isEmptys = true;
    } else {
      if (value.length === 0) {
        isEmptys = true;
      }
    }
  });

  return isEmptys;
};

export const showAlert = name =>
  Alert.alert(
    "Error",
    name,
    [{ text: "OK", onPress: () => console.log("OK Pressed") }],
    { cancelable: false }
  );







  const getCameraPermission = async () => {
    
}


export const pickImages = async () => {
  //console.log("Picking images...");
  const [response, setresponse] = useState(null);

  let result = await  ImagePicker.launchCamera({
    saveToPhotos: true,
    mediaType: 'photo',
    includeBase64: false,
    includeExtra,
  },setresponse);
  //console.log("Picked images...  ", response);
  return response;
  // let result = await ImagePicker.launchImageLibraryAsync({
  //   mediaTypes: ImagePicker.MediaTypeOptions.All,
  //   multiple: true,
  //   allowsEditing: true,
  //   aspect: [4, 3],
  //   quality: 1
  // });

  // if (!result.cancelled) {
  //   return result.uri;
  // } else {
  //   return null;
  // }

// //   const [hasCameraPermission, setHasCameraPermission] = useState(null);
// //   const [image, setImage] = useState(null);
// //   const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
// //   const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off)
// //   const cameraRef = useRef(null);
// //   const [cameraModalOpen, setCameraModalOpen] = useState(false);

// //   const takePicture = async () => {
// //     //console.log('take picture');
// //     if (cameraRef) {
// //         try {
// //             const data = await cameraRef.current.takePictureAsync();
// //             //console.log(data);
// //             setImage(data.uri);
// //         }
// //         catch (e) {
// //             //console.log(e);
// //         }
// //     }

// // }

// // const saveImage = async () => {
// //     if (image) {
// //         try {
// //             await MediaLibrary.createAssetAsync(image);
// //             alert('Picture saved');
// //             setCameraModalOpen(false);
// //         }
// //         catch (e) {
// //             //console.log(e);
// //         }
// //     }
// // }

// // const moveTo = async (newPosition) => {
// //   const camera = await positionMapRef.current.getCamera()
// //   if (camera) {
// //       //console.log('new position', newPosition)
// //       camera.center = newPosition;
// //       positionMapRef.current.animateCamera(camera, { duration: 1000 })
// //       setPosition({
// //           latitude: newPosition.latitude,
// //           longitude: newPosition.longitude,
// //           latitudeDelta: LATITUDE_DELTA,
// //           longitudeDelta: LONGITUDE_DELTA,
// //       })
// //   }
// // }


// //   return (
// //   <Modal visible={cameraModalOpen} animationType='slide'>
// //   <View style={styles.modalContent}>
// //       <MaterialIcons
// //           name='close'
// //           size={24}
// //           style={styles.modalToggle}
// //           onPress={() => setCameraModalOpen(false)}
// //       />
// //       {
// //           !image ?
// //               <Camera
// //                   ref={cameraRef}
// //                   style={styles.camera}
// //                   type={cameraType}
// //                   flashMode={flashMode}
// //               />
// //               :
// //               <Image source={{ uri: image }} style={styles.camera} />
// //       }
// //       {
// //           image
// //               ?
// //               <View>
// //                   <Button title='Re-take' onPress={() => setImage(null)} />
// //                   <Button title='Save' onPress={saveImage} />
// //               </View>
// //               :
// //               <Button title='Take Picture' onPress={takePicture} />
// //       }
// //   </View>
// // </Modal>
// //   );
};

export const checkImageStatus = async () => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  //const camera = useRef(null)
  //console.log('getCameraPermission');
    MediaLibrary.requestPermissionsAsync();
    const cameraStatus = await Camera.requestCameraPermissionsAsync();
    setHasCameraPermission(cameraStatus.status === 'granted')

  if (Platform.OS !== "web") {
    const cameraStatus = await Camera.requestCameraPermissionsAsync();
    if (cameraStatus !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }
  }
};
