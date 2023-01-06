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
import * as SQLite from 'expo-sqlite';
import { useFocusEffect } from '@react-navigation/native';
import {
  showAlertToast,
} from "../core/utilities/AppUtils";


//console.log('testse mo 123.');
export const RestaurantScreen = ({ route, navigation }) => {
  const { item, currentLocation } = route.params;
  console.log('fisrt time get the data ', item.test);
  const [restaurant, setRestaurant] = useState(null);
  //const [currentLocation, setCurrentLocation] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const db = SQLite.openDatabase('db.visitRecord');

  const [menu, setmenu] = useState([]);
  const [remark, setremark] = useState('');
  const [start, setstart] = useState('');
  const [end, setend] = useState('');

  const [obj, setobj] = useState({});

  const deleteData = (id) => {
    //console.log(`deleteData(${id}) called`);
  
  
    db.transaction(tx => {
        tx.executeSql('DELETE FROM visit_record where id = ?',
            [id],
            (txObj, resultSet) => {
              console.log('DELETE is good: '+ id);
                //setTrigger(!trigger);
                navigation.goBack();
                showAlertToast('DELETE is good: '+ id)
            },
            (txObj, error) => {
                console.log('Error:', error);
                showAlertToast('DELETE Error : '+ id)
            }
        )
    });
  }

  useEffect(() => {
    //console.log('mo: ', route.params);
     //const { item, currentLocation } = route.params;

    // setRestaurant(item);
    // setCurrentLocation(currentLocation);
    // console.log('12312313 setRestaurant items: ', item);
    //console.log('123123123 currentLocation: ', currentLocation);
    

      setRestaurant(item);
      //setCurrentLocation(currentLocation);
     // console.log('focus setRestaurant items: ', item);


      setmenu(item.menu);
      setremark(item.remark);
      setstart(item.startTime);
      setend(item.endTime);
      console.log('focus 222 start: ', start);
      
      console.log('focus 2222 items: ', obj);
  },[]);
  useFocusEffect(() => {
    //console.log('focus 2 setRestaurant items: ', item);
    //   const {setobj({menu: menu, remark:remark, start:start, end:end}); item, currentLocation } = route.params;
   
    //   const { item, currentLocation } = route.params;

    //   setRestaurant(item);
    //   setCurrentLocation(currentLocation);
    //   console.log('focus setRestaurant items: ', item);
   }
  )
  
  return (
    <Wall style={styles.container}>
      <TopBar
        leftIcon={icons.back}
        rightIcon={icons.basket}
        headerText={restaurant?.name}
        leftPress={() => navigation.goBack()}
        rightPress={() => deleteData(restaurant.id)}
      />
      <RestaurantFoodInfo
        menu={menu}
        start={start}
        end={end}
        remark={remark}
         obj={obj}
        restaurant={restaurant}
        orderItems={orderItems}
        setOrderItems={(items) => setOrderItems(items)}
        placeOrder={() => navigation.navigate('GoogleScreen', { restaurant, currentLocation })}
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
