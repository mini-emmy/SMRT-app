import React from 'react';
import { Platform, Text } from 'react-native';
import SarResponseScreen, { screenOptions as responseOptions } from '../screens/SarResponseScreen';
import LocationScreen, { screenOptions as locationOptions } from '../screens/LocationScreen';
import SettingsScreen, { screenOptions as settingsOptions } from '../screens/SettingsScreen';
import CustomMessageScreen, { screenOptions as customOptions } from '../screens/CustomMessageScreen';
import Colors from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const SARNavigator = createStackNavigator();
const LocationNavigator = createStackNavigator();
const Tab = createBottomTabNavigator();

const SARNavigatorScreen = () => {
    return (
        <SARNavigator.Navigator screenOptions={defaultStackNavOptions}>
            <SARNavigator.Screen
                name="SAR"
                component={SarResponseScreen}
                options={responseOptions} />
            <SARNavigator.Screen
                name="Settings"
                component={SettingsScreen}
                options={settingsOptions} />
            <SARNavigator.Screen
                name="Custom"
                component={CustomMessageScreen}
                options={customOptions} />
        </SARNavigator.Navigator>
    );
}

const LocationNavigatorScreen = () => {
    return (<LocationNavigator.Navigator screenOptions={defaultStackNavOptions}>
        <LocationNavigator.Screen
            name="Location"
            component={LocationScreen}
            options={locationOptions} />
        <SARNavigator.Screen
            name="Settings"
            component={SettingsScreen}
            options={settingsOptions} />
    </LocationNavigator.Navigator>);
}

const MainNavigator = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator tabBarOptions={{
                activeTintColor: Colors.primary,
                inactiveTintColor: Colors.grey,
            }}>
                <Tab.Screen
                    name="SAR"
                    component={SARNavigatorScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => {
                            return <Ionicons name='ios-text' size={25} color={color} />;
                        },
                        tabBarLabel: 'SAR'
                    }} />
                <Tab.Screen
                    name="Location"
                    component={LocationNavigatorScreen}
                    options={{
                        tabBarLabel: 'Location',
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name='ios-locate' size={25} color={color} />
                        ),
                    }}

                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

const defaultStackNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    //for iphones
    headerBackTitleStyle: {
        fontFamily: 'open-sans'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
    headerTitle: 'A Screen'
};


// const SARNavigator = createStackNavigator({
//     SAR: SarResponseScreen,
//     Settings: SettingsScreen,
//     Custom: CustomMessageScreen

// },
//     {
//         defaultNavigationOptions: defaultStackNavOptions
//     });

// const LocationNavigator = createStackNavigator({
//     Location: LocationScreen,
//     Settings: SettingsScreen
// },
//     {
//         defaultNavigationOptions: defaultStackNavOptions
//     });

// const tabScreenConfig = {
//     SAR: {
//         screen: SARNavigator, navigationOptions: {
//             tabBarIcon: (tabInfo) => {
//                 return <Ionicons name='ios-text' size={25} color={tabInfo.tintColor} />;
//             },
//             tabBarColor: Colors.primary,
//             tabBarLabel: Platform.OS === 'android' ? <Text style={{ fontFamily: 'open-sans-bold' }}>SAR</Text> : 'SAR'
//         }
//     },
//     Location: {
//         screen: LocationNavigator, navigationOptions: {
//             tabBarIcon: (tabInfo) => {
//                 return <Ionicons name='ios-locate' size={25} color={tabInfo.tintColor} />
//             },
//             tabBarColor: Colors.primary,
//             tabBarLabel: Platform.OS === 'android' ? <Text style={{ fontFamily: 'open-sans-bold' }}>Location</Text> : 'Location'
//         }
//     }
// }

// const MainTabNavigator =
//     Platform.OS === 'android'
//         ? createMaterialBottomTabNavigator(tabScreenConfig, {
//             activeTintColor: Colors.accent,
//             shifting: false,
//             barStyle: {
//                 backgroundColor: Colors.primary
//             }
//         })
//         : createBottomTabNavigator(tabScreenConfig, {

//             tabBarOptions: {
//                 lableStyle: {
//                     fontFamily: 'open-sans-bold'
//                 },
//                 activeTintColor: Colors.primary
//             }
//         });


//export default createAppContainer(MainTabNavigator);

export default MainNavigator;