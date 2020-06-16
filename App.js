import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/Header';
import Colors from './constants/colors.js';
import { enableScreens } from 'react-native-screens';
import * as Font from 'expo-font';
import {AppLoading} from 'expo';
import SarNavigation from './navigation/SarNavigation';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import messagesReducer from './store/reducers/message';
import settingsReducer from './store/reducers/settings';
import { init } from './helpers/db';

init().then(()=>{
})
.catch(err => {
  console.log('init db failed');
  console.log(err);
});


const rootReducer = combineReducers({
  messages: messagesReducer,
  settings: settingsReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

enableScreens();

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

  return     (<Provider store={store}>
    <SarNavigation/>
    </Provider>)

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
