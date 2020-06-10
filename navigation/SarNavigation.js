import React from 'react';
import { Platform, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import SarResponseScreen from '../screens/SarResponseScreen';
import GetMessageScreen from '../screens/GetMessageScreen';
import SettingsScreen from '../screens/SettingsScreen';
import Colors from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';



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


const SARNavigator = createStackNavigator({
    SAR: SarResponseScreen,
    Settings: SettingsScreen
},
{
    defaultNavigationOptions: defaultStackNavOptions
});

const LocationNavigator = Platform.OS === 'android' ? createStackNavigator({
    Location: GetMessageScreen,
    Settings: SettingsScreen
},
    {

        defaultNavigationOptions: defaultStackNavOptions
    }) : createStackNavigator({
        Settings: SettingsScreen
    }, {

        defaultNavigationOptions: defaultStackNavOptions
    });


const tabScreenConfig = {
    SAR: {
        screen: SARNavigator, navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Ionicons name='ios-text' size={25} color={tabInfo.tintColor} />;
            },
            tabBarColor: Colors.primary,
            tabBarLabel: Platform.OS === 'android' ? <Text style={{ fontFamily: 'open-sans-bold' }}>SAR</Text> : 'SAR'
        }
    },
    Location: {
        screen: LocationNavigator, navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Ionicons name='ios-locate' size={25} color={tabInfo.tintColor} />;
            },
            tabBarColor: Colors.primary,
            tabBarLabel: Platform.OS === 'android' ? <Text style={{ fontFamily: 'open-sans-bold' }}>Locate</Text> : 'Settings'
        }
    }
}

const MainTabNavigator =
    Platform.OS === 'android'
        ? createMaterialBottomTabNavigator(tabScreenConfig, {
            activeTintColor: Colors.accent,
            shifting: false,
            barStyle: {
                backgroundColor: Colors.primary
            }
        })
        : createBottomTabNavigator(tabScreenConfig, {

            tabBarOptions: {
                lableStyle: {
                    fontFamily: 'open-sans-bold'
                },
                activeTintColor: Colors.primary
            }
        });


export default createAppContainer(MainTabNavigator);