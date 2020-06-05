import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/Header';
import Colors from './constants/colors.js';
import * as Font from 'expo-font';
import {AppLoading} from 'expo';
import SarResponse from './components/SarResponse';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans':require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold':require('./assets/fonts/OpenSans-Bold.ttf')
  });
}

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded){
    return <AppLoading startAsync={fetchFonts} onFinish={()=>setDataLoaded(true)} onError ={(err)=>console.log(err)}/>;
  }

  return (
    <View styles={styles.container}>
    <Header title="SAR Response"/>
      <SarResponse></SarResponse>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
