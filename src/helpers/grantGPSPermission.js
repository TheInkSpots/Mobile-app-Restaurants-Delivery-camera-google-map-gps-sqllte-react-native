const getGPSPermission = async () => {
    console.log('getLocationPermission');
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
        console.log('Location permissions granted');
        setHasLocationPermission(true);
        console.log('attempt to get location')
        const location = await Location.getCurrentPositionAsync({});
        console.log(location);
        setPosition({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
        })

    } else {
        console.log('location permissions not granted');
        setHasLocationPermission(false);
    }
}


export default getGPSPermission;