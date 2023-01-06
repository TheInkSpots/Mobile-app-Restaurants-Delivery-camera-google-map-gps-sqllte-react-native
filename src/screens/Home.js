import React, { useState , useEffect} from 'react'
import {
  FlatList, StyleSheet, View, TouchableOpacity, Modal
} from 'react-native';

import Wall from '../components/Wall'
import BackButton from '../components/BackButton'
import Logo from '../components/Logo'
import Header from '../components/Header'
import TextInput from '../components/TextInput'
import Button from '../components/Button'
import Icon from 'react-native-vector-icons/AntDesign'

import { CommonActions,useFocusEffect } from '@react-navigation/native';

import { COLORS, SIZES, icons } from '../constants';
import { HomeMainCategories } from '../components/home/HomeMainCategories';
import { HomeRestaurantsList } from '../components/home/HomeRestaurantsList';
import { CategoryData, RootTabParamList } from '../types';
//import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {
  categoryData,
  initialCurrentLocation,
  //restaurantsWithCategories,
  testCurrentLocation
} from '../dummy-data';
import { TopBar } from '../components/TopBar';
import { AddButton } from '../components/AddButton';

import { getGPSPermission } from '../helpers/grantGPSPermission'
import * as Location from 'expo-location';
import * as SQLite from 'expo-sqlite';

import {
  showAlertToast,
} from "../core/utilities/AppUtils";


export default function Home({ navigation , route}) {
    //console.log('Home record is good');
    const {name, uuid, email} = route.params;
    console.log('Home data : ', name, email, uuid);

    const db = SQLite.openDatabase('db.visitRecord');
    //const [data, setData] = useState([]);
    const [restaurantData, setData] = useState([]);
    const retrieveData = () => {
      //console.log('retrieveData() called');
      let data = [];
      setData([]);
      db.transaction(tx => {
          tx.executeSql('SELECT * FROM visit_record where userID = ?',
              [uuid],
              (txObj, resultSet) => {
                  for (let i = resultSet.rows.length - 1; i >= 0; i--) {
                        let row = resultSet.rows.item(i);
                        let lon = row.latitude;// mean to do
                        let lat = row.longitude
                        let arr = JSON.parse(row.dishJSON)
                        data.push({id: row.id,
                        name: row.restName, 
                        rating:row.rating,
                          categories: JSON.parse(row.cat),
                          priceRating:1, 
                          photo:row.RestPhoto,
                          location:{latitude:lat,longitude:lon } , 
                          courier:{avatar: 12, name: 'Amy'},
                          menu:arr,
                          duration: row.visitdate,
                          test: 123,
                          startTime:row.visitStarttime,
                          endTime:row.visitEndtime,
                          remark: row.remark     
                    });
                  }
                  setData(data)
                 console.log('\nall real data ----> ');
                 //showAlertToast('real data got.');
                  //setTrigger(!trigger);
              },
              (txObj, error) => {
                  console.log('Error:', error);
              }
          )
      });
  }

   const categoriesMap = categoryData.reduce(
    (categoryMap, category) =>
      (categoryMap = {
        ...categoryMap,
        [category.id]: category.name,
      }),
    {},
  );
  
   const restaurantsWithCategories = restaurantData.map((restaurant) => ({
    ...restaurant,
    categoryNames: restaurant.categories.map(
      (category) => categoriesMap[category],
    ),
  }));
  const [trigger, setTrigger] = useState(false);
    const [categories, setCategories] = useState(categoryData);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [restaurants, setRestaurants] = useState(restaurantsWithCategories);
    const [currentLocation, setCurrentLocation] = useState(testCurrentLocation);
    const [realCurrentLocation, setRealCurrentLocation] = useState(testCurrentLocation);

    const [editModalOpen, setEditModalOpen] = useState(false);

    function onSelectCategory(category) {
        const restaurantList = restaurantsWithCategories.filter((restaurant) =>
            restaurant.categories.includes(category.id),
        );
        setRestaurants(restaurantList);
        setSelectedCategory(category);
    }
    function testBtn (){
      //console.log('test');
    }
    async function getGPSPermission () {
      //console.log('getLocationPermission');
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
          //console.log('Location permissions granted');
          //setHasLocationPermission(true);
          //console.log('attempt to get location')
          const location = await Location.getCurrentPositionAsync({});
          ////console.log(location);
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
    useEffect(() => {
      (async () => {
         // getCameraPermission();
         getGPSPermission();
         //setCurrentLocation(gpsObj);
          
          retrieveData();
      })();
  }, []);

  useFocusEffect(
        React.useCallback(() => {
          retrieveData();
          setTrigger(!trigger);
        }, [])
    )
  //console.log('gps is : ', currentLocation);
  return (
    <Wall>
      {/*<BackButton goBack={navigation.goBack} />*/}
      <TopBar
        leftIcon={icons.list}
        rightIcon={icons.search}
        headerText={currentLocation.streetName}
        leftPress={testBtn}
        rightPress={testBtn}
      />
      <HomeMainCategories
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={(category) =>
          onSelectCategory(category)
        }
      />
      <HomeRestaurantsList
        restaurants={restaurants}
        onPress={(item) =>
          navigation.navigate('RestaurantScreen', {
            item,
            currentLocation,
          })
        }
      />
      <TouchableOpacity onPress={()=>{
                                    // setEditModalOpen(true);
                                    navigation.navigate('CreateRecScreen',{currentLocation,uuid});
            }} 
            activeOpacity={0.6} 
            style={{ position: 'absolute', bottom: 15, right: 15, zIndex: 1 }}>
         <Icon
            name="pluscircle" size={52} color= {COLORS.foodpanda}
         />
      </TouchableOpacity>

      <Modal visible={editModalOpen} animationType='slide' >
                <View style={styles.modalContent}>
                    <Icon
                        name='close'
                        size={24}
                        style={styles.modalToggle}
                        onPress={() => setEditModalOpen(false)}
                    />
          
                </View>
            </Modal>
      
    </Wall>
  )
}

const styles = StyleSheet.create({
  container: {
      padding: 24
  },
  inputArea: {
      flexDirection: 'column',
      marginTop: 5,
      marginLeft: 5,
      marginRight: 5,
      marginBottom: 5,
      padding: 10,
      backgroundColor: 'pink',
      textAlign: 'center',
      alignItems: 'flex-start',
  },
  job: {
      flex: 1,
      flexDirection: 'column',
      padding: 5,
      marginTop: 5,
      marginLeft: 5,
      marginRight: 5,
      marginBottom: 5,
      backgroundColor: 'yellow',
      textAlign: 'center',
      alignItems: 'center',
  },
  jobRow: {
      flex: 1,
      flexDirection: 'row',
      padding: 5,
      backgroundColor: 'yellow',
      textAlign: 'center',
      alignItems: 'flex-start',
  },
  textInput: {
      borderWidth: 1,
      borderColor: '#fff',
      marginTop: 2,
      marginLeft: 2,
      marginRight: 2,
      marginBottom: 2,
      padding: 5,
      fontSize: 18,
      borderRadius: 6,
  },
  textOutput: {
      borderWidth: 1,
      borderColor: '#ddd',
      marginLeft: 2,
      marginRight: 2,
      padding: 3,
      borderRadius: 3,
      textAlign: 'center',
  },
  dateTime: {
      marginTop: 5,
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'center',
  },
  textBox: {
      borderWidth: 1,
      borderColor: '#eee',
      padding: 5,
      fontSize: 14,
      borderRadius: 6,
      height: 35,
      marginRight: 10,
      marginLeft: 2,
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
  map: {
      width: SIZES.width,
      height: SIZES.height,
  },
  searchContainer: {
      flexDirection: 'row',
      position: 'absolute',
      width: '100%',
      backgroundColor: 'white',
      shadowColor: 'black',
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 4,
      elevation: 4,
      padding: 8,
      borderRadius: 8,
  },
  miniImage: {
      width: 50,
      height: 50,
  }

})