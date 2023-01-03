//import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TopBar } from '../components/TopBar';
import { RestaurantFoodInfo } from '../components/restaurant/RestaurantFoodInfo';
import { COLORS, icons } from '../constants';
import { CurrentLocation, OrderItem, Restaurant, RootTabParamList } from '../types';
import Wall from '../components/Wall';


export const RestaurantScreen = ({ route, navigation }) => {
  const [restaurant, setRestaurant] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    
    const { item, currentLocation } = route.params;
    setRestaurant(item);
    setCurrentLocation(currentLocation);
    console.log(' setRestaurant items: ', item);
    console.log('currentLocation: ', currentLocation);
  });

  return (
    <Wall style={styles.container}>
      <TopBar
        leftIcon={icons.back}
        rightIcon={icons.list}
        headerText={restaurant?.name}
        leftPress={() => navigation.goBack()}
        rightPress={() => {}}
      />
      <RestaurantFoodInfo
        restaurant={restaurant}
        orderItems={orderItems}
        setOrderItems={(items) => setOrderItems(items)}
        placeOrder={() => navigation.navigate('OrderDeliveryScreen', { restaurant, currentLocation })}
      />
    </Wall>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: COLORS.lightGray2,
  },
});
