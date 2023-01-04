import * as Location from 'expo-location';

//const [hasLocationPermission, setHasLocationPermission] = useState(false);


 const getGPSPermission = async    ({setCurrentLocation}) => {
    //console.log('getLocationPermission');
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
        //console.log('Location permissions granted');
        //setHasLocationPermission(true);
        //console.log('attempt to get location')
        const location = await Location.getCurrentPositionAsync({});
        //console.log(location);
        setCurrentLocation({
            streetName: 'Your Locatoin',
             gps: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
             }
        })

    } else {
        //console.log('location permissions not granted');
        //setHasLocationPermission(false);
    }
}

export default  getGPSPermission;