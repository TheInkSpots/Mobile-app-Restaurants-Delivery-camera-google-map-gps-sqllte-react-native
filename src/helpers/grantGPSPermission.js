import * as Location from 'expo-location';

 const getGPSPermission = async    ({setCurrentLocation}) => {
    //console.log('getLocationPermission');
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        setCurrentLocation({
            streetName: 'Your Locatoin',
             gps: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
             }
        })

    } else {
        console.log('location permissions not granted');
    }
}

export default  getGPSPermission;