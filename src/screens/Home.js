import React, { useState } from 'react'
import Wall from '../components/Wall'
import BackButton from '../components/BackButton'
import Logo from '../components/Logo'
import Header from '../components/Header'
import TextInput from '../components/TextInput'
import Button from '../components/Button'

import { testStr, testInt } from '../helpers/HelperGlobal'
import { CommonActions } from '@react-navigation/native';

import { COLORS, icons } from '../constants';
import { HomeMainCategories } from '../components/home/HomeMainCategories';
import { HomeRestaurantsList } from '../components/home/HomeRestaurantsList';
import { CategoryData, RootTabParamList } from '../types';
//import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {
  categoryData,
  initialCurrentLocation,
  restaurantsWithCategories,
} from '../dummy-data';
import { TopBar } from '../components/TopBar';


export default function Home({ navigation , route}) {
    console.log('Home record is good');
    const {name, uuid, email} = route.params;
    console.log('Home data : ', name, email, uuid);
    console.log('test helper : ', testStr(name));
    console.log('test helper : ', testInt(3));

    // Remove  all route from the stack after login to home page
    navigation.dispatch(state => {
        const routes = state.routes.filter(
            r => r.name !== 'LoginScreen' && r.name != 'StartScreen'&& r.name != 'RegisterScreen'&& r.name != 'Dashboard'
        );
        return CommonActions.reset({
        ...state,
        routes,
        index: routes.length - 1,
        });
     });

    const [categories, setCategories] = useState(categoryData);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [restaurants, setRestaurants] = useState(restaurantsWithCategories);
    const [currentLocation, setCurrentLocation] = useState(initialCurrentLocation);

    function onSelectCategory(category) {
        const restaurantList = restaurantsWithCategories.filter((restaurant) =>
            restaurant.categories.includes(category.id),
        );
        setRestaurants(restaurantList);
        setSelectedCategory(category);
    }
    function testBtn() {
        console.log('home bun tester')
    }
  return (
    <Wall>
      {/*<BackButton goBack={navigation.goBack} />*/}
      <TopBar
        leftIcon={icons.nearby}
        rightIcon={icons.basket}
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
    </Wall>
  )
}
