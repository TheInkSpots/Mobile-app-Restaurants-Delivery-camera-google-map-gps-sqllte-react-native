import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { LatLng, Region } from 'react-native-maps';
import { GoogleMap } from '../components/google-map/GoogleMap';
import { GoogleDestinationHeader } from '../components/google-map/GoogleDestinationHeader';
import { GoogleInfo } from '../components/google-map/GoogleInfo';
import { CurrentLocation, Restaurant, RootTabParamList } from '../types';
import { GoogleMapZoomButtons } from '../components/google-map/GoogleMapZoomButtons';




export const GoogleScreen = ({route, navigation}) => {
  const [restaurant, setRestaurant] = useState(null);
  const [streetName, setStreetName] = useState('');
  const [fromLocation, setFromLocation] = useState(null);
  const [toLocation, setToLocation] = useState(null);
  const [region, setRegion] = useState();
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const { restaurant, currentLocation } = route.params;

    const {
      gps: fromLoc,
      streetName: street
    } = currentLocation ;
    const toLoc = restaurant?.location ;

    const mapRegion = {
      latitude: (fromLoc.latitude + toLoc.latitude) / 2,
      longitude: (fromLoc.longitude + toLoc.longitude) / 2,
      latitudeDelta: Math.abs(fromLoc.latitude - toLoc.latitude) * 2,
      longitudeDelta: Math.abs(fromLoc.longitude - toLoc.longitude) * 2,
    }

    setRestaurant(restaurant);
    setStreetName(street);
    setFromLocation(fromLoc);
    setToLocation(toLoc);
    setRegion(mapRegion);
  }, []);

  function zoomIn() {
    const mapRegion = {
      latitude: (region ).latitude,
      longitude: (region ).longitude,
      latitudeDelta: (region ).latitudeDelta / 2,
      longitudeDelta: (region ).longitudeDelta / 2,
    };

    setRegion(mapRegion);
  }

  function zoomOut() {
    const mapRegion = {
      latitude: (region ).latitude,
      longitude: (region ).longitude,
      latitudeDelta: (region ).latitudeDelta * 2,
      longitudeDelta: (region ).longitudeDelta * 2,
    }
    setRegion(mapRegion);
  }

  return (
    <SafeAreaView style={styles.container}>
      <GoogleMap
        mapRegion={region}
        destination={toLocation }
        origin={fromLocation }
        updateOrigin={(loc) => setFromLocation(loc)}
        updateDuration={(duration) => setDuration(duration)}
      />

      <GoogleDestinationHeader 
        streetName={streetName}
        duration={duration}
      />

      <GoogleInfo
        restaurant={restaurant}
        onCall={() => navigation.goBack()}
        onMessage={() => navigation.navigate('Home')}
      />

      <GoogleMapZoomButtons
        zoomIn={() => zoomIn()}
        zoomOut={() => zoomOut()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
