import React from 'react'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { theme } from '../src/core/theme'
import HomeStack from '../routes/homeStack';
import About from '../screens/about';
import JobType from '../screens/jobType';
import TodaysJobs from '../screens/todaysJobs';
import SearchStat from '../screens/searchStat';
import {
    StartScreen,
    LoginScreen,
    RegisterScreen,
    ResetPasswordScreen,
    Dashboard,
    Home,
    StateScreen,
    RestaurantScreen,
    OrderDeliveryScreen,
    // CreateRecScreen,

  } from '../src/screens'
  import CreateRecScreen from '../src/screens/CreateRecScreen';
const Stack = createStackNavigator()

const screenOptions = {
  headerOptions: {
      headerStyle: { backgroundColor: '#db0d78' },
      headerTintColor: 'white',
      headerTitleStyle: { fontWeight: 'normal' },
  },
  homeOptions: {
      title: 'Welcome to Foodpanda',
  },
  aboutOptions: {
      title: 'About',
  },
  jobTypeOptions: {
      title: 'Manage Job Types',
  },
  todaysJobsOptions: {
      title: 'Today\'s Jobs',
  },
  searchStatOptions: {
      title: 'Search and Statistics',
  },
}

export default function App() {
  return (

        <Stack.Navigator
          initialRouteName="StartScreen"
          screenOptions={{
            headerShown: false,
          }}
        >

        <Stack.Screen name="CreateRecScreen" component={CreateRecScreen} />
          <Stack.Screen name="RestaurantScreen" component={RestaurantScreen} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="StateScreen" component={StateScreen} />
          <Stack.Screen name="OrderDeliveryScreen" component={OrderDeliveryScreen} />

          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
          />


            <Stack.Screen
                name="Home Screen"
                component={HomeStack}
                options={screenOptions.homeOptions}
            />
            <Stack.Screen
                name="About"
                component={About}
                options={screenOptions.aboutOptions}
            />
            <Stack.Screen
                name="JobType"
                component={JobType}
                options={screenOptions.jobTypeOptions}
            />
            <Stack.Screen
                name="TodaysJobs"
                component={TodaysJobs}
                options={screenOptions.todaysJobsOptions}
            />
            <Stack.Screen
                name="SearchStat"
                component={SearchStat}
                options={screenOptions.searchStatOptions}
            />


        </Stack.Navigator>

  )
}
