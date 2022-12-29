import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/home';

const Stack = createNativeStackNavigator();

const screenOptions = {
    homeOptions: {
        title: 'Welcome to Foodpanda',
        headerStyle: { backgroundColor: '#db0d78' },
    },
    headerOptions: {
        headerStyle: { backgroundColor: '#db0d78' },
        headerTintColor: 'white',
        headerTitleStyle: { fontWeight: 'mormal'},
        headerShown: false,
    }
}

export default function HomeStack() {
    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={screenOptions.headerOptions}
        >
            <Stack.Screen
                name="Home"
                component={Home}
                // options={screenOptions.homeOptions}
            />
        </Stack.Navigator>
    )
}
