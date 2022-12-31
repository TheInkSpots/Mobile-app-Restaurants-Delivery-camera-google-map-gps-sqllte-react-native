import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { LatLng, Region } from 'react-native-maps';
import { OrderDeliveryMap } from '../components/order-delivery/OrderDeliveryMap';
import { OrderDestinationHeader } from '../components/order-delivery/OrderDestinationHeader';
import { OrderDeliveryInfo } from '../components/order-delivery/OrderDeliveryInfo';
import { CurrentLocation, Restaurant, RootTabParamList } from '../types';
import { OrderDeliveryMapZoomButtons } from '../components/order-delivery/OrderDeliveryMapZoomButtons';




export const OrderDeliveryScreen = ({route, navigation}) => {
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
      <OrderDeliveryMap
        mapRegion={region}
        destination={toLocation }
        origin={fromLocation }
        updateOrigin={(loc) => setFromLocation(loc)}
        updateDuration={(duration) => setDuration(duration)}
      />

      <OrderDestinationHeader 
        streetName={streetName}
        duration={duration}
      />

      <OrderDeliveryInfo
        restaurant={restaurant}
        onCall={() => navigation.navigate('Home')}
        onMessage={() => navigation.navigate('Home')}
      />

      <OrderDeliveryMapZoomButtons
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
